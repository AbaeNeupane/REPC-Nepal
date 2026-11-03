// Step 1 of the admin login: send the editor to GitHub to authorize.
// Decap CMS opens this URL in a popup (config.yml: base_url + auth_endpoint).
import crypto from 'node:crypto';

export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Admin login is not configured: GITHUB_CLIENT_ID is missing in Vercel.');
    return;
  }

  const siteUrl = (process.env.SITE_URL || 'https://repcnepal.org.np').replace(/\/+$/, '');
  // "repo" works for public and private repositories. Use "public_repo" if the repo is public.
  const scope = process.env.GITHUB_OAUTH_SCOPE || 'repo';

  // Random value that must come back unchanged in /api/callback (blocks forged logins).
  const state = crypto.randomBytes(16).toString('hex');

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${siteUrl}/api/callback`,
    scope,
    state,
  });

  res.statusCode = 302;
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Set-Cookie', `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=600`);
  res.setHeader('Location', `https://github.com/login/oauth/authorize?${params.toString()}`);
  res.end();
}
