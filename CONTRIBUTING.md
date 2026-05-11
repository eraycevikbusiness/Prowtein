# Contributing to Prowtein

Thanks for your interest. Contributions are welcome — here's how to get started.

## Before you open a PR

- **Bug fix or small improvement?** Open a PR directly with a clear description.
- **New feature?** Open an issue first and describe what you want to add. This avoids duplicate work and keeps scope in check.
- **Design change to the website?** Screenshots help a lot.

## Development setup

### Website (`web/`)

```bash
cd web
npm install
npm run dev
```

Runs on `http://localhost:3000`. Hot reload is enabled.

**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide icons.

Key files:

| File | Purpose |
|---|---|
| `web/lib/i18n.ts` | All EN / DE / TR strings |
| `web/lib/LangContext.tsx` | Language state and `useLang()` hook |
| `web/app/globals.css` | Global styles and CSS custom properties |
| `web/components/` | One file per section / component |

### Desktop app (`desktop/`)

```bash
cd desktop
npm install
npm run tauri:dev
```

**Stack:** Tauri v2 (Rust core), React 18, TypeScript, Vite, Tailwind CSS + shadcn-style components, Framer Motion, `@tauri-apps/plugin-sql` (SQLite). Needs the Rust toolchain and the [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/).

Record every user-visible change in `desktop/CHANGELOG.md`. See `desktop/README.md` for the layout.

## Code style

- TypeScript everywhere — no `any` unless truly unavoidable
- Tailwind for all styling — no inline `style` except for dynamic values (transforms, gradients)
- One component per file
- No unnecessary abstractions — if something is used once, keep it inline

## Translations

Translations live in `web/lib/i18n.ts`. The supported languages are English (`en`), German (`de`), and Turkish (`tr`). If you add a new string, add it in all three languages. If you're not fluent in one of them, add a `// TODO: translate` comment and we'll fix it.

## Commit messages

Use plain imperative sentences:

```
Add Turkish translation for demo section
Fix navbar scroll detection on mobile
Update download card hover state
```

No ticket numbers, no emoji, no co-author lines unless relevant.

## Pull request checklist

- [ ] `npm run build` passes without errors
- [ ] No TypeScript errors (`npm run lint`)
- [ ] Translations added for all three languages (or marked TODO)
- [ ] Description explains *why*, not just *what*

## License

By contributing, you agree that your changes will be licensed under the MIT License.
