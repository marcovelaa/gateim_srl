# Tasks: build-gateim-site

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 2,500–3,500 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | 6 work units (see below) |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Project setup + config + base components | PR 1 | `npm run build` | `npm run dev` — verify Header/Footer render | Revert all src/ and config files |
| 2 | Home page complete | PR 2 | `npm run build && npx astro check` | `npm run dev` — visual check at 375/768/1440px | Remove `src/pages/index.astro` |
| 3 | Remaining 5 pages + 404 | PR 3 | `npm run build` | `npm run dev` — navigate all routes | Remove individual page files |
| 4 | Contact form function | PR 4 | `npm run build` | Manual POST to `/api/contacto` with test data | Remove `functions/` directory |
| 5 | SEO (meta, JSON-LD, sitemap, FAQ) | PR 5 | `npm run build` | Lighthouse + Rich Results Test | Revert BaseLayout meta changes |
| 6 | Polish (responsive, a11y, performance) | PR 6 | `npm run build` | Lighthouse ≥ 95 on all pages | Revert CSS/layout tweaks |

## Phase 1: Foundation

- [x] 1.1 Initialize Astro project with `npm create astro@latest ./` (empty template, TypeScript strict)
- [x] 1.2 Install Tailwind CSS: `npx astro add tailwind`
- [x] 1.3 Install `@astrojs/sitemap` integration
- [x] 1.4 Configure `tailwind.config.mjs` with design tokens (colors.navy, colors.gold, colors.gray-light, fontFamily.heading, fontFamily.body)
- [x] 1.5 Download Montserrat (ExtraBold, Bold) and Inter (Regular, Medium) .woff2 to `public/fonts/`
- [x] 1.6 Create `src/styles/global.css` with @font-face declarations and base resets
- [x] 1.7 Create all `src/data/*.json` files: servicios, valores, proyectos, clientes, stats
- [x] 1.8 Create `public/robots.txt`

## Phase 2: Base Components

- [x] 2.1 Create `src/layouts/BaseLayout.astro` (head, meta, OG, canonical, fonts, slot)
- [x] 2.2 Create `src/components/Header.astro` (logo, nav links, CTA button, mobile hamburger)
- [x] 2.3 Create `src/components/Footer.astro` (links, services, social icons, ISO badges, copyright)
- [x] 2.4 Create `src/components/Button.astro` (primary/secondary variants with Props interface)
- [x] 2.5 Create `src/components/SectionTitle.astro` (eyebrow + title + description)
- [x] 2.6 Create `src/components/ServiceCard.astro` (image + icon overlay + title + desc + link)
- [x] 2.7 Create `src/components/ValueCard.astro` (icon + title + description)
- [x] 2.8 Create `src/components/StatItem.astro` (number + label)
- [x] 2.9 Create `src/components/CtaBanner.astro` (background image + text + CTA button)
- [x] 2.10 Create `src/components/ContactForm.astro` (fields + honeypot + client validation)
- [x] 2.11 Create `src/components/FaqSection.astro` (accordion + FAQPage JSON-LD)

## Phase 3: Pages

- [x] 3.1 Create `src/pages/index.astro` — Hero, highlights, services grid, stats, projects preview, clients, CTA
- [x] 3.2 Create `src/pages/nosotros.astro` — About section, values grid, stats bar, CTA
- [x] 3.3 Create `src/pages/servicios.astro` — Services grid + 4 detailed specialties + FAQ section
- [x] 3.4 Create `src/pages/proyectos.astro` — Projects gallery grid
- [x] 3.5 Create `src/pages/clientes.astro` — Client logos grid
- [x] 3.6 Create `src/pages/contacto.astro` — Contact info + form + FAQ section
- [x] 3.7 Create `src/pages/404.astro` — Custom 404 with nav back

## Phase 4: Contact Form Backend

- [x] 4.1 Create `functions/api/contacto.js` — Cloudflare Pages Function
- [x] 4.2 Configure server-side validation and Resend API integration
- [ ] 4.3 Wire ContactForm.astro client-side fetch to `/api/contacto`

## Phase 5: SEO & Structured Data

- [x] 5.1 Verify meta tags (title, description, canonical) on all 6 pages
- [x] 5.2 Verify JSON-LD schemas (LocalBusiness, Organization, Service, BreadcrumbList, FAQPage)
- [x] 5.3 Verify `robots.txt` and `sitemap.xml` build output JSON-LD to all internal pages
- [ ] 5.4 Add Service JSON-LD schemas to servicios.astro
- [ ] 5.5 Add FAQPage JSON-LD to servicios.astro and contacto.astro
- [ ] 5.6 Verify sitemap.xml generates correctly with all routes

## Phase 6: Polish & Verification

- [ ] 6.1 Test responsive at 375px, 768px, 1440px — fix stacking/spacing issues
- [ ] 6.2 Verify keyboard navigation (Tab/Enter) on header, mobile menu, form
- [ ] 6.3 Verify all images have descriptive alt text and use `<Image />` component
- [ ] 6.4 Run Lighthouse on all pages — target ≥ 95 in all categories
- [ ] 6.5 Verify NAP consistency across footer, contacto, and JSON-LD
- [ ] 6.6 Visual comparison against `gateim.jpeg` at desktop resolution
- [ ] 6.7 Run `npm run build` — zero errors and warnings
