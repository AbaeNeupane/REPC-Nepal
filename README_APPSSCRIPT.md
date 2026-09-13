# Setting Up the Contact Form → Gmail

This guide connects the REPC-Nepal contact form to Gmail using
Google Apps Script — free forever, no third-party services.

---

## Step 1 — Create the Apps Script project

1. Go to **https://script.google.com** (sign in with `repcnepal2083@gmail.com`)
2. Click **New project** (top-left)
3. Rename the project: click "Untitled project" → type **REPC-Nepal Contact Form** → OK

---

## Step 2 — Paste the script

1. Delete everything in the editor (`Ctrl+A` then `Delete`)
2. Open the file **`Code.gs`** (included in this ZIP)
3. Copy the entire contents and paste into the Apps Script editor
4. Click the **💾 Save** icon (or `Ctrl+S`)

---

## Step 3 — Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the ⚙️ gear icon next to "Type" → select **Web app**
3. Fill in:
   - **Description**: `Contact Form v1`
   - **Execute as**: `Me (repcnepal2083@gmail.com)`
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. If prompted, click **Authorize access** → choose `repcnepal2083@gmail.com` → click **Allow**
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

---

## Step 4 — Add the URL to the website

Open **`src/pages/Contact.jsx`** and find this line near the top:

```js
const SCRIPT_URL = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE';
```

Replace `'PASTE_YOUR_APPS_SCRIPT_URL_HERE'` with the URL you copied.

Example:
```js
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbXXXXXX/exec';
```

Save the file and **push to GitHub** — Vercel will auto-redeploy.

---

## Step 5 — Test it

**Option A — Test in Apps Script editor:**
1. In the editor, select the function `testEmail` from the dropdown
2. Click ▶ **Run**
3. Check `repcnepal2083@gmail.com` inbox — you should see a test email

**Option B — Test on the live website:**
1. Go to https://repc-nepal.vercel.app/contact
2. Fill in the form and submit
3. Check Gmail — the email arrives within seconds with a formatted HTML layout

---

## What the email looks like

**Subject:** `[REPC-Nepal] Free Legal Aid — John Doe`

**Body (HTML):**
- Formatted card with sender's name, email, phone, subject badge
- Full message in a highlighted block
- Reply-To set to sender's email (so you can reply directly from Gmail)

---

## Updating the script later

If you need to change anything in `Code.gs`:
1. Edit in the Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click ✏️ Edit → change Version to **"New version"** → **Deploy**

The URL stays the same — no need to update the website.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Form submits but no email arrives | Run `testEmail()` in editor; check the Execution log for errors |
| "Authorization required" error | Re-deploy and click Authorize again |
| Emails going to Spam | Open one, click "Not spam", then add the sender to contacts |
