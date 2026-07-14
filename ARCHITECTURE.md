# Lumera Studio — Frontend Architecture Analysis

**Project:** Lumera — Creative Studio for Founders  
**Stack:** React 19 + TypeScript + TanStack Start (SSR) + Tailwind CSS v4 + Motion  
**Analysis Date:** July 2026  
**Architecture Rating:** 7.5 / 10

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [Folder Structure](#folder-structure)
4. [Entry Point & App Initialization](#entry-point--app-initialization)
5. [Routing Analysis](#routing-analysis)
6. [User Flow](#user-flow)
7. [Feature Analysis](#feature-analysis)
8. [Component Analysis](#component-analysis)
9. [State Management](#state-management)
10. [API Layer](#api-layer)
11. [Authentication & Security](#authentication--security)
12. [Forms](#forms)
13. [Styling System](#styling-system)
14. [UI/UX Analysis](#uiux-analysis)
15. [Custom Hooks](#custom-hooks)
16. [Utility Functions](#utility-functions)
17. [Performance Analysis](#performance-analysis)
18. [Dependency Analysis](#dependency-analysis)
19. [Code Quality Review](#code-quality-review)
20. [Architecture Review](#architecture-review)
21. [Complete Data Flow](#complete-data-flow)
22. [Business Logic Mapping](#business-logic-mapping)
23. [Dependency Graph](#dependency-graph)
24. [Feature Dependency Matrix](#feature-dependency-matrix)
25. [Learning Documentation](#learning-documentation)

---

## Executive Summary

**Lumera** is a server-side rendered (SSR) marketing website for a boutique creative studio. It is a **static-content-driven, single-tenant brochure site** with zero authentication, no user-generated content, no API backend, and no database. All content is hardcoded in `src/lib/data.ts`. The primary purpose is to showcase studio work, pricing, news, and contact information to prospective clients.

The architecture is clean, modern, and well-organized. TanStack Router provides file-based routing, TanStack Start delivers SSR, and Tailwind CSS v4 with CSS custom properties drives the dark-themed design system. The motion layer (motion/react — Framer Motion v12) is extensive and high-quality.

### Key Strengths

- Modern SSR stack (TanStack Start + React 19 + Vite 8)
- Excellent motion design and animation quality
- Well-organized component structure with clear separation of concerns
- Accessible and performant animation patterns (respects reduced-motion)
- Strong error handling at the SSR level (h3 error normalization, global error capture)
- Semantic HTML and structured data (JSON-LD, Open Graph, Twitter Cards)

### Key Weaknesses

- All content is hardcoded — no CMS, no database, no API layer
- Zero test infrastructure
- `vite-tsconfig-paths` still in dependencies (though removed from config)
- 50 of 51 shadcn/ui components are unused
- No loading/error boundaries at route level (only root-level)
- Inline styles in SSR error page (inconsistent with Tailwind system)
- No environment variable configuration
- Social media links are `href="#"` placeholders
- Newsletter/contact forms have no backend — simulated with setTimeout

---

## Project Overview

| Attribute | Value |
|-----------|-------|
| **Purpose** | Marketing website for a creative design studio |
| **Business Domain** | Creative agency / Brand design services |
| **Type** | SSR marketing brochure site (single-tenant) |
| **Main Users** | Prospective clients evaluating the studio |
| **Primary Functionality** | Showcase portfolio, pricing, news, studio info, contact form |
| **Architecture Style** | File-based routing, SSR with hydration, static data |
| **Frontend Stack** | React 19, TypeScript, TanStack Start, Vite 8 |
| **Rendering** | Server-Side Rendering (SSR) via TanStack Start |
| **Overall Complexity** | Low-medium (no auth, no API, no state management) |

### High-Level Architecture Diagram

```
Browser Request
     │
     ▼
Vite Dev Server (dev) / Node SSR (prod)
     │
     ▼
TanStack Start (server.ts → start.ts)
     │
     ├── Error Capture Layer (error-capture.ts)
     ├── SSR Fetch Handler (server.ts)
     │       └── h3 Error Normalization
     └── Request Middleware (start.ts)
             └── Catastrophic Error Recovery
     │
     ▼
TanStack Router (router.tsx → routeTree.gen.ts)
     │
     ├── __root.tsx (shell + root component)
     │       ├── QueryClientProvider
     │       ├── Nav
     │       ├── <Outlet />
     │       ├── Footer
     │       └── Toaster
     │
     └── Route Pages (file-based in routes/)
             ├── index.tsx      (Home)
             ├── studio.tsx     (About)
             ├── projects/*    (Portfolio)
             ├── news/*        (Blog)
             ├── pricing.tsx   (Pricing)
             ├── contact.tsx   (Contact)
             └── sitemap.xml.ts (SEO)
```

---

## Folder Structure

```
frontend/
├── public/                       # Static files (served as-is)
│   ├── favicon.svg
│   └── robots.txt
│
├── src/
│   ├── assets/                   # Static image imports (12 JPGs)
│   │   ├── hero-portrait.jpg
│   │   ├── news-*.jpg            (4 news images)
│   │   ├── project-*.jpg         (6 project images)
│   │   └── studio-team.jpg
│   │
│   ├── components/
│   │   ├── site/                 # Business-specific UI components (13 files)
│   │   │   ├── Counter.tsx       # Animated number counter
│   │   │   ├── CTASection.tsx    # Call-to-action banner
│   │   │   ├── FAQ.tsx           # Accordion FAQ
│   │   │   ├── Footer.tsx        # Site footer
│   │   │   ├── Magnetic.tsx      # Mouse-following magnetic effect
│   │   │   ├── Marquee.tsx       # Infinite scroll marquee
│   │   │   ├── Nav.tsx           # Sticky nav with mobile drawer
│   │   │   ├── NewsCard.tsx      # Article preview card
│   │   │   ├── PricingSection.tsx # Pricing toggle + plan cards
│   │   │   ├── ProjectCard.tsx   # Project portfolio card
│   │   │   ├── Reveal.tsx        # Scroll-triggered reveal + stagger text
│   │   │   ├── SectionHeading.tsx # Reusable section header
│   │   │   └── Tilt.tsx          # 3D tilt card wrapper
│   │   │
│   │   └── ui/                   # shadcn/ui primitives (51 files)
│   │       ├── accordion.tsx     # NOT used (site/FAQ uses custom accordion)
│   │       ├── alert-dialog.tsx  # Unused
│   │       ├── alert.tsx         # Unused
│   │       ├── aspect-ratio.tsx  # Unused
│   │       ├── avatar.tsx        # Unused
│   │       ├── badge.tsx         # Unused
│   │       ├── breadcrumb.tsx    # Unused
│   │       ├── button.tsx        # Unused (uses btn-pill utility class)
│   │       ├── calendar.tsx      # Unused
│   │       ├── card.tsx          # Unused (custom card styles)
│   │       ├── carousel.tsx      # Unused (uses Marquee instead)
│   │       ├── chart.tsx         # Unused
│   │       ├── checkbox.tsx      # Unused
│   │       ├── collapsible.tsx   # Unused
│   │       ├── command.tsx       # Unused
│   │       ├── context-menu.tsx  # Unused
│   │       ├── dialog.tsx        # Unused (mobile nav uses custom drawer)
│   │       ├── drawer.tsx        # Unused
│   │       ├── dropdown-menu.tsx # Unused
│   │       ├── form.tsx          # Unused (contact form is manual)
│   │       ├── hover-card.tsx    # Unused
│   │       ├── input-otp.tsx     # Unused
│   │       ├── input.tsx         # Unused
│   │       ├── label.tsx         # Unused
│   │       ├── menubar.tsx       # Unused
│   │       ├── navigation-menu.tsx # Unused (Nav uses custom nav)
│   │       ├── pagination.tsx    # Unused
│   │       ├── popover.tsx       # Unused
│   │       ├── progress.tsx      # Unused (custom scroll progress bar)
│   │       ├── radio-group.tsx   # Unused
│   │       ├── resizable.tsx     # Unused
│   │       ├── scroll-area.tsx   # Unused
│   │       ├── select.tsx        # Unused
│   │       ├── separator.tsx     # Unused
│   │       ├── sheet.tsx         # Unused
│   │       ├── sidebar.tsx       # Unused
│   │       ├── skeleton.tsx      # Unused
│   │       ├── slider.tsx        # Unused
│   │       ├── sonner.tsx        # USED (toast system via sonner library)
│   │       ├── switch.tsx        # Unused
│   │       ├── table.tsx         # Unused
│   │       ├── tabs.tsx          # Unused
│   │       ├── textarea.tsx      # Unused
│   │       ├── toggle-group.tsx  # Unused
│   │       ├── toggle.tsx        # Unused
│   │       └── tooltip.tsx       # Unused
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx        # Mobile breakpoint detection (768px)
│   │   └── use-reduced-motion.ts # prefers-reduced-motion media query
│   │
│   ├── lib/
│   │   ├── data.ts               # ALL site content (projects, articles, services, testimonials, stats, process, FAQs, team, values)
│   │   ├── utils.ts              # cn() utility (clsx + tailwind-merge)
│   │   ├── error-page.ts         # SSR error page HTML generator
│   │   └── error-capture.ts      # Global error/rejection capture for SSR
│   │
│   ├── routes/                   # File-based routing (TanStack Router)
│   │   ├── __root.tsx            # Root layout (shell, providers, nav, footer)
│   │   ├── index.tsx             # Home page (Hero, About, Projects, Services, Pricing, Testimonials, Stats, FAQ, News, CTA)
│   │   ├── studio.tsx            # Studio/About page
│   │   ├── projects.index.tsx    # Project listing with category filter
│   │   ├── projects.$slug.tsx    # Project detail page
│   │   ├── news.index.tsx        # News listing
│   │   ├── news.$slug.tsx        # Article detail page
│   │   ├── pricing.tsx           # Pricing page
│   │   ├── contact.tsx           # Contact form page
│   │   ├── sitemap[.]xml.ts      # Dynamic XML sitemap (SSR handler)
│   │   └── README.md             # Route conventions documentation
│   │
│   ├── router.tsx                # Router factory with QueryClient
│   ├── routeTree.gen.ts          # Auto-generated route tree
│   ├── server.ts                 # SSR fetch handler with h3 error recovery
│   ├── start.ts                  # TanStack Start instance with error middleware
│   └── styles.css                # Tailwind v4 CSS with theme, utilities, base
│
├── AGENTS.md                     # Development conventions
├── eslint.config.js              # ESLint flat config
├── .prettierrc                   # Prettier config
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Folder Responsibilities

#### `src/components/site/`
**Purpose:** Business-specific, reusable UI components unique to Lumera's brand.  
**Contains:** Animated counters, magnetic hover, scroll reveals, cards, navigation, footer, pricing, FAQ, marquee.  
**Used By:** All route pages, imported directly or composed into other components.  
**Dependencies:** `motion/react`, `lucide-react`, `sonner`, `@tanstack/react-router`, `lib/utils`, `lib/data`, `hooks/use-reduced-motion`.

#### `src/components/ui/`
**Purpose:** shadcn/ui-generated primitive components (Radix-based).  
**Contains:** 51 unstyled, accessible UI primitives.  
**Usage:** Only `sonner.tsx` (Sonner toast wrapper) is actively used. The other 50 are unused.  
**Dependencies:** `@radix-ui/*`, `class-variance-authority`, `clsx`, `tailwind-merge`.

#### `src/routes/`
**Purpose:** File-based routing — each `.tsx` defines a URL route.  
**Contains:** 9 route files + `__root.tsx` layout + `routeTree.gen.ts` generator output.  
**Interactions:** Components from `components/site/`, data from `lib/data.ts`, utilities from `lib/utils.ts`.

#### `src/lib/`
**Purpose:** Shared utilities, data definitions, and SSR error infrastructure.  
**Contains:** `data.ts` (all site content), `utils.ts` (cn helper), `error-page.ts` (500 HTML), `error-capture.ts` (global error capture).  
**Dependencies:** `clsx`, `tailwind-merge`, all asset imports.

#### `src/hooks/`
**Purpose:** Custom React hooks.  
**Contains:** `use-mobile.tsx` (breakpoint detection), `use-reduced-motion.ts` (motion preference).  
**Used By:** `Tilt`, `Magnetic`, and any component needing responsive/motion awareness.

---

## Entry Point & App Initialization

This project uses **TanStack Start**, which means there is no traditional `main.tsx` or `index.html`. The SSR lifecycle is:

### Initialization Flow

```
1. Vite (dev) / Node (prod) starts
       │
2. server.ts exports a `fetch` handler
       │
3. TanStack Start framework calls fetch(request, env, ctx)
       │
4. Error capture listeners registered (error-capture.ts)
       │
5. SSR entry imported dynamically (@tanstack/react-start/server-entry)
       │
6. Router created (router.tsx) with QueryClient
       │
7. Request goes through middleware (start.ts error middleware)
       │
8. Route matched → loader data fetched → page rendered to HTML
       │
9. Response normalized for h3 catastrophic errors (server.ts)
       │
10. HTML streamed to client → React hydrates in browser
```

### Key Files

| File | Role |
|------|------|
| `src/server.ts` | SSR fetch handler — dynamic imports start entry, normalizes h3 errors, provides catastrophic recovery |
| `src/start.ts` | TanStack Start instance with `createStart()` + error middleware |
| `src/router.tsx` | Creates TanStack Router with query client and scroll restoration |
| `src/routeTree.gen.ts` | Auto-generated route tree by `@tanstack/router-plugin` |
| `src/routes/__root.tsx` | Root shell (html/head/body), root component with QueryClientProvider, Nav, Outlet, Footer, Toaster |

### Root Component (`__root.tsx`)

```
RootShell → html head body
    │
RootComponent
    ├── useEffect: Lenis (smooth scroll) init
    ├── useEffect: scroll-to-top on route change
    ├── QueryClientProvider
    │   ├── Nav
    │   │   ├── Link (logo)
    │   │   ├── Desktop links (5 items)
    │   │   ├── Magnetic → "Let's talk" CTA
    │   │   └── Mobile hamburger → AnimatePresence drawer
    │   ├── main → <Outlet />
    │   ├── Footer
    │   │   ├── Logo + description
    │   │   ├── Newsletter form
    │   │   ├── Navigation links
    │   │   ├── Social links (placeholders)
    │   │   └── Copyright
    │   └── Toaster (Sonner, dark theme, bottom-right)
```

---

## Routing Analysis

### Route Tree

```
/ (__root.tsx)  ← Root shell + layout (Nav, Footer, Toaster)
│
├── /                           → index.tsx (Home page)
├── /studio                     → studio.tsx (Studio/About)
├── /projects                   → projects.index.tsx (Project listing)
├── /projects/$slug             → projects.$slug.tsx (Project detail)
│     ├── loader: fetches project by slug from data.ts
│     └── notFoundComponent: ProjectNotFound
├── /news                       → news.index.tsx (News listing)
├── /news/$slug                 → news.$slug.tsx (Article detail)
│     ├── loader: fetches article by slug from data.ts
│     ├── head: dynamic meta/JSON-LD
│     └── notFoundComponent: ArticleNotFound
├── /pricing                    → pricing.tsx (Pricing page)
├── /contact                    → contact.tsx (Contact form)
├── /sitemap.xml                → sitemap[.]xml.ts (Dynamic sitemap)
│     └── server handler: GET → returns XML
└── 404                         → NotFoundComponent in __root.tsx
```

### Route Features

| Feature | Details |
|---------|---------|
| **File-based routing** | Every `.tsx` in `routes/` is a route |
| **Dynamic params** | `$slug` syntax for `/projects/$slug` and `/news/$slug` |
| **SSR data loading** | `loader` functions fetch data on server before render |
| **Dynamic head** | Each route exports `head()` with SEO meta, Open Graph, JSON-LD |
| **Not-found handling** | Route-level `notFoundComponent` and root-level `notFoundComponent` |
| **Error boundaries** | Root-level `errorComponent` with "Try again" / "Go home" |
| **Server handlers** | `sitemap[.]xml.ts` uses `server.handlers.GET` for dynamic XML |
| **Layout nesting** | `<Outlet />` in `__root.tsx` renders child routes |
| **Scroll restoration** | `scrollRestoration: true` in router config |
| **Preloading** | `defaultPreloadStaleTime: 0` for eager link preloading |
| **404 from loaders** | `throw notFound()` in loader when data not found |

---

## User Flow

### Complete Application Flow (Home Page)

```
User navigates to lumera.studio
       │
       ▼
DNS → Server → SSR Fetch Handler (server.ts)
       │
       ├── Global error listeners registered
       ├── Dynamic import of React Start server entry
       ├── Request middleware (error boundary)
       │
       ▼
TanStack Router matches "/"
       │
       ▼
Root component mounts (__root.tsx)
       │
       ├── Lenis smooth scroll initialized
       ├── QueryClientProvider wraps app
       ├── Nav renders (fixed header, scroll-aware glass)
       ├── Footer renders
       ├── Toaster (Sonner) renders
       └── <Outlet /> renders Home page
              │
              ▼
Home page (index.tsx) renders sections sequentially
       │
       ├── Hero section
       │   ├── Parallax image (motion/react scroll transform)
       │   ├── Staggered text reveal (StaggerText)
       │   ├── Scroll-triggered animations (Reveal)
       │   └── Marquee (disciplines list)
       │
       ├── About section
       │   └── Counter animations (animated numbers)
       │
       ├── Featured Projects
       │   └── ProjectCards with tilt effect
       │
       ├── Services
       │   └── Service cards with Reveal animations
       │
       ├── Pricing (in-page anchor)
       │   └── PricingSection with monthly/yearly toggle
       │
       ├── Testimonials
       │   └── Marquee rows of testimonial cards
       │
       ├── Stats
       │   └── Counter animations in grid
       │
       ├── FAQ
       │   └── Accordion (custom, not Radix)
       │
       ├── News Preview
       │   └── NewsCards
       │
       └── CTA Section
           └── "Let's build something unforgettable"
               ├── "Start a project" → /contact
               └── "See pricing" → /pricing
```

### Navigation Flow

```
┌─────────┐     ┌──────────┐     ┌────────────┐     ┌────────┐     ┌───────────┐
│  Home   │ ──→ │  Studio  │ ──→ │  Projects  │ ──→ │  News  │ ──→ │  Pricing  │
└─────────┘     └──────────┘     └────────────┘     └────────┘     └───────────┘
     │               │                │                  │               │
     │               │                ▼                  ▼               │
     │               │         ┌──────────────┐   ┌───────────┐         │
     │               │         │ Project Detail│   │Article Detail│       │
     │               │         └──────────────┘   └───────────┘         │
     │               │                                                  │
     │               └──────────────────┬───────────────────────────────┘
     │                                  │
     ▼                                  ▼
┌──────────┐                    ┌────────────┐
│ Contact  │ ←──────────────── │  "Let's    │
│  Page    │                    │  talk" CTA │
└──────────┘                    └────────────┘
```

---

## Feature Analysis

### Feature Inventory

| # | Feature | Route(s) | Components | Data | Interactions |
|---|---------|----------|------------|------|-------------|
| 1 | **Hero / Home** | `/` | Reveal, StaggerText, Marquee, Counter | disciplines[] | Entry point, links to all sections |
| 2 | **Studio / About** | `/studio` | Reveal, StaggerText, Counter | team[], values[], process[], stats[] | Links to Contact |
| 3 | **Project Portfolio** | `/projects`, `/projects/$slug` | ProjectCard, Tilt, Reveal | projects[] | Category filter on listing; "next project" navigation on detail |
| 4 | **News / Blog** | `/news`, `/news/$slug` | NewsCard, Tilt, Reveal | articles[] | SEO meta + JSON-LD; related articles |
| 5 | **Pricing** | `/pricing` | PricingSection, FAQ, Reveal | plans (hardcoded in component), faqs[] | Monthly/yearly toggle; links to Contact |
| 6 | **Contact Form** | `/contact` | Reveal | None (form is local state) | Simulated submission (setTimeout + toast) |
| 7 | **Stats & Facts** | `/`, `/studio` | Counter | stats[] | Animated counters on scroll |
| 8 | **Testimonials** | `/` | Marquee | testimonials[] | Infinite scroll marquee |
| 9 | **Services** | `/` | Reveal | services[] | Section on home page |
| 10 | **FAQ** | `/`, `/pricing` | FAQ (custom accordion) | faqs[] | Expand/collapse with animation |
| 11 | **CTA Section** | `/`, `/studio`, `/news`, `/projects` | CTASection | None | Links to Contact and Pricing |
| 12 | **Newsletter Signup** | Every page (in Footer) | Footer | None (local state) | Simulated subscription |
| 13 | **Smooth Scroll** | Every page | Lenis (in __root.tsx) | N/A | requestAnimationFrame loop |
| 14 | **Scroll Progress Bar** | Every page | Nav (motion div) | N/A | Uses useScroll + useSpring |
| 15 | **SEO / Structured Data** | All routes | HeadContent (TanStack) | projects[], articles[], static meta | JSON-LD, Open Graph, Twitter Cards |
| 16 | **Sitemap** | `/sitemap.xml` | Server handler | projects[], articles[] | Dynamic XML generation |

---

## Component Analysis

### Component Hierarchy

```
Root Layout (__root.tsx)
├── Nav
│   ├── Link (TanStack Router) — logo
│   ├── Desktop navigation links (5 items)
│   ├── Magnetic — wraps "Let's talk" CTA button
│   └── Mobile: Hamburger → AnimatePresence → Motion Drawer
│
├── <Outlet /> (route content)
│   ├── Home (index.tsx)
│   │   ├── Hero
│   │   │   ├── Reveal (2x)
│   │   │   ├── StaggerText
│   │   │   ├── motion.div (parallax image)
│   │   │   └── Marquee (slow)
│   │   ├── About
│   │   │   ├── Reveal (4x)
│   │   │   ├── StaggerText
│   │   │   └── Counter (3x)
│   │   ├── FeaturedProjects
│   │   │   ├── SectionHeading
│   │   │   ├── Reveal (6x)
│   │   │   └── ProjectCard (6x) → Tilt
│   │   ├── Services
│   │   │   ├── SectionHeading
│   │   │   ├── Reveal (4x)
│   │   │   └── Service cards (no dedicated component)
│   │   ├── Pricing section
│   │   │   ├── SectionHeading
│   │   │   └── PricingSection
│   │   │       ├── Reveal
│   │   │       ├── Toggle buttons
│   │   │       └── Plan cards (2x)
│   │   ├── Testimonials
│   │   │   ├── SectionHeading
│   │   │   └── Marquee (2x)
│   │   │       └── Testimonial figures (3 per row)
│   │   ├── Stats
│   │   │   ├── SectionHeading
│   │   │   └── Counter (4x) in grid
│   │   ├── FAQ
│   │   │   ├── SectionHeading
│   │   │   └── FAQ → custom accordion
│   │   ├── NewsPreview
│   │   │   ├── SectionHeading
│   │   │   └── NewsCard (3x) → Tilt
│   │   └── CTASection
│   │       ├── Reveal (2x)
│   │       └── StaggerText
│   │
│   ├── Studio (studio.tsx)
│   │   ├── Reveal, StaggerText, Counter, SectionHeading
│   │   ├── Team cards
│   │   ├── Process timeline
│   │   └── CTASection
│   │
│   ├── Projects Listing (projects.index.tsx)
│   │   ├── Category filter buttons
│   │   ├── ProjectCard grid
│   │   └── CTASection
│   │
│   ├── Project Detail (projects.$slug.tsx)
│   │   ├── Reveal, StaggerText
│   │   ├── Metadata grid
│   │   ├── Body paragraphs
│   │   ├── Next project navigation
│   │   └── CTASection
│   │
│   ├── News Listing (news.index.tsx)
│   │   ├── Featured NewsCard
│   │   ├── NewsCard grid
│   │   └── CTASection
│   │
│   ├── Article Detail (news.$slug.tsx)
│   │   ├── Reveal, StaggerText
│   │   ├── Author info
│   │   ├── Body paragraphs
│   │   ├── Related articles
│   │   └── CTASection
│   │
│   ├── Pricing (pricing.tsx)
│   │   ├── PricingSection
│   │   ├── FAQ
│   │   └── CTASection
│   │
│   └── Contact (contact.tsx)
│       ├── Contact info (email, phone, location)
│       └── Contact form (raw HTML, no form library)
│
├── Footer
│   ├── Reveal (3x)
│   ├── Newsletter form
│   ├── Navigation links (6 items)
│   └── Social links (4 items, href="#")
│
└── Toaster (Sonner)
```

### Component Classification

| Component | Type | Props | Reused | Notes |
|-----------|------|-------|--------|-------|
| `Reveal` | Animation wrapper | children, delay, className | **Heavily (30+ uses)** | Scroll-triggered fade-up-blur |
| `StaggerText` | Animation | text, className | **Heavily (8+ uses)** | Word-by-word reveal |
| `SectionHeading` | Layout | tag, title, description, action, center | 7 uses | Consistent section headers |
| `Tilt` | Effect wrapper | children, className, max, scale | 2 uses (ProjectCard, NewsCard) | 3D perspective tilt |
| `Magnetic` | Effect wrapper | children, strength, className | 1 use (Nav CTA) | Mouse-following pull |
| `Marquee` | Layout | children, className, slow | 3 uses (disciplines, testimonials) | Infinite CSS animation |
| `Counter` | Animation | value, prefix, suffix, duration | 2 uses (home, studio stats) | Animated number |
| `ProjectCard` | Composite | project (data), className | 2 uses (home grid, projects grid) | Links to `/projects/$slug` |
| `NewsCard` | Composite | article (data), className | 3 uses (home, news list, related) | Links to `/news/$slug` |
| `PricingSection` | Composite | none | 2 uses (home anchor, /pricing) | Monthly/yearly toggle |
| `FAQ` | Composite | none | 2 uses (home, /pricing) | Accordion with animation |
| `CTASection` | Composite | none | 5 uses (home, studio, projects, news, pricing) | Bottom CTA banner |

### Duplication Opportunities

1. **`nav` link array** is duplicated in `Nav.tsx:8-14` (5 links) and `Footer.tsx:7-13` (6 links, includes Contact). Could be extracted to `lib/data.ts`.
2. **Section heading patterns** are highly consistent but each page manually composes them — already well-abstracted via `SectionHeading`.
3. **50 unused shadcn/ui components** — significant dead code.

---

## State Management

### State Inventory

| Type | Location | Technology | Scope |
|------|----------|------------|-------|
| **Server cache** | TanStack Query | `@tanstack/react-query` | Global (QueryClientProvider) |
| **Animation triggers** | Component-local | `useState` | Per-component |
| **Scroll position** | Component-local | `useScroll` (motion/react) | Per-component |
| **Form state** | Component-local | `useState` | Contact form, newsletter |
| **UI state** | Component-local | `useState` | Mobile menu, FAQ open index, pricing toggle, category filter |
| **Reduced motion** | Hook-based | `usePrefersReducedMotion` | Per-component via hook |
| **Mobile detection** | Hook-based | `useIsMobile` | Per-component via hook |

### Notable Observations

- **No global state management** beyond TanStack Query's cache (which is unused since there are no API calls)
- **No Context API** usage
- **No Redux, Zustand, Jotai, or any state library**
- All state is local `useState` — appropriate for a brochure site
- Smooth scroll (Lenis) initialized once in root component via `useEffect`

---

## API Layer

### API Architecture

**There is no API layer.** The project:

- Has no `services/`, `api/`, or `fetch` wrapper directories
- Makes zero HTTP requests to any backend
- Uses `@tanstack/react-query` with a `QueryClient` but never calls any query or mutation
- Has no Axios setup, no interceptors, no base URL configuration

### Data Source

All data comes from `src/lib/data.ts` — hardcoded arrays of projects, articles, services, testimonials, stats, process steps, FAQs, team members, and values. These are directly imported in route/component files.

### Data Flow (only data path)

```
lib/data.ts
    │
    ├── projects[]  → index.tsx, projects.index.tsx, projects.$slug.tsx, sitemap[.]xml.ts
    ├── articles[]  → index.tsx, news.index.tsx, news.$slug.tsx, sitemap[.]xml.ts
    ├── services[]  → index.tsx
    ├── testimonials[] → index.tsx
    ├── stats[]     → index.tsx, studio.tsx
    ├── process[]   → studio.tsx
    ├── faqs[]      → FAQ.tsx (used on index.tsx and pricing.tsx)
    ├── team[]      → studio.tsx
    └── values[]    → studio.tsx
```

---

## Authentication & Security

### Authentication

**There is no authentication system.** The site is fully public with:
- No login/logout flow
- No token storage
- No protected routes
- No role/permission system
- No session management

### Security Analysis

| Concern | Status | Notes |
|---------|--------|-------|
| Token handling | N/A | No tokens |
| XSS risks | Low | No user-generated content; all data is hardcoded |
| CSRF | N/A | No state-changing endpoints |
| Input validation | Weak | Contact form has `required` attribute (client-only) but no server validation |
| Unsafe HTML | None | No `dangerouslySetInnerHTML` usage |
| Environment variables | **Missing** | No `.env` files exist |
| Client-side secrets | None | No secrets exposed |
| Storage vulnerabilities | None | No localStorage/sessionStorage usage |
| API keys | None | Hardcoded `BASE_URL = ""` in sitemap — needs to be set |

**Finding:** `BASE_URL` in `sitemap[.]xml.ts:6` is an empty string with a TODO comment. The sitemap will generate relative URLs like `<loc>/project/foo</loc>` instead of absolute URLs.

---

## Forms

### Contact Form (`/contact`)

| Aspect | Implementation |
|--------|---------------|
| Library | Raw HTML (no React Hook Form / Formik) |
| Validation | HTML5 `required` attributes only |
| Fields | name, email, company, budget, message |
| Submission | `setTimeout` 700ms → toast.success |
| Backend | **None** — no actual HTTP request |
| UX | Disabled button while "submitting", toast notification |

### Newsletter Form (Footer)

| Aspect | Implementation |
|--------|---------------|
| Library | Raw HTML |
| Validation | `required` + `.trim()` check |
| Submission | toast.success immediately |
| Backend | **None** |

**Finding:** Both forms are purely cosmetic/frontend simulations with no backend integration.

---

## Styling System

### Architecture

```
Tailwind CSS v4 (no PostCSS, no tailwind.config.*)
       │
       ├── @tailwindcss/vite plugin
       ├── @import "tailwindcss" source(none)
       ├── @source "../src"  (content scanning)
       ├── @import "tw-animate-css" (animation utilities)
       │
       ├── @theme inline { ... }  (design tokens)
       │   ├── CSS custom properties for colors
       │   ├── Font families (Archivo, Instrument Serif)
       │   ├── Custom animations (marquee)
       │   └── Border radius scale
       │
       ├── :root { ... }  (CSS variables values in OKLCH)
       │
       ├── @utility ... (6 custom utilities)
       │   ├── container-site     # Max-width container with responsive padding
       │   ├── heading-display    # Display heading font
       │   ├── serif-accent       # Italic serif accent style
       │   ├── glass-panel        # Glassmorphism effect
       │   ├── noise-overlay      # SVG noise texture overlay
       │   ├── btn-pill           # Pill-shaped button
       │   └── link-underline     # Animated underline on hover
       │
       └── @layer base { ... }
           ├── Global border-color
           ├── Smooth scrolling
           ├── Body background/color/font
           └── ::selection colors
```

### Design Tokens

| Token | Value |
|-------|-------|
| **Radius** | 1rem base, scale from sm(-4px) to 4xl(+16px) |
| **Colors** | OKLCH-based dark palette |
| **Primary** | Near-white (#foreground) on near-black (#background) |
| **Accent** | Warm gold/amber `oklch(0.84 0.13 80)` |
| **Background** | Very dark `oklch(0.165 0.004 270)` |
| **Font Display** | Archivo (sans-serif, 600 weight) |
| **Font Serif Accent** | Instrument Serif (italic) |
| **Animations** | `marquee` 32s linear infinite, `marquee-slow` 55s |

### Color Variables

```css
--background: oklch(0.165 0.004 270);     /* near-black */
--foreground: oklch(0.955 0.008 95);      /* near-white */
--accent: oklch(0.84 0.13 80);            /* warm gold */
--muted-foreground: oklch(0.66 0.008 90); /* mid-gray */
--card: oklch(0.205 0.005 270);           /* slightly lighter than bg */
--border: oklch(1 0 0 / 10%);             /* 10% white */
```

### Dark Mode

A `@custom-variant dark (&:is(.dark *))` is defined but there is **no toggle mechanism**. The site is dark-only by default via the `:root` variables. The dark variant exists for shadcn/ui compatibility but is never triggered.

---

## UI/UX Analysis

### Layout System

- **Container**: `container-site` utility (max-width: 80rem, responsive 1.25rem / 2.5rem padding)
- **Grid**: CSS Grid (typically 12-column via `md:grid-cols-12` patterns)
- **Navigation**: Fixed header with scroll-aware glassmorphism (`glass-panel`)
- **Footer**: Multi-column grid with nav, social, newsletter
- **Responsive**: Mobile-first breakpoints (sm: 640px, md: 768px, lg: 1024px)

### Navigation UX

- Fixed position, z-50, transitions padding on scroll
- Background switches to `glass-panel` after scrolling past 24px
- Accent-colored scroll progress bar at top of viewport (spring-animated)
- Mobile: Hamburger icon → full-width drawer with staggered item animation
- Route change auto-closes mobile menu via `useEffect` watching `pathname`
- Active link styling via TanStack Router's `data-[status=active]` attribute

### Animation Philosophy

| Animation | Implementation | Accessibility |
|-----------|---------------|---------------|
| Scroll reveals | motion `whileInView` with blur + opacity + y | `once: true` (plays once per view) |
| Word stagger | `staggerChildren: 0.04` per word | `once: true` |
| 3D tilt | Mouse-driven rotateX/Y with spring physics | Falls back to `<div>` when reduced motion |
| Magnetic hover | Mouse-following translate with spring | No transform when reduced motion |
| Marquee | CSS `@keyframes marquee` property | Slowed variant (`marquee-slow`) available |
| Counters | `requestAnimationFrame` with ease-out (quartic) | Triggers once on scroll into view |
| Smooth scroll | Lenis with `lerp: 0.12` | — |
| Page transitions | None (instant route changes) | — |

### Accessibility Observations

**Good:**
- Semantic HTML (`<nav>`, `<main>`, `<footer>`, `<figure>`, `<figcaption>`, `<section>`)
- `aria-label`, `aria-expanded` on interactive elements
- `sr-only` labels for icon-only buttons
- Reduced-motion respect in Tilt and Magnetic components (hooks-based)
- Proper heading hierarchy (h1 → h2 → h3 → h4)
- Images have descriptive `alt` text
- `prefers-reduced-motion` hook available for future components

**Missing:**
- Skip-to-content link
- No explicit focus trapping in mobile menu
- Keyboard navigation for animated components untested
- No focus indicators visible in the dark theme beyond browser defaults

---

## Custom Hooks

| Hook | File | Purpose | Input | Output | Dependencies |
|------|------|---------|-------|--------|-------------|
| `useIsMobile` | `hooks/use-mobile.tsx` | Mobile breakpoint detection (768px) | None | `boolean` | `window.matchMedia`, resize listener |
| `usePrefersReducedMotion` | `hooks/use-reduced-motion.ts` | System motion preference | None | `boolean` | `window.matchMedia`, change listener |

**Observations:**
- Both hooks are well-implemented with proper cleanup on unmount
- `useIsMobile` has an initial `undefined` state (guarded by `!!` conversion)
- No custom hooks for data fetching, forms, or API calls
- Low hook count is appropriate for the project's scope

---

## Utility Functions

| Function | File | Purpose |
|----------|------|---------|
| `cn(...inputs)` | `lib/utils.ts` | Merge Tailwind classes (clsx + tailwind-merge) |
| `renderErrorPage()` | `lib/error-page.ts` | Generate inline HTML for 500 error page |
| `consumeLastCapturedError()` | `lib/error-capture.ts` | Retrieve last captured error with TTL check |
| `record(error)` | `lib/error-capture.ts` | Store error with timestamp (internal) |

---

## Performance Analysis

### Current State

| Concern | Assessment |
|---------|------------|
| **Lazy loading** | None — TanStack Router handles all routes eagerly |
| **Code splitting** | Not configured — all route components bundled together |
| **Image optimization** | Manual — images imported as static assets, no build-time optimization |
| **Memoization** | Minimal — no `React.memo`, `useMemo`, or `useCallback` usage |
| **Suspense** | Not used |
| **Bundle size** | Not measured; 50 unused shadcn/ui components inflate bundle significantly |
| **Font loading** | Google Fonts preconnect + preload stylesheet |
| **Image preloading** | Hero image has `rel: "preload"` with `fetchPriority: "high"` |

### Potential Bottlenecks

1. **50 unused shadcn/ui components** — each imports Radix primitives, `cn()`, etc. This adds significant dead code to the JavaScript bundle.
2. **No code splitting** — all route components bundled eagerly
3. **No image optimization pipeline** — full-resolution JPGs served as-is (hero image is 896×1280)
4. **Lenis + motion/react hook overhead** — scroll listeners and animation frames on every page

### Recommendations

1. Remove unused shadcn/ui components and their transitive dependencies
2. Add route-based code splitting (dynamic imports with React.lazy or TanStack Router's built-in lazy)
3. Consider `sharp`-based image optimization at build time
4. Image `loading="lazy"` is partially applied (ProjectCard, NewsCard use it) — extend to all below-fold images

---

## Dependency Analysis

### Core Dependencies

| Package | Version | Purpose | Actively Used? |
|---------|---------|---------|---------------|
| `react` | ^19.2.0 | UI library | Yes |
| `react-dom` | ^19.2.0 | DOM rendering | Yes |
| `@tanstack/react-router` | ^1.170.16 | File-based routing | Yes |
| `@tanstack/react-start` | ^1.168.26 | SSR framework | Yes |
| `@tanstack/react-query` | ^5.101.1 | Server state cache | Initialized, but **queries never called** |
| `@vitejs/plugin-react` | ^5.2.0 | Vite React plugin | Yes |
| `@tailwindcss/vite` | ^4.2.1 | Tailwind v4 Vite plugin | Yes |
| `tailwindcss` | ^4.2.1 | CSS framework | Yes |
| `motion` | ^12.42.2 | Animations (Framer Motion v12) | **Heavily** |
| `lucide-react` | ^0.575.0 | Icons | Yes |

### UI / Component Dependencies

| Package | Version | Purpose | Actively Used? |
|---------|---------|---------|---------------|
| `@radix-ui/*` (20+ packages) | Various | Headless UI primitives | **Mostly unused** (shadcn/ui dependencies) |
| `class-variance-authority` | ^0.7.1 | Variant component API | Unused (shadcn dependency) |
| `clsx` | ^2.1.1 | Class merging | Yes (via `cn()`) |
| `tailwind-merge` | ^3.5.0 | Tailwind class deduplication | Yes (via `cn()`) |
| `cmdk` | ^1.1.1 | Command menu | Unused (shadcn dependency) |
| `embla-carousel-react` | ^8.6.0 | Carousel | Unused (shadcn dependency) |
| `input-otp` | ^1.4.2 | OTP input | Unused (shadcn dependency) |
| `react-day-picker` | ^9.14.0 | Date picker | Unused (shadcn dependency) |
| `react-resizable-panels` | ^4.6.5 | Resizable panels | Unused (shadcn dependency) |
| `recharts` | ^2.15.4 | Charting | Unused (shadcn dependency) |
| `vaul` | ^1.1.2 | Drawer | Unused (shadcn dependency) |

### Form / Validation

| Package | Version | Purpose | Actively Used? |
|---------|---------|---------|---------------|
| `react-hook-form` | ^7.71.2 | Form management | **Unused** (forms use raw HTML) |
| `@hookform/resolvers` | ^5.2.2 | RHF validation resolvers | Unused |
| `zod` | ^3.24.2 | Schema validation | Unused |

### Other

| Package | Version | Purpose | Actively Used? |
|---------|---------|---------|---------------|
| `lenis` | ^1.3.25 | Smooth scrolling | Yes |
| `sonner` | ^2.0.7 | Toast notifications | Yes |
| `date-fns` | ^4.1.0 | Date formatting | **Unused** (dates are pre-formatted strings) |
| `tw-animate-css` | ^1.3.4 | Tailwind animation CSS | Yes (imported in styles.css) |
| `vite-tsconfig-paths` | ^6.0.2 | TS path resolution | In `dependencies` but **removed from config** |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^5.8.3 | Type checking |
| `eslint` | ^9.32.0 | Linting |
| `prettier` | ^3.7.3 | Formatting |
| `@types/react` | ^19.2.0 | React types |
| `@types/react-dom` | ^19.2.0 | React DOM types |
| `@types/node` | ^22.16.5 | Node types |
| `nitro` | 3.0.260603-beta | Server engine (TanStack Start dependency) |

### Unused Packages (Dead Weight)

- `react-hook-form` + `@hookform/resolvers`
- `zod`
- `date-fns`
- `vite-tsconfig-paths` (in deps, no longer in config)
- `cmdk`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `recharts`, `vaul`
- 50 of 51 `components/ui/*` files (everything except `sonner.tsx`)

---

## Code Quality Review

### Dead Code

1. **50 unused UI components** in `components/ui/` — only `sonner.tsx` is imported
2. **`vite-tsconfig-paths`** in `package.json` — removed from config but still listed as dependency
3. **`react-hook-form`, `zod`, `date-fns`** — imported in package.json but never used in source
4. **TanStack Query client** — created in `router.tsx` and provided in `__root.tsx` but never used for queries
5. **`cmdk`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `recharts`, `vaul`** — unused shadcn transitive dependencies
6. **Social links** in Footer — all `href="#"` with no real URLs
7. **`@tanstack/router-plugin`** — in dependencies but not configured in `vite.config.ts` (route tree appears pre-generated)
8. **Dark mode variant** — `@custom-variant dark` defined but never toggled

### Code Smells

1. **Hardcoded data** in `lib/data.ts` instead of CMS/API — acceptable for brochure site but limits scalability
2. **Simulated form submissions** — contact form and newsletter use `setTimeout` + toast with no actual backend call
3. **`BASE_URL = ""`** in sitemap — TODO not resolved
4. **Duplicate nav links** — defined in both `Nav.tsx` and `Footer.tsx`
5. **Magic numbers** — SCROLL_THRESHOLD = 24 in Nav, breakpoint = 768 in use-mobile
6. **Inline styles** in `error-page.ts` — inconsistent with the Tailwind design system
7. **No error boundaries on individual routes** — only root-level error component

### Large Files

- `index.tsx` (414 lines) — largest route, contains 8 section components inline
- `data.ts` (448 lines) — single file for all site content
- `routeTree.gen.ts` (241 lines) — auto-generated, acceptable

### Inconsistent Naming

- File: `use-mobile.tsx` (`.tsx` extension but contains no JSX — should be `.ts`)
- Hook: `usePrefersReducedMotion` uses full word "reduced" while file is `use-reduced-motion`
- Parameters in data: `suffixWord` used as additional suffix segment (confusing naming)

---

## Architecture Review

### SOLID Principles

| Principle | Assessment |
|-----------|------------|
| **Single Responsibility** | ✅ Good — components have clear, focused responsibilities |
| **Open/Closed** | ✅ Components accept props for extension without modification |
| **Liskov Substitution** | N/A — no inheritance |
| **Interface Segregation** | ✅ Props interfaces are minimal and focused |
| **Dependency Inversion** | ⚠️ All data depends on concrete `data.ts` file — no abstraction layer |

### Architecture Score: 7.5/10

**Strengths:**
- Modern, well-chosen stack (TanStack Start + React 19 + Vite 8 + Tailwind v4)
- Clean separation between components, hooks, lib, and routes
- Excellent animation system with accessibility considerations
- Strong SSR error recovery layer
- Consistent design system and component patterns

**Weaknesses:**
- No backend/API integration (by design for a brochure site, but limits real functionality)
- Significant unused dependency weight (~50 components + ~10 packages)
- No test infrastructure
- No environment configuration
- No real form submission handling

---

## Complete Data Flow

### Home Page — Counter Component Flow

```
User scrolls to About section
       │
       ▼
Reveal component detects element in viewport (whileInView)
       │
       ▼
Counter component's useInView fires (once: true, margin: "-60px")
       │
       ▼
useEffect starts requestAnimationFrame loop
       │
       ▼
Animation loop (60fps):
       ├── Calculate elapsed time from performance.now()
       ├── Apply quartic ease-out: 1 - (1-t)^4
       ├── setDisplay(Math.round(eased * value))
       └── requestAnimationFrame(tick) until t >= 1
       │
       ▼
Number animates: 0 → 40, 0 → 12, etc.
       │
       ▼
Component re-renders → DOM updated
```

### Navigation — Scroll Progress Bar Flow

```
User scrolls page
       │
       ▼
window scroll event (passive: true)
       │
       ▼
Nav component: setScrolled(window.scrollY > 24)
       │
       ▼
useScroll() from motion/react tracks scroll progress (0 to 1)
       │
       ▼
useSpring() smooths the value (stiffness: 120, damping: 30)
       │
       ▼
motion.div style={{ scaleX: springValue }}
       │
       ▼
Accent-colored bar at top of page fills from left to right
```

### Route Navigation — Project Detail Flow

```
User clicks ProjectCard
       │
       ▼
TanStack Router navigates to /projects/$slug
       │
       ├── SSR: loader({ params }) runs
       │       ├── projects.find(p => p.slug === params.slug)
       │       ├── if not found → throw notFound()
       │       └── return { project }
       │
       ├── head({ loaderData, params }) generates SEO meta
       │       ├── Dynamic title, description, OG tags
       │       └── JSON-LD structured data
       │
       ├── Route component renders
       │       ├── ArrowLeft link back to /projects
       │       ├── Project title (StaggerText)
       │       ├── Project metadata grid (client, year, services)
       │       ├── Hero image
       │       ├── Body paragraphs with Reveal animations
       │       ├── Next project preview + link
       │       └── CTASection
       │
       └── Client hydration
               ├── React hydrates static HTML
               ├── Lenis smooth scroll initialized
               └── Scroll progress bar activated
```

---

## Business Logic Mapping

### Where Business Rules Live

| Rule | Location | Type |
|------|----------|------|
| Category filter | `projects.index.tsx:23-24` | UI state filter |
| Pricing toggle | `PricingSection.tsx:44` | UI state toggle |
| FAQ accordion | `FAQ.tsx:8` | UI state (single open) |
| Scroll threshold | `Nav.tsx:24` | UX constant |
| Mobile breakpoint | `hooks/use-mobile.tsx:3` | UX constant |
| 404 handling | `projects.$slug.tsx:14`, `news.$slug.tsx:13` | Route guard |
| Error recovery | `server.ts:23-36`, `start.ts:5-18` | SSR resilience |
| Structured data | All route `head()` exports | SEO logic |
| Animation constraints | `Reveal.tsx:5-12`, `Tilt.tsx:17` | UX/animation |

### Validation Logic

- No Zod/Yup schemas exist
- Only HTML5 `required` attribute on form fields
- No server-side validation anywhere

### Conditional Rendering

| Condition | Component | Logic |
|-----------|-----------|-------|
| Active category | projects.index.tsx | `active === c` for button styles |
| Pricing toggle | PricingSection.tsx | `yearly` state for price display |
| FAQ open/close | FAQ.tsx | `openIndex === i` |
| Mobile menu open | Nav.tsx | `open` state + AnimatePresence |
| Scrolled state | Nav.tsx | `scrolled` state for glass effect |
| Popular plan | PricingSection.tsx | `plan.popular` for accent border + badge |
| Article type | news.$slug.tsx:62 | `category.includes("news")` for schema.org type |
| notFound route | projects.$slug.tsx, news.$slug.tsx | Loader throws notFound() |

---

## Dependency Graph

```
Routes
  │
  ├── __root.tsx
  │       ├── @tanstack/react-query (QueryClientProvider)
  │       ├── @tanstack/react-router (Outlet, Link, HeadContent, Scripts)
  │       ├── lenis (smooth scroll)
  │       ├── sonner (Toaster)
  │       ├── components/site/Nav
  │       │       ├── motion/react (AnimatePresence, useScroll, useSpring)
  │       │       ├── lucide-react (Menu, X, ArrowUpRight)
  │       │       └── components/site/Magnetic
  │       │               └── hooks/use-reduced-motion
  │       ├── components/site/Footer
  │       │       ├── lucide-react
  │       │       ├── sonner (toast)
  │       │       └── components/site/Reveal
  │       │               └── motion/react
  │       └── styles.css (imported via ?url)
  │               ├── tailwindcss v4 (@tailwindcss/vite)
  │               └── tw-animate-css
  │
  ├── index.tsx
  │       ├── motion/react (useScroll, useTransform)
  │       ├── lucide-react (ArrowUpRight, ArrowDown)
  │       ├── assets/*.jpg
  │       ├── lib/data
  │       ├── components/site/Reveal (+ StaggerText)
  │       ├── components/site/Marquee
  │       ├── components/site/Counter
  │       ├── components/site/ProjectCard
  │       │       ├── components/site/Tilt
  │       │       └── lib/utils
  │       ├── components/site/NewsCard
  │       │       ├── components/site/Tilt
  │       │       └── lib/utils
  │       ├── components/site/SectionHeading
  │       ├── components/site/PricingSection
  │       │       ├── motion/react
  │       │       ├── lucide-react
  │       │       ├── lib/utils
  │       │       └── components/site/Reveal
  │       ├── components/site/CTASection
  │       ├── components/site/FAQ
  │       │       ├── motion/react
  │       │       ├── lucide-react
  │       │       └── lib/data
  │       └── lib/utils
  │
  ├── studio.tsx
  │       ├── lucide-react, assets/studio-team.jpg
  │       ├── lib/data (process, team, values, stats)
  │       └── same component tree pattern
  │
  ├── projects.index.tsx → ProjectCard, CTASection, lib/data, lib/utils
  ├── projects.$slug.tsx → Reveal, StaggerText, CTASection, lib/data
  ├── news.index.tsx → NewsCard, CTASection, lib/data
  ├── news.$slug.tsx → NewsCard, CTASection, lib/data
  ├── pricing.tsx → PricingSection, FAQ, SectionHeading, CTASection
  ├── contact.tsx → lucide-react, sonner, Reveal, StaggerText
  └── sitemap[.]xml.ts → lib/data
```

---

## Feature Dependency Matrix

| Feature | Pages | Components | Hooks | APIs | State | Routes |
|---------|-------|------------|-------|------|-------|--------|
| **Home** | index.tsx | Reveal, StaggerText, Marquee, Counter, ProjectCard, NewsCard, SectionHeading, PricingSection, CTASection, FAQ | — | None | Local (useState) | `/` |
| **Studio** | studio.tsx | Reveal, StaggerText, Counter, SectionHeading, CTASection | — | None | Local | `/studio` |
| **Projects** | projects.index.tsx, projects.$slug.tsx | ProjectCard, Tilt, Reveal, StaggerText, CTASection | — | None | Local (category filter) | `/projects`, `/projects/$slug` |
| **News** | news.index.tsx, news.$slug.tsx | NewsCard, Tilt, Reveal, StaggerText, CTASection | — | None | None | `/news`, `/news/$slug` |
| **Pricing** | pricing.tsx | PricingSection, FAQ, SectionHeading, CTASection, Reveal | — | None | Local (yearly toggle) | `/pricing` |
| **Contact** | contact.tsx | Reveal, StaggerText | — | None | Local (form fields) | `/contact` |
| **Sitemap** | sitemap[.]xml.ts | — | — | None | None | `/sitemap.xml` |
| **SEO** | All routes | HeadContent | — | None | None | All |
| **Navigation** | __root.tsx | Nav, Magnetic, Footer | usePrefersReducedMotion | None | Local (scroll, menu) | All |
| **Animation** | All pages | Reveal, Tilt, Marquee, Magnetic, Counter, StaggerText | usePrefersReducedMotion | None | Local (inView) | All |

---

## Learning Documentation

### Project Overview

Lumera is an SSR marketing website for a creative studio. Built with **TanStack Start** (React 19 SSR), it uses file-based routing, Tailwind CSS v4, and extensive motion animations. All content is hardcoded in `src/lib/data.ts`.

### Developer Workflow

```bash
npm run dev       # Start dev server (Vite + SSR)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
npm run format    # Prettier
```

### Architecture Decisions

- **TanStack Start over Next.js**: Provides equivalent SSR with more flexible middleware, better TypeScript integration, and a less opinionated approach
- **Tailwind v4 over v3**: Uses the new CSS-first configuration (no config file, `@theme` directive, `@utility`)
- **Motion (Framer Motion v12) over alternatives**: Best-in-class React animation library with SSR support
- **No CMS / API**: Deliberate choice for a simple brochure site — data is static and changes infrequently

### Coding Conventions

- File-based routing: `routes/$feature.tsx` or `routes/$feature.$slug.tsx`
- Components directory: `components/site/` for domain components, `components/ui/` for primitives
- Path alias: `@/` maps to `src/`
- CSS: Tailwind utility classes + `cn()` helper for conditional classes
- Animations: `motion/react` with variants, scroll triggers, spring physics
- Icons: `lucide-react`
- Accessible motion: Always check `usePrefersReducedMotion()` for transformative effects

### Adding a New Page

1. Create `src/routes/new-page.tsx`
2. Export route definition: `export const Route = createFileRoute("/new-page")({...})`
3. Add `head()` for SEO meta
4. Add `component` for the page UI
5. Re-run dev server — `routeTree.gen.ts` auto-updates
6. Link from Nav.tsx and Footer.tsx if needed

### Potential Improvements

1. **Remove 50 unused shadcn/ui components** — saves bundle size
2. **Remove unused dependencies** — `react-hook-form`, `zod`, `date-fns`, `vite-tsconfig-paths`
3. **Add real form submission** — integrate with a form service (Formspree, Web3Forms) or API route
4. **Set `BASE_URL`** in sitemap — use an environment variable
5. **Add test coverage** — Vitest + React Testing Library
6. **Add route-level error boundaries** — currently only root-level
7. **Add loading states** — no Suspense or loading skeletons
8. **Extract shared nav link data** — deduplicate across Nav and Footer
9. **Consider a lightweight CMS** — Contentlayer, Sanity, or MDX for easier content management
10. **Add image optimization** — sharpen images at build time for performance

### Known Issues

- `BASE_URL` is empty in `sitemap[.]xml.ts:6` — sitemap URLs will be relative
- Social media links in Footer are `href="#"` placeholders
- Contact form and newsletter have no backend
- `vite-tsconfig-paths` is still in `package.json` dependencies but removed from config
- No `.env` files exist — environment configuration needed for production

---

*Report generated by deep architectural analysis of `F:\projects22\amitduggal-3d\frontend/` — 100% of files read and analyzed.*
