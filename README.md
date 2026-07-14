# Verto3D — Professional 3D Modeling & Visualization Studio

A server-side rendered (SSR) marketing website for a professional 3D modeling studio serving manufacturing, architecture, product design and engineering clients worldwide. Built with **React 19**, **TanStack Start**, **TypeScript**, **Tailwind CSS v4**, and **Motion**.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| SSR / Meta-framework | TanStack Start |
| Routing | TanStack Router (file-based) |
| Styling | Tailwind CSS v4 (CSS-first configuration) |
| Animations | Motion (Framer Motion v12) |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Toasts | Sonner |
| Build Tool | Vite 8 |
| Linting | ESLint (flat config) + Prettier |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint

# Format
npm run format
```

## Project Structure

```
frontend/
├── public/                  # Static assets (favicon, robots.txt)
├── src/
│   ├── assets/              # Image imports (12 JPGs)
│   ├── components/
│   │   ├── site/            # Domain-specific UI components (Nav, Footer, Cards, etc.)
│   │   └── ui/              # shadcn/ui primitives (51 components)
│   ├── hooks/               # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-reduced-motion.ts
│   ├── lib/                 # Utilities, data, error handling
│   │   ├── data.ts          # ALL site content (projects, articles, services, etc.)
│   │   ├── utils.ts         # cn() helper (clsx + tailwind-merge)
│   │   ├── error-page.ts    # SSR 500 error page HTML
│   │   └── error-capture.ts # Global error capture for SSR recovery
│   ├── routes/              # File-based routes (TanStack Router)
│   │   ├── __root.tsx       # Root layout (shell, Nav, Footer, providers)
│   │   ├── index.tsx        # Home page
│   │   ├── studio.tsx       # Studio / About
│   │   ├── projects.index.tsx
│   │   ├── projects.$slug.tsx
│   │   ├── news.index.tsx
│   │   ├── news.$slug.tsx
│   │   ├── pricing.tsx
│   │   ├── contact.tsx
│   │   └── sitemap[.]xml.ts # Dynamic XML sitemap
│   ├── router.tsx           # Router factory with QueryClient
│   ├── routeTree.gen.ts     # Auto-generated route tree (do not edit)
│   ├── server.ts            # SSR fetch handler with h3 error recovery
│   ├── start.ts             # TanStack Start instance
│   └── styles.css           # Tailwind v4 theme, utilities, base styles
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
└── .prettierrc
```

## Routing Conventions

TanStack Start uses **file-based routing**. Every `.tsx` in `src/routes/` defines a route.

| File | URL |
|------|-----|
| `index.tsx` | `/` |
| `studio.tsx` | `/studio` |
| `projects.index.tsx` | `/projects` |
| `projects.$slug.tsx` | `/projects/:slug` |
| `news.index.tsx` | `/news` |
| `news.$slug.tsx` | `/news/:slug` |
| `pricing.tsx` | `/pricing` |
| `contact.tsx` | `/contact` |
| `sitemap[.]xml.ts` | `/sitemap.xml` |

The root layout is `__root.tsx` — it wraps every page with Nav, Footer, QueryClientProvider, and Sonner Toaster. Child routes render via `<Outlet />`.

## Key Conventions

- **Path alias**: `@/` maps to `src/`
- **CSS**: Tailwind utility classes + `cn()` helper for conditional merging
- **Animations**: `motion/react` with `whileInView` scroll triggers and spring physics
- **Icons**: `lucide-react`
- **Data**: All content lives in `src/lib/data.ts` — no CMS or database
- **Accessibility**: Animations respect `prefers-reduced-motion` via `usePrefersReducedMotion()`
- **SEO**: Each route exports a `head()` function with meta tags, Open Graph, Twitter Cards, and JSON-LD

## Scripts

| Script | Command |
|--------|---------|
| `npm run dev` | Start Vite dev server with SSR |
| `npm run build` | Production build |
| `npm run build:dev` | Dev-mode build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint check |
| `npm run format` | Prettier format |

## Environment

No `.env` file is currently configured. To deploy with a custom domain, update `BASE_URL` in `src/routes/sitemap[.]xml.ts`.

## Deployment

Build with `npm run build`. The output in `.output/` (or the configured Nitro output directory) can be deployed to any Node.js hosting environment (Vercel, Netlify, Cloudflare Workers, Railway, etc.).

## Dependencies Overview

**Core**: react, react-dom, @tanstack/react-router, @tanstack/react-start, @tanstack/react-query, motion, tailwindcss  
**UI**: lucide-react, sonner, lenis, @radix-ui/\* (via shadcn/ui), clsx, tailwind-merge  
**Dev**: typescript, vite, eslint, prettier, @vitejs/plugin-react, @tailwindcss/vite

> See `package.json` for the full list.
