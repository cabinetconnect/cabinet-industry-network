# Cabinet Industry Network

A zero-build React and Tailwind landing page for validating early interest before launch.

Logo, favicon and social sharing assets are stored in `assets/`.

## Run locally

Open `index.html` in a browser, serve the folder with any static server, or run:

```bash
node dev-server.mjs
```

## Deploy to Vercel

1. Import this folder or repository into Vercel.
2. Choose the `Other` framework preset.
3. Leave the build command empty.
4. Leave the output directory empty so Vercel serves the root `index.html`.

## Form handling

The signup form posts to the Vercel serverless API route:

```text
/api/signup
```

That API route forwards submissions to Google Sheets through a free Google Apps Script web app.

Captured fields:

```text
Submission Date/Time
Name
Email
State/Territory
Role
Interest
```

The same form data shape is also suitable for Airtable, Tally, Formspree or Supabase later.

## Google Sheets Setup

1. Create a new Google Sheet.
2. Name the sheet something clear, for example `Cabinet Industry Network Signups`.
3. In the Google Sheet, click **Extensions**.
4. Click **Apps Script**.
5. Delete any starter code.
6. Copy the code from `google-apps-script/Code.gs`.
7. Paste it into Apps Script.
8. Click **Save**.
9. Click **Deploy**.
10. Click **New deployment**.
11. Select type: **Web app**.
12. Set **Execute as** to `Me`.
13. Set **Who has access** to `Anyone`.
14. Click **Deploy**.
15. Authorise the script when Google asks.
16. Copy the Web app URL. It should end in `/exec`.

## Vercel Setup

1. Open your Vercel project.
2. Go to **Settings**.
3. Go to **Environment Variables**.
4. Add this variable:

```text
GOOGLE_SCRIPT_URL
```

5. Paste your Google Apps Script Web app URL as the value.
6. Save it for Production, Preview and Development if Vercel asks.
7. Go to **Deployments**.
8. Redeploy the latest deployment.

## Where Submissions Appear

Submissions will appear in your Google Sheet in a tab called:

```text
Signups
```

If that tab does not already exist, the Apps Script creates it automatically and adds the header row.

## Local Development Note

Opening `index.html` directly can show the page, but the Google Sheets submit route runs on Vercel. Test the live form from the deployed Vercel URL after adding `GOOGLE_SCRIPT_URL`.
