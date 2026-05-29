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

The signup form currently stores submissions in browser `localStorage` under:

```text
cin-signups
```

That submit block can be replaced later with Formspree, Airtable, Google Sheets or Supabase without changing the page layout.
The current form data shape is also suitable for Tally or any other tool that accepts name, email, state, role and interest fields.
