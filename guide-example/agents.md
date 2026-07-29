# AGENTS.md — Reglas del proyecto GATEIM SRL

> Este archivo se lee automáticamente al inicio de cada sesión. Contiene los
> estándares no negociables del proyecto. No los repitas en el chat: si algo
> aquí no se está cumpliendo, corrígelo antes de seguir avanzando.

Contexto del proyecto: ver `PLAN_DESARROLLO_GATEIM.md` para stack, mapa del
sitio y fases. Este archivo cubre el **cómo** construir, no el **qué**.

---

## 0. Principios generales

- **KISS.** La solución más simple que cumple el requisito es la correcta.
  No agregues abstracciones, librerías ni configuración "por si acaso".
- **DRY con criterio.** Si un patrón se repite 3+ veces, extráelo a un
  componente o a `src/data/*.json`. Si se repite 2 veces, está bien duplicado
  todavía — no fuerces una abstracción prematura.
- **YAGNI.** No implementes CMS, panel admin, i18n, dark mode ni nada que no
  esté en el plan, aunque parezca "buena práctica" en abstracto.
- **Mobile-first.** Escribe el CSS pensando primero en 375px de ancho y luego
  expande con breakpoints (`md:`, `lg:`) — no al revés.
- **Progressive enhancement.** El sitio debe verse y funcionar (salvo el
  envío del form) incluso si el JS falla en cargar. Nada crítico depende de
  JavaScript del lado del cliente.
- Antes de dar una fase por terminada, revisa este archivo de arriba a abajo
  como checklist.

---

## 1. HTML y semántica

- Un solo `<h1>` por página. Jerarquía de encabezados sin saltos (`h2` antes
  que `h3`, nunca al revés).
- Etiquetas semánticas obligatorias: `<header>`, `<nav>`, `<main>`,
  `<section>`, `<article>` (para cada card de servicio/proyecto),
  `<footer>`. Nada de `<div>` genérico donde exista una etiqueta semántica.
- Todo elemento interactivo debe ser `<button>` o `<a>` real, nunca un
  `<div onclick>`.
- Atributo `alt` descriptivo en cada `<img>`. Si una imagen es puramente
  decorativa, `alt=""` (no omitir el atributo).
- `lang="es"` en `<html>`, meta `viewport` correcto, `<title>` y
  `<meta name="description">` únicos por página.

## 2. CSS / Tailwind

- Solo clases utilitarias del core de Tailwind — nada de `@apply` masivo ni
  CSS custom salvo casos puntuales (ej. animaciones específicas) en
  `src/styles/global.css`.
- Colores, tipografía y espaciados van en `tailwind.config.mjs` como design
  tokens (`colors.navy`, `colors.gold`, etc.) — nunca valores hex sueltos
  repetidos en el markup.
- Orden de clases consistente: layout → spacing → tipografía → color →
  estados (`hover:`, `focus:`). Usa el mismo orden en todo el proyecto.
- Prohibido `!important`. Si sientes que lo necesitas, el problema es de
  especificidad/orden, no de prioridad.
- Todo estado interactivo (`hover`, `focus`, `active`) debe estar definido
  explícitamente — nunca dejar un elemento clickeable sin feedback visual.

## 3. Astro / arquitectura de componentes

- Un componente = una responsabilidad. Si un `.astro` supera ~150 líneas,
  probablemente debe dividirse.
- Props tipadas con TypeScript en cada componente (`interface Props {}`),
  nunca `any`.
- Contenido repetible (servicios, valores, proyectos, clientes) vive en
  `src/data/*.json`, no hardcodeado dentro de los `.astro`.
- `BaseLayout.astro` centraliza `<head>`, meta tags, fuentes y el
  Header/Footer — ninguna página individual debe redefinir esto.
- Cero JavaScript del lado del cliente salvo lo estrictamente necesario
  (menú móvil, envío del formulario). Si Astro puede resolverlo en build
  time, resuélvelo ahí.

## 4. Performance

- Toda imagen pasa por el componente `<Image />` de Astro (optimización
  automática a WebP/AVIF) — nunca `<img src="...">` directo con archivos del
  diseño original sin procesar.
- `loading="lazy"` en toda imagen fuera del viewport inicial; la imagen del
  hero se carga con prioridad (`loading="eager"`).
