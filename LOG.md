# Dev Log — yuanzlabs.com

## Problem 1: Back button creates a double history entry — browser back flashes and returns to same page

**Symptom**
On the deployed site, clicking the browser back button (or the page's back button) from a project detail page would flash and return to the same page. A second click was needed to actually go back. The bug only appeared on the deployed site, not locally — until View Transitions was disabled, at which point it also appeared locally.

**Root cause**
Two compounding issues:

1. `initAccordionClick` in `src/pages/index.astro` used a `pointerdown` event listener that called `e.preventDefault()` and then `window.location.href = url`. The `pointerdown` fires before the browser's native click, so two navigation events were triggered for a single card click: one from `window.location.href` (adds a real history entry) and one from the anchor's `href` (which View Transitions intercepts and handles via `history.replaceState`, overwriting the previous entry). This left the homepage's history entry pointing to the project page instead of the homepage, so back appeared to do nothing on the first press.

2. Cloudflare Pages automatically issues **308 redirects** for any URL without a trailing slash (e.g. `/projects/moodwave-app` → `/projects/moodwave-app/`). Each redirect creates an extra history entry. So a single card click could produce: homepage → project (no slash, 308) → project (with slash) — making back navigate through the redirect ghost entry first.

**Fix**
- Removed `initAccordionClick` entirely from `src/pages/index.astro`. Navigation is now handled by native anchor `<a>` elements, which View Transitions handles correctly without extra history entries.
- Added trailing slashes to all internal links site-wide (`/projects/`, `/about/`, `/cv/`, `/blog/`, and all dynamic project/blog slugs) to avoid triggering Cloudflare's 308 redirect.

**Files changed**
- `src/pages/index.astro` — removed `initAccordionClick`, added trailing slashes to all link `href` values
- `src/components/SideBarMenu.astro` — added trailing slashes
- `src/pages/projects/index.astro` — added trailing slashes to project links
- `src/pages/blog/[...page].astro` — added trailing slashes to blog links
- `src/pages/blog/tag/[tag]/[...page].astro` — added trailing slashes
- `src/pages/cv.astro`, `src/pages/cv-zh.astro`, `src/pages/about.astro`, `src/pages/about-zh.astro` — added trailing slashes to language switch targets

---

## Problem 2: Sitemap plugin crash on Cloudflare Pages build

**Symptom**
Build failed with: `Cannot read properties of undefined (reading 'reduce')` inside `@astrojs/sitemap@3.7.1`.

**Root cause**
The sitemap plugin version was incompatible with something in the project's Astro config or content collection setup. It errored before producing any output.

**Fix**
Removed `import sitemap from "@astrojs/sitemap"` and the `sitemap()` entry from the `integrations` array in `astro.config.mjs`. Sitemap generation can be set up separately or via Cloudflare if needed.

---

## Problem 3: Site URL was still the template placeholder

**Symptom**
`astro.config.mjs` had `site: 'https://astrofy-template.netlify.app'` from the original template. This affects canonical URLs, Open Graph tags, and sitemap generation.

**Fix**
Updated to `site: 'https://yuanzlabs.com'` in `astro.config.mjs`.