# Michael Zhu — Engineering Portfolio

Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/                 Pages (App Router). Each route is a folder with a page.tsx.
    projects/[slug]/    Dynamic project detail pages (only for projects with a `detail` object)
  components/          Reusable UI: Navbar, Footer, Hero, ProjectCard, ExperienceCard, SkillGroup, MemoryBar (signature divider), SectionHeader
  data/                All editable content lives here — see below
  lib/                 Small utilities
  types/               Shared TypeScript types (Project, Experience, SkillGroupData)
public/
  images/projects/     Project images/diagrams
  resume/              Downloadable résumé PDF
```

## Updating content

Everything you'll want to edit day-to-day is in `src/data/`, not scattered across pages:

- **`src/data/site.ts`** — your name, title, email, GitHub/LinkedIn URLs, résumé path, hero intro copy.
- **`src/data/projects.ts`** — every project. Add a new object to the `projects` array; set `featured: true`
  to show it as a large card, or leave it `false` for the compact "Other Projects" grid. Add a `detail` object
  to get an automatic `/projects/your-slug` detail page.
- **`src/data/experience.ts`** — work experience, reverse-chronological. Set `emphasize: true` to show the
  "Firmware role" badge.
- **`src/data/skills.ts`** — skill categories and the (de-emphasized) "Also worked with" library list.

### TODO markers

Search the `src/data/` files for `TODO:` comments — these mark information that wasn't in the material you
provided (missing GitHub repo links, project dates, individual-vs-team contribution, quantified results, etc.).
Nothing was invented to fill these gaps; fields left `undefined` are simply not rendered (e.g., a project card
with no `github` link won't show a broken GitHub button).

To add a project image, drop a file in `public/images/projects/` and reference it from that project's `image`
field in `projects.ts`.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to https://vercel.com/new, import the repo, and accept the default Next.js build settings.
3. After your first deploy, update `metadataBase` and the sitemap/robots URLs in
   `src/app/layout.tsx`, `src/app/sitemap.ts`, and `src/app/robots.ts` to your real domain
   (they currently point at a placeholder `https://example.com` — search for `TODO` there too).

## Notes

- Styling is dark-neutral with a copper/amber accent, IBM Plex (Sans/Mono) + Space Grotesk type,
  and a subtle schematic-grid background — intentionally avoiding gradients, glow effects, and
  stock photography.
- The thin segmented bar between sections (`MemoryBar` component) is a decorative nod to the
  free-list memory allocator built in the RTOS project — not a literal data visualization.