- Fuentes autoalojadas (`@font-face` local, no `<link>` a Google Fonts en
  runtime) con `font-display: swap`.
- Cero librerías de animación pesadas (GSAP, Framer Motion) para efectos que
  CSS puede resolver con `transition`/`animation`.
- Antes de cerrar cada fase de página, corre Lighthouse local. Objetivo:
  Performance ≥ 95, Accesibilidad ≥ 95, Best Practices ≥ 95, SEO = 100.

## 5. Accesibilidad (WCAG 2.1 AA)

- Contraste mínimo 4.5:1 en texto normal, 3:1 en texto grande — verificar
  especialmente el texto sobre el fondo amarillo/dorado.
- Todo `<form>` con `<label>` asociado a su input (no placeholder como único
  label).
- Foco visible (`focus-visible`) en todos los elementos interactivos — nunca
  `outline: none` sin un reemplazo visual equivalente.
- Menú de navegación operable por teclado (Tab/Enter), incluido el menú
  móvil.
- Botones y links con texto descriptivo — nada de "Ver más" suelto sin
  contexto para lectores de pantalla (usar `aria-label` si el texto visible
  es ambiguo).

## 6. SEO técnico

- `title` único por página (formato: `Página | GATEIM SRL`), `description`
  única, entre 120–160 caracteres.
- Open Graph completo (`og:title`, `og:description`, `og:image`) en
  `BaseLayout.astro`.
- `sitemap.xml` generado automáticamente (integración `@astrojs/sitemap`) y
  `robots.txt` en `public/`.
- URLs limpias y descriptivas en minúsculas (`/servicios`, no
  `/Servicios.html`).
- Datos estructurados JSON-LD tipo `LocalBusiness` en la página de inicio o
  contacto (nombre, dirección, teléfono de GATEIM).

## 7. Seguridad

- Ninguna API key ni secreto en el código del cliente. La key de Resend vive
  como variable de entorno del lado del servidor (Cloudflare Pages
  environment variable), nunca en un archivo `.astro` ni en el JS del
  navegador.
- La función `functions/api/contacto.js` valida y sanitiza todos los campos
  del lado del servidor antes de reenviarlos — nunca confiar solo en la
  validación HTML/JS del cliente.
- Rechazar la petición si el campo honeypot llega con contenido.
- Headers de seguridad básicos vía `public/_headers` (Cloudflare Pages):
  `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  `Content-Security-Policy` restrictiva.
- Ninguna dependencia de npm se agrega sin verificar que sea necesaria — cada
  paquete nuevo es superficie de ataque adicional.

## 8. Git y control de versiones

- Commits atómicos: un commit = un cambio lógico. Nunca mezclar "agregar
  página Servicios" con "arreglar bug del formulario" en el mismo commit.
- Mensajes en imperativo y en español, formato `tipo: descripción` (ej.
  `feat: agregar página de proyectos`, `fix: corregir contraste en botón CTA`).
- Nunca commitear `node_modules/`, `.env`, ni archivos de configuración local
  del editor.
- Al cerrar cada fase del plan (sección 8 de `PLAN_DESARROLLO_GATEIM.md`),
  hacer commit antes de pasar a la siguiente.

## 9. Antes de marcar cualquier fase como completa

- [ ] `npm run build` corre sin errores ni warnings
- [ ] Revisado en viewport de 375px, 768px y 1440px
- [ ] Sin errores en la consola del navegador
- [ ] Todas las imágenes tienen `alt`
- [ ] Lighthouse ≥ 95 en las 4 categorías
- [ ] HTML válido (sin etiquetas sin cerrar, sin anidamiento incorrecto)
- [ ] Comparado visualmente contra `gateim.jpeg` — desviaciones justificadas,
      no accidentales

## 10. Qué NO hacer

- No inventar contenido/datos (teléfonos, certificaciones, cifras) que no
  estén en el diseño de referencia o en el plan — dejar un placeholder
  visible (`[PENDIENTE: confirmar cifra]`) y avisar en el resumen de la fase.
- No agregar frameworks, CMS headless, ni backend adicional "para dejarlo
  listo a futuro".
- No usar imágenes de stock genéricas sin avisar — el diseño usa fotografía
  industrial específica que debería reemplazarse por fotos reales de GATEIM
  cuando estén disponibles.
- No saltar directamente a escribir código sin haber confirmado el plan de
  la fase correspondiente conmigo.