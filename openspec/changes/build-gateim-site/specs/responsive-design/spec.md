# Responsive Design Specification

## Purpose

Define responsive behavior, design tokens, and interaction patterns for the GATEIM SRL site across mobile, tablet, and desktop viewports.

## Requirements

### Requirement: Mobile-First Breakpoints

CSS MUST be written mobile-first (375px base). Breakpoints: `md` (768px) for tablet, `lg` (1440px) for desktop. Layouts MUST stack into single columns on mobile and expand to multi-column on larger viewports.

#### Scenario: Services grid stacks on mobile

- GIVEN a viewport width of 375px
- WHEN the services grid renders
- THEN service cards stack vertically in a single column

#### Scenario: Services grid expands on desktop

- GIVEN a viewport width of 1440px
- WHEN the services grid renders
- THEN service cards display in a 4-column grid

### Requirement: Mobile Navigation

The Header MUST display a hamburger menu icon on viewports below `md` (768px). The menu MUST open/close on tap and be operable via keyboard (Tab/Enter). The full horizontal nav MUST display on viewports at or above `md`.

#### Scenario: Hamburger menu toggles

- GIVEN a viewport width below 768px
- WHEN a user taps the hamburger icon
- THEN the navigation menu expands/collapses
- AND the menu is operable via keyboard

### Requirement: Design Tokens

Colors, typography, and spacing MUST be defined as design tokens in `tailwind.config.mjs`. Token names: `colors.navy`, `colors.gold`, `colors.gray-light`, `fontFamily.heading` (Montserrat), `fontFamily.body` (Inter). No hardcoded hex values in markup.

#### Scenario: Design tokens applied consistently

- GIVEN the Tailwind config defines `colors.navy` as the primary dark color
- WHEN any component uses the navy background
- THEN it references the token class (e.g., `bg-navy`) not a hex value

### Requirement: Image Stability

All `<img>` elements MUST have explicit `width` and `height` attributes or CSS `aspect-ratio` to prevent layout shift (CLS). Images outside the initial viewport MUST use `loading="lazy"`. The hero image MUST use `loading="eager"` with `fetchpriority="high"`.

#### Scenario: No layout shift from images

- GIVEN an image loads after the page renders
- WHEN the image appears
- THEN no surrounding content shifts position
- AND CLS contribution is 0

### Requirement: Interactive Feedback

Every clickable element (buttons, links, cards) MUST have explicit `hover`, `focus-visible`, and `active` states defined. Focus indicators MUST be visible and meet WCAG 2.1 AA contrast requirements.

#### Scenario: Button hover state

- GIVEN a user hovers over a CTA button
- WHEN the cursor enters the button area
- THEN the button visually changes (color, shadow, or scale)
- AND `focus-visible` shows a distinct outline on keyboard focus
