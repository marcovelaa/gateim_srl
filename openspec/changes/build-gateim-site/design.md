# Design: build-gateim-site

## Technical Approach

Static multi-page site built with Astro + Tailwind CSS. Each page is an `.astro` file that imports shared components and reads content from `src/data/*.json`. Zero client-side JS except mobile menu toggle and contact form fetch. Contact form processed by a Cloudflare Pages Function that calls Resend API. Self-hosted fonts via `@font-face` in `global.css`.

## Architecture Decisions

### Decision: Astro over Next.js/Vite-React

**Choice**: Astro with `.astro` components
**Alternatives**: Next.js (SSR/SSG), Vite + React SPA
**Rationale**: No dynamic state needed. Astro ships zero JS by default, produces pure HTML/CSS. Better Lighthouse scores with less effort. Built-in image optimization via `<Image />`.

### Decision: Tailwind design tokens over CSS custom properties

**Choice**: Tailwind `theme.extend` in `tailwind.config.mjs`
**Alternatives**: CSS custom properties in `:root`, Sass variables
**Rationale**: Tailwind tokens integrate directly with utility classes. Single source of truth for colors/fonts/spacing. Consistent with agents.md rules (no hex in markup).

### Decision: JSON data files over Astro Content Collections

**Choice**: `src/data/*.json` imported directly
**Alternatives**: Astro Content Collections with `.md` files
**Rationale**: Content is structured data (services, stats, clients), not long-form prose. JSON is simpler, no MDX overhead, easily editable by non-developers.

### Decision: Cloudflare Pages Function over external form SaaS

**Choice**: `functions/api/contacto.js` + Resend API
**Alternatives**: FormSubmit.co, Web3Forms, Formspree
**Rationale**: No monthly submission limits. Deploys with the site. Full control over validation and email formatting. Resend free tier = 3,000 emails/month.

## Data Flow

```
Browser Form Submit
       │
       ▼
fetch('/api/contacto', POST)
       │
       ▼
┌─────────────────────────┐
│ functions/api/contacto.js│
│  1. Validate fields      │
│  2. Check honeypot       │
│  3. Sanitize input       │
│  4. Call Resend API      │
└─────────┬───────────────┘
          │
          ▼
   Resend API → Email to GATEIM
          │
          ▼
   JSON response → Browser shows success/error
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `astro.config.mjs` | Create | Astro config with sitemap integration |
| `tailwind.config.mjs` | Create | Design tokens: navy, gold, fonts |
| `package.json` | Create | Dependencies: astro, tailwind, @astrojs/sitemap |
| `src/layouts/BaseLayout.astro` | Create | Head, meta, OG tags, JSON-LD, Header, Footer |
| `src/components/Header.astro` | Create | Logo, nav, CTA, mobile hamburger |
| `src/components/Footer.astro` | Create | Links, services, social, ISO badges, copyright |
| `src/components/Button.astro` | Create | Primary (gold) and secondary (outline) variants |
| `src/components/SectionTitle.astro` | Create | Eyebrow + title + description pattern |
| `src/components/ServiceCard.astro` | Create | Image + icon + title + description + link |
| `src/components/ValueCard.astro` | Create | Icon + title + description (2x2 grid) |
| `src/components/StatItem.astro` | Create | Number + label for stats bar |
| `src/components/CtaBanner.astro` | Create | CTA section with background image |
| `src/components/ContactForm.astro` | Create | Form with honeypot + client validation |
| `src/components/FaqSection.astro` | Create | FAQ accordion with FAQPage JSON-LD |
| `src/pages/index.astro` | Create | Home page |
| `src/pages/nosotros.astro` | Create | About page |
| `src/pages/servicios.astro` | Create | Services page (single page, all services) |
| `src/pages/proyectos.astro` | Create | Projects gallery page |
| `src/pages/clientes.astro` | Create | Clients page |
| `src/pages/contacto.astro` | Create | Contact page with form |
| `src/pages/404.astro` | Create | Custom 404 page |
| `src/styles/global.css` | Create | @font-face, base resets, custom animations |
| `src/data/servicios.json` | Create | 4 main + 4 specialized services |
| `src/data/valores.json` | Create | 4 company values |
| `src/data/proyectos.json` | Create | Project entries (placeholder) |
| `src/data/clientes.json` | Create | 5 client logos (YPFB, SOBOCE, etc.) |
| `src/data/stats.json` | Create | 4 stats (years, projects, clients, 24/7) |
| `public/robots.txt` | Create | Allow all, reference sitemap |
| `public/fonts/` | Create | Montserrat + Inter .woff2 files |
| `functions/api/contacto.js` | Create | Form handler with Resend integration |

## Interfaces / Contracts

```typescript
// src/components/ServiceCard.astro
interface Props {
  title: string;
  description: string;
  icon: string;      // SVG path or component name
  image: string;     // path to service image
  link?: string;     // anchor link within /servicios
}

// src/components/Button.astro
interface Props {
  variant: 'primary' | 'secondary';
  href?: string;     // renders <a> if present, <button> if not
  type?: 'button' | 'submit';
  class?: string;
}

// src/data/servicios.json shape
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  details: string;   // extended description for /servicios
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Build | All pages compile | `npm run build` — zero errors/warnings |
| Visual | Match design reference | Manual comparison at 375px, 768px, 1440px |
| Lighthouse | Performance ≥ 95 | Lighthouse CLI on each page |
| SEO | JSON-LD validity | Google Rich Results Test |
| Form | End-to-end submission | Manual test with real Resend API key |
| A11y | WCAG 2.1 AA | Lighthouse accessibility audit + manual keyboard nav |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

No migration required. Greenfield project deploys directly to Cloudflare Pages.

## Open Questions

- [ ] Confirm real phone number, address, and email for NAP consistency
- [ ] Obtain real project photos from GATEIM (using placeholders until provided)
- [ ] Confirm social media profile URLs (Facebook, LinkedIn, Instagram, WhatsApp)
- [ ] Obtain Resend API key for form testing
