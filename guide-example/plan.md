# Plan de Desarrollo — Sitio Web GATEIM SRL

> Documento base para usar como *brief* con Antigravity CLI (u otra IA de código).
> Objetivo: sitio estático multipágina, rápido, seguro, profesional. Sin base de datos.
> Único elemento funcional: formulario de contacto (vía servicio externo, sin backend propio).

---

## 1. Resumen del proyecto

- **Cliente:** GATEIM SRL — Asistencia técnica industrial y mecánica (Santa Cruz, Bolivia).
- **Tipo de sitio:** Corporativo, multipágina, 100% estático.
- **Referencia visual:** captura de diseño adjunta (`gateim.jpeg`) — usar como fuente de verdad para layout, colores, tipografía y jerarquía de contenido.
- **No incluye:** base de datos, login, panel admin, backend propio, CMS.
- **Incluye:** formulario de contacto funcional (envío de email vía servicio externo sin servidor propio).

---

## 2. Stack tecnológico

| Capa | Elección | Motivo |
|---|---|---|
| Framework | **Astro** | HTML estático por defecto, cero JS innecesario, sistema de componentes, optimización de imágenes integrada |
| Estilos | **Tailwind CSS** | Permite replicar el diseño con precisión y mantener consistencia entre páginas |
| Iconos | **lucide-icons** o **heroicons** (SVG inline) | Livianos, sin librerías pesadas |
| Formulario | **Cloudflare Pages Function + Resend** | Sin límite mensual realista (3,000 emails/mes gratis), sin dependencia de un SaaS externo |
| Anti-spam | Campo honeypot + Cloudflare Turnstile (opcional) | Protección sin afectar UX ni performance |
| Control de versiones | Git + GitHub | Necesario para CI/CD automático en el hosting |

**Por qué no Next.js/React puro:** no se necesita SSR, API routes ni estado dinámico. Añadiría peso y complejidad sin beneficio real para un sitio informativo estático.

---

## 3. Estructura de carpetas propuesta

