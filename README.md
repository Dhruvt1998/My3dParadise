# 3D Printing Portfolio

A clean, modular portfolio website for a 3D-printing studio or independent maker.

## Why this structure scales

- `src/components/atoms` contains tiny reusable UI pieces.
- `src/components/sections` contains full page sections.
- `src/data/projects.ts` is the single place to add/edit portfolio projects.
- `src/config/site.ts` centralizes your name, email, navigation, and contact details.
- The inquiry form is isolated from the rest of the page, so it can later be swapped from `mailto:` to an API without redesigning the site.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Customize first

Edit:

```text
src/config/site.ts
```

Change `contactEmail` from `hello@yourdomain.com` to your real email address.

## Add another project

Open:

```text
src/data/projects.ts
```

Copy an existing object and change the values. No layout code needs to change.

## Inquiry form behavior

The current form creates a prefilled email and opens the visitor's default email application using a `mailto:` link.

This is simple and has no backend.

If you later want the website to send email directly without opening an email app, replace the submit logic in:

```text
src/components/sections/InquirySection.tsx
```

with a server action/API route using an email provider such as Resend, Postmark, or your own SMTP service.

## Suggested deployment

Vercel is the most direct option for this Next.js structure, but any platform that supports Next.js will work.
