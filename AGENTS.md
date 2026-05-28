# AI Coding Guidelines – MunichMakerLab Website

See [README.md](./README.md) for project structure and development commands.

---

## Language & Internationalisation

- English pages live in `src/pages/`. German pages live in `src/pages/de/` and mirror the English ones.
- **Always update both language versions** when adding or changing content.
- UI strings belong in `src/i18n/ui/en.ts` and `src/i18n/ui/de.ts` – never hardcode translatable strings directly in components.

### Punctuation conventions

- Use the en dash **`–`** (not a hyphen `-`) for pauses and ranges in both English and German text.
- Avoid overusing the dash in general – prefer rewriting the sentence instead.
- In **English** text: do **not** use a comma before "and" or "or" (no Oxford comma).
- In **German** text: follow standard German punctuation rules.

---

## Components & Code Reuse

- Prefer components over duplicating markup or styles across pages.
- Shared UI elements (social media links, newsletter signup, etc.) must live in `src/components/`.
- Avoid inline styles and inline `<script>` tags inside page files. Move logic into components.
- When a component is used in both languages, accept a `locale` prop and use `src/i18n/ui/ui-i18n-helper.ts` for translations.

---

## Design & Accessibility

- The site supports **dark mode** (via `data-theme` attribute), **mobile** and **desktop** viewports.
- Every change must work correctly in all three contexts. Use CSS custom properties (`var(--fg)`, `var(--muted)`, etc.) for colours – never hardcode hex values.
- Interactive elements must be keyboard-accessible and have appropriate `aria-label` attributes.
- Images must have meaningful `alt` text.

---

## Privacy & Security (DSGVO / GDPR)

- **Never place a plain-text email address in the HTML output.** At minimum obfuscate it (e.g. via the existing encoded-script pattern used on the contact page).
- Do not embed third-party scripts or tracking pixels without a documented legal basis.
- External links should use `target="_blank" rel="noopener noreferrer"`.
- Follow the [OWASP Top 10](https://owasp.org/www-project-top-ten/) for any dynamic or form-based functionality.
- The site must remain compliant with German DSGVO – when in doubt, do less, not more.

---

## General Principles

- Keep the site **simple and clean**. Avoid unnecessary features, dependencies or complexity.
- Prefer static output. Minimise client-side JavaScript – use `client:only` or `client:load` directives only where truly necessary.
- Run `npm run lint` and `npm run format:fix` before committing.
