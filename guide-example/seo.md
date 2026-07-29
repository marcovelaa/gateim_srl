# SEO.md — Reglas de SEO del proyecto GATEIM SRL

> Complementa a `AGENTS.md` (sección 6). Léelo junto con `PLAN_DESARROLLO_GATEIM.md`
> antes de construir cualquier página. Objetivo: que GATEIM aparezca cuando alguien en
> Bolivia busque servicios de mantenimiento, montaje o soldadura industrial.

Contexto clave: es un negocio **local B2B**, no e-commerce. El SEO local (Google
Business Profile + consistencia NAP) pesa más que el volumen de tráfico genérico.
Google sigue citando en AI Overviews casi siempre páginas que ya rankean bien de
forma orgánica — el SEO tradicional sigue siendo el prerrequisito, no algo aparte.

---

## 1. SEO técnico (no negociable)

- HTTPS activo (automático en el hosting elegido) — verificar que no haya
  contenido mixto (`http://` colado en algún `src`).
- `sitemap.xml` generado con `@astrojs/sitemap`, referenciado en `robots.txt`.
- `robots.txt` en `public/` permitiendo crawl completo (nada de negocio se
  beneficia de bloquear páginas).
- Cada página con `<link rel="canonical">` autoreferenciado.
- URLs limpias, minúsculas, sin parámetros: `/servicios`, `/proyectos`, nunca
  `/Servicios.html?id=2`.
- Página 404 personalizada, con navegación de vuelta al sitio (no un error crudo).
- Un solo dominio canónico: decidir `www` o sin `www` y redirigir 301 el otro.

## 2. Core Web Vitals (factor de ranking confirmado)

- **LCP** (carga del elemento más grande) < 2.5s → imagen del hero optimizada
  y con `loading="eager"` + `fetchpriority="high"`.
- **INP** (interactividad, reemplazó a FID) < 200ms → esto es lo que más falla
  en sitios en 2026 según los datos de Google. Evitar JS bloqueante; el menú
  móvil y el formulario deben responder de forma instantánea.
- **CLS** (estabilidad visual) < 0.1 → todo `<img>` con `width`/`height`
  explícitos (o `aspect-ratio` en CSS) para que el navegador reserve el
  espacio antes de que cargue la imagen.
- Verificar con PageSpeed Insights real (no solo Lighthouse local) antes de
  dar el sitio por terminado — los datos de campo (CrUX) a veces difieren del
  lab.

## 3. SEO on-page — reglas por página

Para cada una de las 6 páginas (`/`, `/nosotros`, `/servicios`, `/proyectos`,
`/clientes`, `/contacto`):

- **Title único** (50–60 caracteres): `[Keyword principal] | GATEIM SRL`.
  Ejemplo: `Mantenimiento Industrial en Santa Cruz | GATEIM SRL`.
- **Meta description única** (120–160 caracteres), con un beneficio claro y
  un CTA implícito. Nunca copiar/pegar la misma entre páginas.
- **Un solo `<h1>`** con la keyword principal de esa página, en lenguaje
  natural (no relleno de keywords).
- **Primer párrafo** de cada página responde la intención de búsqueda en las
  primeras 2 frases, antes de entrar en detalle — esto ayuda tanto a SEO
  clásico como a que un sistema de IA pueda citar la respuesta directamente.
- **Contenido real, no delgado:** mínimo ~300 palabras en páginas de servicio,
  evitando relleno — cada párrafo debe aportar algo que el usuario busca
  (qué es el servicio, para qué industrias, cómo trabaja GATEIM).
- **Internal linking:** cada página de servicio enlaza a `/proyectos`
  (evidencia de trabajo real) y a `/contacto`. La home enlaza a las 5 páginas
  internas desde el contenido, no solo desde el menú.
- **Nombres de archivo de imagen descriptivos:**
  `mantenimiento-mecanico-industrial-bolivia.webp`, nunca `IMG_2024.jpg`.
- **Alt text con keyword natural**, sin forzarlo: `"Técnico realizando
  mantenimiento de bomba industrial en planta"`, no `"mantenimiento industrial
  mantenimiento industrial Bolivia"`.

