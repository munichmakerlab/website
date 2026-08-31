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

### Node version

The repo ships an [`.nvmrc`](./.nvmrc), so with
[nvm](https://github.com/nvm-sh/nvm) installed you can pick the right version automatically:

```sh
nvm install   # first time only – installs the version from .nvmrc
nvm use       # switch the current shell to it
```

If `npm run build` fails with `Node.js vXX is not supported by Astro!`, you are on an
older version – run `nvm use` and try again.

### Commands

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

## Testing the contact form

The contact forms ([`ContactForm.astro`](/src/components/ContactForm.astro)) use hCaptcha for
spam protection, and **sending cannot be tested on a local dev server**:

- hCaptcha refuses to run on `localhost` and `127.0.0.1`.
- Its official test key renders the widget anywhere, but produces a token that only validates
  against the matching test secret – which Web3Forms does not hold. Submitting then fails with
  `Could not validate hCaptcha`.

So test the full send on the deployed site. Locally you can still work on everything else by
rendering the form without the captcha:

```astro
<ContactForm captcha={false} />
```

If a submission fails, the browser console carries the message Web3Forms actually returned;
the visitor only ever sees the generic localised error.

---

## Further Reading

- [Astro documentation](https://docs.astro.build)
- [Astro Discord server](https://astro.build/chat)
