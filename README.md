# My 3D Paradise

A portfolio and project inquiry website for 3D printing and product prototyping, built with **Next.js, React, and TypeScript**. The site brings project examples, service information, and an email inquiry workflow together in a single application.

From a software engineering perspective, the project demonstrates frontend component design, server-side request handling, third-party email integration, and container-based deployment configuration.

## Project overview

A visitor can explore example work, understand the offered services and process, and submit a project inquiry without leaving the website. The inquiry form collects the information needed to discuss a potential project, including its type, approximate budget, and requirements.

The application combines a visual portfolio with a functional backend route that validates submissions and sends them by email through Resend.

## Key features

- **Project showcase:** cards with project descriptions, materials, finishes, and images.
- **Service and process sections:** explain the offering and how a project progresses.
- **Responsive interface:** CSS layouts adapt to desktop and smaller screens.
- **Project inquiry form:** collects contact details, project type, optional budget, and a message.
- **Submission feedback:** sending, success, and error states, with duplicate clicks disabled while sending.
- **Server-side validation:** required fields, email format checks, and field-length limits.
- **Email integration:** formatted inquiry emails with the visitor's address set as the reply-to address.
- **Basic spam filtering:** a hidden honeypot field catches simple automated submissions.
- **Health endpoint:** a JSON response for basic application checks.
- **Docker configuration:** a multi-stage build with a standalone Next.js runtime and a non-root application user.

## Technology stack

| Technology | Role |
| --- | --- |
| Next.js App Router | Page composition and API routes |
| React | Reusable UI components and form state |
| TypeScript | Typed components, project data, and request structure |
| CSS | Styling and responsive layouts |
| Resend | Server-side email delivery |
| Node.js 24 | Application runtime |
| Docker | Build and runtime packaging |

## How it works

1. The portfolio renders project data from `src/data/projects.ts`.
2. A visitor completes the inquiry form.
3. The client sends a JSON request to `POST /api/inquiry`.
4. The API checks the honeypot, validates the fields, and escapes submitted text before inserting it into the HTML email.
5. Resend receives the email request, and the interface displays the submission result.

Email credentials are read on the server through environment variables. No database is configured; the inquiry route sends submissions by email rather than storing them in an application database.

## Engineering highlights

### Reusable component structure

Shared components such as `Button`, `Container`, and `SectionHeading` sit separately from page sections. Site configuration and project data also have dedicated files, allowing content changes without rewriting the page layout.

### Complete form workflow

The inquiry flow connects browser input, asynchronous UI state, server-side checks, and an external email service. Success and error messages use status and alert roles, and fields have associated labels.

### Deployment configuration

The Dockerfile separates dependency installation, compilation, and runtime stages. Next.js standalone output supplies the runtime files, and the application runs as a dedicated non-root user.

## Run locally

**Requirements:** Node.js 24.x and npm, matching the repository's engine declaration.

```bash
git clone https://github.com/Dhruvt1998/My3dParadise.git
cd My3dParadise
npm ci
```

Create `.env.local` in the project root:

```dotenv
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=recipient@example.com
FROM_EMAIL=sender@example.com
```

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Authenticate the server's Resend requests |
| `CONTACT_EMAIL` | Destination for submitted inquiries |
| `FROM_EMAIL` | Sender address accepted by your Resend configuration |

Use a sender permitted by your email service configuration. If `FROM_EMAIL` is omitted, the code falls back to `onboarding@resend.dev`. Keep credentials out of version control.

```bash
npm run dev
```

Open `http://localhost:3000`. The portfolio can be viewed without email credentials, but sending an inquiry requires the email service configuration.

## Production build

```bash
npm run build
npm start
```

To use the included Dockerfile:

```bash
docker build -t my3dparadise .
docker run --rm -p 3000:3000 --env-file .env.local my3dparadise
```

Both approaches require a server runtime for the inquiry API. A static-only host will not execute the email route.

## API routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Return service status and a timestamp |
| `POST` | `/api/inquiry` | Validate a project inquiry and request email delivery |

Example inquiry body:

```json
{
  "name": "Alex",
  "email": "alex@example.com",
  "projectType": "Prototype",
  "budget": "€100–€300",
  "message": "I would like to discuss a small enclosure prototype.",
  "website": ""
}
```

The `website` field is the honeypot and should remain empty for normal submissions. Valid submissions return `{ "success": true }` after the email service accepts the request. Validation errors return HTTP 400; configuration or sending failures return HTTP 500.

## Project structure

| Path | Responsibility |
| --- | --- |
| `src/app/page.tsx` | Main page composition |
| `src/app/layout.tsx` | Application layout |
| `src/app/globals.css` | Styling and responsive rules |
| `src/app/api/inquiry/route.ts` | Validation and email integration |
| `src/app/api/health/route.ts` | Basic health response |
| `src/components/atoms/` | Shared UI components |
| `src/components/sections/` | Header, hero, portfolio, services, process, inquiry, and footer |
| `src/config/site.ts` | Site identity, contact, and navigation |
| `src/data/projects.ts` | Typed portfolio content |
| `public/` | Images and static assets |
| `Dockerfile` | Container build and runtime configuration |

## Current status and future improvements

The repository includes the portfolio interface, inquiry API, and deployment configuration. Some project descriptions remain placeholders, one project is repeated, and two referenced project SVG images are absent from the inspected files. Complete these assets and descriptions before presenting the site as a finished portfolio.

Useful next steps include automated form and API tests, stronger request-type validation, rate limiting, and end-to-end checks of the email workflow. The package currently defines no test script. Build, deployment, and email delivery were not verified during this documentation update.
