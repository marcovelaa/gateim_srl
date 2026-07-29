# SEO Compliance Specification

## Purpose

Define SEO requirements including meta tags, structured data, technical SEO, and content optimization for GATEIM SRL's local B2B market in Bolivia.

## Requirements

### Requirement: Page Meta Tags

Each page MUST have a unique `<title>` (50-60 chars, format: `{Keyword} | GATEIM SRL`) and unique `<meta name="description">` (120-160 chars). Each page MUST have a single `<h1>` with proper heading hierarchy (no skips). Each page MUST include a self-referencing `<link rel="canonical">`.

#### Scenario: Unique titles across pages

- GIVEN all 6 pages are built
- WHEN their `<title>` tags are compared
- THEN each title is unique, under 60 characters, and includes "GATEIM SRL"

#### Scenario: Heading hierarchy is correct

- GIVEN any page renders
- WHEN the heading structure is analyzed
- THEN there is exactly one `<h1>` and headings follow sequential order (h2 before h3)

### Requirement: Structured Data (JSON-LD)

The site MUST include JSON-LD schemas: `LocalBusiness` (in BaseLayout, all pages), `Organization` with `logo` (in BaseLayout), `BreadcrumbList` (on all internal pages, not home), `Service` (on `/servicios`, one per service), `FAQPage` (on `/servicios` and `/contacto`).

#### Scenario: LocalBusiness schema validates

- GIVEN the home page renders
- WHEN the JSON-LD is extracted
- THEN it contains a valid `LocalBusiness` schema with name, address (Santa Cruz de la Sierra, Bolivia), telephone, and openingHoursSpecification
- AND it passes Google Rich Results Test without errors

#### Scenario: FAQ schema on servicios

- GIVEN the `/servicios` page renders
- WHEN the JSON-LD is extracted
- THEN it contains a valid `FAQPage` schema with at least 4 questions relevant to industrial clients

### Requirement: Technical SEO

The site MUST generate `sitemap.xml` via `@astrojs/sitemap` and include `robots.txt` in `public/` allowing full crawl. `robots.txt` MUST reference the sitemap URL. Open Graph tags (`og:title`, `og:description`, `og:image`) MUST be present on all pages.

#### Scenario: Sitemap includes all pages

- GIVEN the site is built
- WHEN `sitemap.xml` is accessed
- THEN it lists all 6 page URLs with correct canonical domain

#### Scenario: robots.txt allows crawling

- GIVEN `robots.txt` is accessed
- WHEN a crawler reads it
- THEN no important pages are disallowed
- AND the sitemap URL is referenced

### Requirement: Core Web Vitals

The site MUST meet: LCP < 2.5s, INP < 200ms, CLS < 0.1. Images MUST use Astro's `<Image />` component for automatic WebP/AVIF optimization. Fonts MUST be self-hosted with `font-display: swap`. No heavy animation libraries (GSAP, Framer Motion).

#### Scenario: Lighthouse performance score

- GIVEN any page is tested with Lighthouse
- WHEN the Performance audit runs
- THEN the score is >= 95
- AND LCP, INP, and CLS meet their thresholds

### Requirement: Local SEO

NAP (Name, Address, Phone) MUST be consistent and identical across the site (header, footer, contact page, JSON-LD). The `/contacto` page MUST include the full address in real text (not only in an image or map). City/region mentions SHOULD appear naturally in content.

#### Scenario: NAP consistency

- GIVEN the company name, address, and phone appear in footer, contact page, and JSON-LD
- WHEN they are compared
- THEN all instances are character-identical