```
gateim-web/
├── public/
│   ├── favicon.svg
│   ├── og-image.jpg
│   └── design-reference/
│       └── gateim.jpeg          ← captura de referencia para la IA
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Button.astro
│   │   ├── ServiceCard.astro
│   │   ├── ValueCard.astro
│   │   ├── StatItem.astro
│   │   ├── SectionTitle.astro
│   │   ├── CtaBanner.astro
│   │   └── ContactForm.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro          (Inicio)
│   │   ├── nosotros.astro
│   │   ├── servicios.astro
│   │   ├── proyectos.astro
│   │   ├── clientes.astro
│   │   └── contacto.astro
│   ├── styles/
│   │   └── global.css
│   └── data/
│       ├── servicios.json
│       ├── valores.json
│       └── proyectos.json
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

Usar `src/data/*.json` para el contenido repetible (servicios, valores, proyectos) evita duplicar texto entre componentes y facilita que la IA genere las cards de forma consistente.

---

## 4. Análisis de diseño (extraído de la captura)

### Paleta de colores
- **Azul marino oscuro** (fondos de header, footer, secciones destacadas): aprox. `#0B2140` – `#0D2B4E`
- **Amarillo/dorado** (acentos, botones CTA, íconos destacados): aprox. `#F4C430` – `#EFC94C`
- **Blanco** (fondos de contenido): `#FFFFFF`
- **Gris claro** (fondos alternos de sección): `#F5F6F8`
- **Gris texto** (párrafos): `#4A5568` aprox.

> Nota para la IA: ajustar estos tonos exactos usando un selector de color sobre la imagen (`gateim.jpeg`), no asumir los valores hexadecimales de este documento como definitivos.

### Tipografía
- **Titulares:** sans-serif bold/extra-bold, mayúsculas, trazo geométrico (similar a Poppins/Montserrat ExtraBold). Usar Google Fonts self-hosted para no penalizar performance.
- **Cuerpo de texto:** sans-serif regular/medium, alta legibilidad (Inter o similar).
- Jerarquía clara: eyebrow text pequeño en mayúsculas + color acento → título grande → párrafo descriptivo corto.

### Patrones de componente recurrentes
- **Cards de servicio:** ícono circular con fondo oscuro + título + descripción corta + link "VER MÁS →".
- **Bloques de valores (2x2):** ícono + título + descripción, sobre fondo blanco o panel oscuro.
- **Barra de estadísticas:** fondo azul marino, 4 columnas (ícono + número grande + etiqueta).
- **Botones:** primario = fondo amarillo + texto oscuro; secundario = borde blanco/oscuro + fondo transparente.
- **Secciones con imagen + texto lateral:** patrón repetido en "Sobre nosotros" y en cada especialidad de servicios.

---

## 5. Mapa del sitio y contenido por página

El diseño original es un long-scroll; se distribuye en páginas siguiendo el menú de navegación (Inicio, Nosotros, Servicios, Proyectos, Clientes, Contacto), reutilizando componentes compartidos (Header, Footer, CTA banner).

### `/` — Inicio
1. Hero (imagen de fondo + titular "SOLUCIONES INDUSTRIALES QUE MUEVEN TU PRODUCCIÓN" + 2 CTAs: "Nuestros servicios" / "Cotizar ahora")
2. Barra de 4 highlights: Experiencia / Calidad / Seguridad / Compromiso
3. Grid resumen de 4 servicios principales (Mantenimiento, Montaje, Fabricación, Soldadura)
4. Barra de estadísticas (10+ años, 200+ proyectos, 150+ clientes, 24/7 soporte)
5. Franja de logos de clientes
6. CTA banner "¿Tienes un proyecto? Estamos listos para ayudarte"
7. Footer

### `/nosotros`
1. Sección "Comprometidos con la industria" (imagen + checklist de fortalezas)
2. Bloque de valores 2x2 (Integridad, Responsabilidad, Innovación, Trabajo en equipo)
3. Reutilizar barra de estadísticas
4. CTA banner + Footer

### `/servicios`
1. Intro "Soluciones integrales para la industria"
2. Grid de 4 servicios (igual que inicio pero con más detalle, o expandido a más categorías)
3. Sección larga "Experiencia que genera confianza" con las 4 especialidades detalladas: Mantenimiento Mecánico, Mantenimiento Eléctrico, Instrumentación y Control, Paradas de Planta (imagen + texto por cada una)
4. CTA banner + Footer

### `/proyectos`
1. Galería completa de proyectos (grid ampliable, no solo 4 como en el preview del inicio)
2. Filtro opcional por categoría (solo si se mantiene 100% estático con CSS/JS mínimo, sin backend)
3. CTA banner + Footer

### `/clientes`
1. Grid de logos de empresas
2. Espacio opcional para testimonios (si el cliente los provee más adelante)
3. CTA banner + Footer

### `/contacto`
1. Bloque de información: ubicación, teléfono, correo, horario
2. Formulario funcional (nombre, empresa, teléfono, correo, mensaje)
3. Mapa embebido (Google Maps iframe, opcional)
4. Footer

---

## 6. Formulario de contacto — implementación

**Opción principal (recomendada): Cloudflare Pages Function propia + Resend**

En vez de depender del límite mensual de un SaaS de formularios de terceros (Web3Forms: 250/mes, Formspree: 50/mes, Getform: 100/mes), se usa una única función serverless dentro del mismo proyecto de Cloudflare Pages que envía el correo vía [Resend](https://resend.com) (3,000 emails/mes gratis, 100/día — más que suficiente para el volumen real de consultas de una empresa B2B industrial).

Ventajas sobre un servicio de formularios externo:
- No depende del "free tier" de un tercero que puede cambiar condiciones (varios de estos servicios ya han recortado límites en 2025-2026).
- Se despliega junto con el resto del sitio, sin plataforma adicional.
- Sigue sin base de datos ni servidor que mantener — es una función stateless de ~20 líneas.

Flujo:
1. Crear cuenta gratis en Resend, verificar el dominio de GATEIM (o usar su dominio de pruebas mientras se conecta el dominio final), obtener `API key`.
2. Crear `functions/api/contacto.js` en el proyecto (Cloudflare Pages detecta automáticamente cualquier archivo dentro de `functions/` como endpoint).
3. La función recibe el POST del formulario, valida los campos, y llama a la API de Resend para enviar el correo a GATEIM.
4. El `<form>` en `contacto.astro` hace `fetch('/api/contacto', { method: 'POST', body })` y muestra el estado de éxito/error sin recargar la página.
5. Agregar un campo honeypot oculto (`name="botcheck"`) + Cloudflare Turnstile (gratis, nativo del mismo proveedor) para anti-spam.

**Opción de respaldo sin código: [FormSubmit.co](https://formsubmit.co)**

Si en algún momento se prefiere evitar cualquier función propia: es gratis para siempre, sin límite de envíos, sin registro — solo se apunta el `action` del `<form>` a `https://formsubmit.co/tu-correo@gateim.com` y se confirma una vez por email. Contras: no tiene dashboard de respaldo (si se pierde un correo, no hay forma de recuperarlo) y conviene activar su modo de "endpoint hasheado" tras la primera confirmación para no exponer el correo en el HTML. Válido para arrancar rápido o como opción temporal mientras se implementa la función propia.

---

## 7. Requisitos no funcionales

- **Performance:** Lighthouse ≥ 95 en Performance/SEO/Accesibilidad/Best Practices. Imágenes en WebP/AVIF, lazy-loading nativo (`loading="lazy"`), fuentes self-hosted con `font-display: swap`.
- **Responsive:** mobile-first, aunque la referencia visual es desktop — la IA debe diseñar el comportamiento en móvil/tablet (stacking de columnas, menú hamburguesa).
- **SEO:** meta title/description por página, Open Graph, sitemap.xml, robots.txt, HTML semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- **Accesibilidad:** alt text en todas las imágenes, contraste AA mínimo, foco visible en elementos interactivos.
- **Seguridad:** HTTPS automático (lo da el hosting), sin scripts de terceros innecesarios, headers de seguridad básicos vía configuración del hosting (CSP, X-Frame-Options).

---

## 8. Plan de ejecución paso a paso (para Antigravity CLI)

No pedir el sitio completo en un solo prompt. Trabajar en fases con revisión entre cada una:

1. **Fase 0 — Setup:** Antigravity crea el proyecto Astro + Tailwind, estructura de carpetas, configuración base (fuentes, colores como variables Tailwind).
2. **Fase 1 — Componentes base:** Header, Footer, Button, SectionTitle, BaseLayout. Revisar visualmente antes de seguir.
3. **Fase 2 — Página Inicio:** construir completa, revisar contra la imagen de referencia.
4. **Fase 3 — Páginas restantes:** Nosotros, Servicios, Proyectos, Clientes, Contacto (una por una).
5. **Fase 4 — Formulario funcional:** crear la Cloudflare Pages Function `functions/api/contacto.js` conectada a Resend, + honeypot + Turnstile, probar envío real de principio a fin.
6. **Fase 5 — Pulido:** responsive, SEO, performance, accesibilidad.
7. **Fase 6 — Deploy:** conectar repo a Cloudflare Pages (o Netlify/Vercel), configurar dominio.

---

## 9. Despliegue

**Opción recomendada: Cloudflare Pages**
1. Subir el proyecto a un repo de GitHub.
2. En Cloudflare Pages → "Create a project" → conectar el repo.
3. Build command: `npm run build` · Output directory: `dist`
4. Deploy automático en cada push a `main`.
5. Dominio gratis `*.pages.dev`, o conectar dominio propio sin costo extra.

Netlify y Vercel siguen el mismo flujo (conectar repo → detecta Astro automáticamente → deploy). Nota: la Cloudflare Pages Function del formulario (sección 6) solo funciona tal cual en Cloudflare Pages; si se elige Netlify o Vercel, el mismo enfoque se adapta como Netlify Function o Vercel Function respectivamente (misma lógica, distinto proveedor), o se usa FormSubmit.co como alternativa sin código en cualquiera de los tres.

---



## 10. Checklist antes de dar por terminado

- [ ] Las 6 páginas cargan sin errores y respetan el diseño de referencia
- [ ] Formulario de contacto envía y llega el correo real
- [ ] Sitio responsive en móvil, tablet y desktop
- [ ] Lighthouse ≥ 95 en las 4 categorías
- [ ] robots.txt + sitemap.xml presentes
- [ ] HTTPS activo, dominio conectado
- [ ] Sin errores de consola ni imágenes rotas
- [ ] Revisión de textos/ortografía en español