## 4. Datos estructurados (Schema.org / JSON-LD)

Implementar en `BaseLayout.astro` y por página según corresponda:

- **`LocalBusiness` / `ProfessionalService`** (en el layout base, aparece en
  todas las páginas): `name`, `address` (Santa Cruz de la Sierra, Bolivia),
  `telephone`, `openingHoursSpecification`, `geo` (lat/long), `sameAs`
  (enlaces a redes sociales reales de GATEIM), `image`, `url`.
- **`Service`** en `/servicios`, uno por cada servicio ofrecido (Mantenimiento
  Mecánico, Eléctrico, Instrumentación y Control, Paradas de Planta).
- **`BreadcrumbList`** en todas las páginas internas (no en home).
- **`Organization`** con `logo` en el layout base.
- Validar cada schema con el Rich Results Test de Google antes de lanzar —
  un schema con errores puede ser ignorado por completo.
- **Nunca inventar** `aggregateRating` ni reviews que no existan — es
  contenido engañoso y Google lo penaliza si lo detecta.

## 5. SEO local (lo más importante para este negocio)

- **NAP consistente** (Nombre, Address, Phone): el nombre exacto, dirección y
  teléfono deben aparecer **idénticos** en el sitio y en el futuro Google
  Business Profile — hasta la forma de escribir la dirección debe coincidir.
- La página `/contacto` incluye la dirección completa **en texto real** (no
  solo dentro de la imagen del mapa) para que sea rastreable.
- Mencionar la ciudad/zona de cobertura de forma natural en el contenido
  ("brindamos servicio en Santa Cruz de la Sierra y alrededores"), sin
  forzarlo en cada párrafo.
- Dejar preparado (aunque se configure después del deploy, fuera del código):
  reclamar y optimizar el Google Business Profile con la misma categoría de
  negocio, fotos reales, y horario idéntico al del sitio.
- Google Maps embebido en `/contacto` con la ubicación real de GATEIM.

## 6. Contenido pensado también para IA (AI Overviews / asistentes)

Desde 2025-2026, buscadores y asistentes de IA citan directamente contenido
bien estructurado. No es una estrategia aparte, es escribir bien:

- Encabezados explícitos y párrafos cortos (2-4 frases).
- Responder la pregunta implícita del encabezado en la primera frase que le
  sigue, y recién después dar contexto/detalle.
- Sección de **preguntas frecuentes** en `/servicios` y `/contacto` (mínimo
  4-6 preguntas reales que un cliente industrial haría: "¿trabajan paradas de
  planta programadas?", "¿qué certificaciones tienen?", "¿en qué industrias
  tienen experiencia?") con schema `FAQPage`.
- Usar listas y checklists donde aplique (ya existe el patrón en "Sobre
  nosotros") — es formato fácil de extraer tanto para buscadores como IA.

## 7. Señales de confianza (E-E-A-T)

- Mostrar años de experiencia, certificaciones ISO y clientes reales (ya
  están en el diseño) de forma consistente en todas las páginas relevantes,
  no solo en el footer.
- Si GATEIM tiene testimonios o reviews reales de clientes, incluirlos con
  su fuente — nunca redactar testimonios ficticios.
- Página `/proyectos` con casos reales (nombre de industria/sector si el
  cliente lo permite, no necesariamente el nombre exacto del cliente) da más
  credibilidad que solo fotos genéricas.

## 8. Checklist final antes de lanzar

- [ ] `sitemap.xml` accesible y sin errores
- [ ] `robots.txt` no bloquea nada importante
- [ ] Los 6 title y las 6 meta description son únicos
- [ ] Un solo `h1` por página, jerarquía de encabezados correcta
- [ ] Todos los schemas validan sin errores en Rich Results Test
- [ ] PageSpeed Insights (mobile) en verde para LCP, INP y CLS
- [ ] NAP idéntico en el sitio (listo para reflejar en Google Business Profile)
- [ ] Sin contenido duplicado entre páginas
- [ ] Todas las imágenes con nombre de archivo y alt descriptivos
- [ ] FAQ con schema `FAQPage` en servicios y contacto

---



```

```
