

# Proposal: build-gateim-site

## Intent

Build the corporate website for GATEIM SRL from scratch to establish their digital presence. This static site will showcase their industrial technical assistance services, projects, and clients.

## Scope

### In Scope

- Setup Astro + Tailwind CSS environment.
- Create 6 static pages: Home, Nosotros, Servicios, Proyectos, Clientes, Contacto.
- Implement UI components based on the design reference.
- Create a serverless contact form using Cloudflare Pages Function + Resend.
- Apply full SEO compliance (Core Web Vitals, JSON-LD, sitemap, meta tags).
- Manage content via JSON data files (`src/data/*.json`).

### Out of Scope

- Interactive complex client-side applications (React/Vue/Svelte).
- Sub-routes for individual services.
- Database integration or CMS setup.
- Third-party font CDNs.

## Capabilities

### New Capabilities

- `static-pages`: 6 functional Astro pages with semantic HTML.
- `contact-form`: Secure form submission with Cloudflare Turnstile and Resend.
- `responsive-design`: Mobile-first responsive UI via Tailwind CSS.
- `seo-compliance`: JSON-LD structured data and Core Web Vitals optimization.

### Modified Capabilities

- None

## Approach

We will build a static multi-page site using Astro and Tailwind CSS. The UI will follow a mobile-first approach utilizing the defined color palette (navy blue, gold accent) and self-hosted fonts (Montserrat, Inter). Content will be decoupled from components into `src/data/*.json` files. For the contact form, a Cloudflare Pages Function will process submissions via the Resend API. The architecture strictly limits client-side JS to essential UI interactions (mobile menu) and form validation to ensure Lighthouse scores ≥ 95.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `/` | High | Project root setup (Astro config, Tailwind, global styles) |
| `src/pages/` | High | All 6 primary pages |
| `src/components/` | High | Reusable Astro components (Nav, Footer, Cards) |
| `src/data/` | High | Content JSON files |
| `functions/` | High | Cloudflare Pages Function for contact form |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Form spam | Medium | Implement Honeypot and Cloudflare Turnstile. |
| Performance drop | Low | Use Astro's `<Image />`, self-host fonts, minimize client-side JS. |
| SEO regressions | Low | Validate JSON-LD schemas, monitor Lighthouse scores in build. |

## Rollback Plan

Since this is a greenfield project with no prior production version, rollback entails reverting to the initial empty repository state via `git reset --hard` to the initial commit, and unpublishing the Cloudflare Pages deployment.

## Dependencies

- Cloudflare Pages
- Resend API (for email delivery)
- Turnstile API (for anti-spam)

## Success Criteria

- [ ] 6 functional pages accessible without errors.
- [ ] Lighthouse score ≥ 95 in all 4 categories.
- [ ] Contact form successfully delivers emails via Resend.
- [ ] Core Web Vitals targets met (LCP < 2.5s, INP < 200ms, CLS < 0.1).
- [ ] Zero client-side JS errors.
