# `src/components`

Home for **new, clean, reusable components** going forward. Organized by role:

| Folder | Purpose | Examples |
|---|---|---|
| `ui/` | Framework-agnostic UI primitives — reusable across any domain | `ui/Embla` (carousel) |
| `colleges/` | College domain components | `CollegeCard`, `CollegeCarouselClient` |

Add new domain folders (e.g. `courses/`, `exams/`) as needed, and put shared
primitives in `ui/`.

## Where things live (project-wide)

- **`src/app/components/`** — App Router infrastructure: providers, lazy wrappers,
  SEO helpers (`ClientProviders`, `ClientWrappers`, `JsonLd`, `AnimateOnScroll`,
  `Breadcrumb`). Tied to the app shell — leave here.
- **`src/@core/components/`** — legacy template components imported by many pages.
  Do **not** mass-move (breaks imports). New work goes in `src/components/`.
- **`src/components/`** — this directory. New, clean, domain/UI components.

## Conventions

- Client components that lazy-load heavy children should be registered in
  `src/app/components/ClientWrappers.tsx` (e.g. `LazyCollegeCarousel`).
- Prefer scoped CSS modules over global styles. Use the
  `var(--brand-navy, #254692)` fallback form — `--brand-navy` is not globally
  defined in this project.
