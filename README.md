# Personal Portfolio — Yuan Zhiyi

Personal portfolio website with bilingual support (EN / ZH), built with Astro, Tailwind CSS, and DaisyUI.

## Tech Stack

- [Astro](https://astro.build)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

## Features

- Bilingual (English / Chinese) with client-side language switching via localStorage
- Project case studies with MDX (inline components, embedded game module)
- Animated SVG hero section on the homepage
- CV page (separate EN / ZH versions)

## Development

```bash
pnpm install
pnpm run dev
```

## Project Structure

```
src/
├── components/       # UI components (Header, En/Zh wrappers, etc.)
├── content/
│   ├── blog/         # Blog posts (.md)
│   └── project/      # Project case studies (.mdx)
├── layouts/          # BaseLayout, PostLayout
├── pages/            # index, cv, cv-zh, projects
└── styles/
public/               # Static assets (images per project)
```

## Based on

[Astrofy](https://github.com/manuelernestog/astrofy) template by Manuel Ernesto Garcia, MIT License.
