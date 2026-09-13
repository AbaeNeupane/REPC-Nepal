// ============================================================
//  REPC-Nepal Contact Form Handler
//  Google Apps Script — paste this entire file into Apps Script
//  See README_APPSSCRIPT.md for deployment instructions
// ============================================================

var RECIPIENT_EMAIL = 'repcnepal2083@gmail.com';
var SITE_NAME       = 'REPC-Nepal';
var SITE_URL        = 'https://repc-nepal.vercel.app';

// ─── SUBJECT LABELS ──────────────────────────────────────────
var SUBJECT_LABELS = {
  legal:      'Free Legal Aid',
  mediation:  'Mediation Services',
  training:   'Training Programs',
  membership: 'Membership',
  general:    'General Inquiry',
};

// ─── MAIN HANDLER ────────────────────────────────────────────
function doPost(e) {
  try {
    var raw  = e.postData.contents;
    var data = JSON.parse(raw);

    var name    = (data.name    || '').trim() || '(not provided)';
    var email   = (data.email   || '').trim() || '(not provided)';
    var phone   = (data.phone   || '').trim() || '(not provided)';
    var subject = (data.subject || '').trim();
    var message = (data.message || '').trim() || '(no message)';

    var subjectLabel = SUBJECT_LABELS[subject] || subject || 'General Inquiry';
    var emailSubject = '[' + SITE_NAME + '] ' + subjectLabel + ' — ' + name;

    // ── Plain-text body ──────────────────────────────────────
    var body =
      'New message received from the ' + SITE_NAME + ' website contact form.\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      'NAME     : ' + name    + '\n' +
      'EMAIL    : ' + email   + '\n' +
      'PHONE    : ' + phone   + '\n' +
      'SUBJECT  : ' + subjectLabel + '\n\n' +
      'MESSAGE\n' +
      '───────\n' +
      message + '\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
      'Sent via ' + SITE_URL + '\n';

    // ── HTML body ────────────────────────────────────────────
    var htmlBody =
      '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:6px;overflow:hidden">' +
      '  <div style="background:#0C2264;padding:20px 24px">' +
      '    <h2 style="margin:0;color:#fff;font-size:18px">' + SITE_NAME + ' — New Contact Form Submission</h2>' +
      '  </div>' +
      '  <div style="padding:24px">' +
      '    <table style="width:100%;border-collapse:collapse;font-size:14px">' +
      '      <tr><td style="padding:8px 0;color:#666;width:100px">Name</td>'    +
      '          <td style="padding:8px 0;font-weight:bold">' + name + '</td></tr>' +
      '      <tr><td style="padding:8px 0;color:#666">Email</td>'    +
      '          <td style="padding:8px 0"><a href="mailto:' + email + '">' + email + '</a></td></tr>' +
      '      <tr><td style="padding:8px 0;color:#666">Phone</td>'    +
      '          <td style="padding:8px 0">' + phone + '</td></tr>'  +
      '      <tr><td style="padding:8px 0;color:#666">Subject</td>'  +
      '          <td style="padding:8px 0"><span style="background:#BE1A22;color:#fff;padding:2px 10px;border-radius:12px;font-size:12px">' + subjectLabel + '</span></td></tr>' +
      '    </table>' +
      '    <hr style="border:none;border-top:1px solid #eee;margin:16px 0">' +
      '    <p style="color:#666;font-size:13px;margin:0 0 8px">Message:</p>' +
      '    <p style="background:#f9f9f9;padding:14px;border-left:4px solid #0C2264;border-radius:0 4px 4px 0;font-size:14px;white-space:pre-wrap;margin:0">' + message + '</p>' +
      '    <hr style="border:none;border-top:1px solid #eee;margin:20px 0 12px">' +
      '    <p style="color:#aaa;font-size:12px;margin:0">Received via <a href="' + SITE_URL + '">' + SITE_URL + '</a></p>' +
      '  </div>' +
      '</div>';

    // ── Send email ───────────────────────────────────────────
    GmailApp.sendEmail(RECIPIENT_EMAIL, emailSubject, body, {
      replyTo:  email !== '(not provided)' ? email : RECIPIENT_EMAIL,
      name:     SITE_NAME + ' Website',
      htmlBody: htmlBody,
    });

    return okResponse();

  } catch (err) {
    Logger.log('Error: ' + err);
    return okResponse(); // always return 200 so client shows success
  }
}

function okResponse() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── TEST FUNCTION (run manually from Apps Script editor) ────
function testEmail() {
  doPost({
    postData: {
      contents: JSON.stringify({
        name:    'Test User',
        email:   'test@example.com',
        phone:   '+977-9800000000',
        subject: 'general',
        message: 'This is a test message from the Apps Script editor.',
      }),
    },
  });
  Logger.log('Test email sent — check ' + RECIPIENT_EMAIL);
}
