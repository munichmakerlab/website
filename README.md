# MunichMakerLab Website

This website is built with [Astro](https://astro.build) and tries to minimize complexity and special-purpose additions for maintainability's sake.

For AI/Human coding guidelines see [AGENTS.md](./AGENTS.md).

---

## Project Structure

The actual pages are in [`src/pages/`](/src/pages/) and are mostly Markdown/MDX. Adding a new page is as simple as creating a new file, copying the frontmatter from an existing page and customising it.

```text
/
├── public/               # Static assets (fonts, images, manifest)
├── src/
│   ├── assets/           # Processed assets (images referenced in pages)
│   ├── components/       # Reusable Astro/Vue components
│   ├── i18n/ui/          # UI translation strings (en.ts, de.ts)
│   ├── layouts/          # Page layouts (Content.astro wraps all pages)
│   └── pages/            # English pages (default)
│       └── de/           # German translations of each page
└── package.json
```

---

## Internationalisation (i18n)

- **English** is the default language. All pages live directly in `src/pages/`.
- **German** translations live in `src/pages/de/` and mirror the English pages.
- When adding or editing a page, always update **both** language versions.
- UI strings (navigation, footer, etc.) are managed in `src/i18n/ui/en.ts` and `src/i18n/ui/de.ts`.

---

## Development Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
| `npm run lint`            | Lint the project with ESLint                     |
| `npm run format:check`    | Check code styling with Prettier                 |
| `npm run format:fix`      | Fix code styling with Prettier                   |

---

## Further Reading

- [Astro documentation](https://docs.astro.build)
- [Astro Discord server](https://astro.build/chat)
