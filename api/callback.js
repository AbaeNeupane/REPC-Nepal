// Step 2 of the admin login: GitHub sends the editor back here with a one-time code.
// We swap it for an access token (using the client secret, which never reaches the browser)
// and hand the token to the Decap CMS window that opened this popup.

const page = (body) => `<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>REPC-Nepal admin login</title></head><body style="font-family:sans-serif;padding:2rem">${body}</body></html>`;

const send = (res, status, html) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  // Clear the one-time state cookie whatever happens.
  res.setHeader('Set-Cookie', 'oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=0');
  res.end(html);
};

const readCookie = (header = '', name) => {
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return rest.join('=');
  }
  return '';
};

// Safe to embed inside a <script> tag.
const js = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

export default async function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const siteUrl = (process.env.SITE_URL || 'https://repcnepal.org.np').replace(/\/+$/, '');

  if (!clientId || !clientSecret) {
    return send(res, 500, page('<p>Admin login is not configured. Add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in Vercel, then redeploy.</p>'));
  }

  const url = new URL(req.url, siteUrl);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const savedState = readCookie(req.headers.cookie, 'oauth_state');

  if (url.searchParams.get('error')) {
    return send(res, 400, page('<p>GitHub login was cancelled or denied. Close this window and try again.</p>'));
  }
  if (!code || !state || !savedState || state !== savedState) {
    return send(res, 400, page('<p>Login check failed (expired or invalid session). Close this window and try again.</p>'));
  }

  let token;
  try {
    const ghRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'User-Agent': 'repc-nepal-cms' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${siteUrl}/api/callback`,
      }),
    });
    const data = await ghRes.json();
    token = data.access_token;
    if (!token) {
      return send(res, 401, page(`<p>GitHub did not return a token (${String(data.error_description || data.error || 'unknown error').replace(/[<>&]/g, '')}). Close this window and try again.</p>`));
    }
  } catch {
    return send(res, 502, page('<p>Could not reach GitHub. Close this window and try again.</p>'));
  }

  // Only the CMS running on our own site may receive the token.
  const message = `authorization:github:success:${JSON.stringify({ token, provider: 'github' })}`;
  const script = `
<script>
(function () {
  var allowedOrigin = ${js(siteUrl)};
  var message = ${js(message)};
  function receive(e) {
    if (e.origin !== allowedOrigin || e.source !== window.opener) return;
    window.opener.postMessage(message, allowedOrigin);
    window.removeEventListener('message', receive, false);
    setTimeout(function () { window.close(); }, 300);
  }
  window.addEventListener('message', receive, false);
  if (window.opener) window.opener.postMessage('authorizing:github', allowedOrigin);
})();
</script>`;

  return send(res, 200, page('<p>Signing you in… this window will close by itself.</p>') + script);
}
