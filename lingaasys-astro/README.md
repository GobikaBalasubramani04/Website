# Lingaasys

Lingaasys is a multi-page company website built with Astro and TypeScript. It includes pages for the company, culture, technologies, industries, careers, and contact details, plus career application and resume parsing endpoints.

## Requirements

- Node.js 18.17 or newer
- npm
- A Supabase project if you need career applications or resume parsing

## Getting started

The repository keeps the Astro app in `lingaasys-astro/` and server-side API dependencies in the repository root. Install both sets of dependencies from the repository root:

```bash
npm install
cd lingaasys-astro
npm install
```

Start the development server:

```bash
npm run dev
```

The site is available at `http://localhost:4321`.

## Available scripts

Run these commands from `lingaasys-astro/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production site in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Run Astro and TypeScript checks |

## Environment variables

Create `lingaasys-astro/.env` for local development when using the careers API:

```dotenv
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-server-only-key
```

Keep `SUPABASE_SERVICE_ROLE_KEY` private. It is used only by server-side API code and must not be exposed to browser code.

The careers application endpoint expects:

- A Supabase Storage bucket named `resumes`
- An `applicants` table with columns for `name`, `email`, `phone`, `role`, `linkedin`, `portfolio`, and `resume_url`

The resume parser accepts PDF and DOCX files through `POST /api/parse-resume`. Applications are submitted through `POST /api/apply`.

## Routes

- `/` - Homepage
- `/about` - About Lingaasys
- `/culture` - Company culture
- `/technologies` - Technology capabilities
- `/industries` - Industry overview
- `/industries/agriculture`
- `/industries/fintech`
- `/industries/healthcare`
- `/industries/hrms`
- `/industries/logistics`
- `/industries/manufacturing`
- `/industries/media`
- `/industries/retail`
- `/careers` - Careers overview
- `/careers/internship`
- `/careers/full-time`
- `/contact` - Contact page

## Configuration and documentation

- Update company email and social URLs in `src/data/site.ts`.
- Industry content is stored in `src/data/industries.ts`.
- The implemented visual system is documented in `design.md`.

## Project structure

```text
src/
	components/  Reusable site and page components
	data/        Navigation and page content
	layouts/     Shared page layout
	lib/         Server-side integrations
	pages/       Astro routes and API endpoints
	scripts/     Client-side interaction scripts
	styles/      Global styles
```
