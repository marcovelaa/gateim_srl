# Static Pages Specification

## Purpose

Define the structure, content, and behavior of all pages and shared components for the GATEIM SRL corporate website.

## Requirements

### Requirement: Page Structure

The site MUST consist of 7 pages: Home (`/`), Nosotros (`/nosotros`), Servicios (`/servicios`), Proyectos (`/proyectos`), Clientes (`/clientes`), Contacto (`/contacto`), and a custom 404 page.

Each page MUST use `BaseLayout.astro` which centralizes `<head>`, meta tags, fonts, Header, and Footer.

#### Scenario: All pages render without errors

- GIVEN a built Astro site
- WHEN a user navigates to any of the 7 defined routes
- THEN the page renders with Header, main content, and Footer
- AND no console errors appear

#### Scenario: Unknown route shows 404

- GIVEN a user navigates to a non-existent route
- WHEN the server responds
- THEN the custom 404 page is shown with navigation back to the site

### Requirement: Home Page Sections

The Home page (`/`) MUST display these sections in order: Hero with 2 CTAs, highlights bar (4 items), services grid (4 cards), stats bar, projects preview, clients logo strip, CTA banner.

#### Scenario: Home page loads with all sections

- GIVEN a user navigates to `/`
- WHEN the page renders
- THEN all 7 sections are visible in the defined order
- AND services cards link to `/servicios`
- AND CTA buttons link to `/servicios` and `/contacto`

### Requirement: Shared Components

The site MUST include reusable components: Header (logo + nav + CTA button + mobile menu), Footer (logo + links + social icons + ISO certifications), SectionTitle, Button, ServiceCard, ValueCard, StatItem, CtaBanner.

#### Scenario: Header navigation works

- GIVEN the Header component renders on any page
- WHEN a user clicks a navigation link
- THEN they navigate to the corresponding page
- AND the current page link is visually distinguished

### Requirement: Data-Driven Content

Repeatable content MUST be stored in `src/data/*.json` files: `servicios.json`, `valores.json`, `proyectos.json`, `clientes.json`, `stats.json`. Components MUST read from these files, not hardcode content.

#### Scenario: Service cards render from JSON

- GIVEN `src/data/servicios.json` contains 4 service entries
- WHEN the services grid component renders
- THEN 4 service cards appear with title, description, and icon from JSON data

### Requirement: Footer Content

The Footer MUST display: company logo and tagline, quick links, services list, social media icons (Facebook, LinkedIn, Instagram, WhatsApp), ISO certification badges (9001, 14001, 45001), and copyright with current year.

#### Scenario: Footer shows ISO certifications

- GIVEN the Footer component renders
- WHEN the page loads
- THEN ISO 9001, ISO 14001, and ISO 45001 badges are visible
