# Prowtein

**A minimal desktop nutrition tracker. Built for people who know their macros.**

Free · Open source · macOS · Windows · Linux

---

## What it is

Prowtein is a fast, local-first desktop app for logging daily nutrition. No account, no cloud, no telemetry — just a SQLite file on your machine and a clean interface that gets out of your way.

- **⌘K quick-add** — type three letters, hit return, done
- **Food library** — register a food once, log it forever
- **Visual progress** — ring chart, weekly bar chart, streak counter
- **Export** — PDF, CSV, or Markdown
- **Privacy** — all data stays local

## Repository structure

```
Prowtein/
├── web/          # Marketing website (Next.js 14)
└── desktop/      # Desktop app (Tauri v2 + React)
```

## Getting started

### Website

```bash
cd web
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
```

### Desktop app

```bash
cd desktop
npm install
npm run tauri:dev     # launch the app (needs Rust + Tauri prerequisites)
npm run tauri:build   # produce installers
```

See [desktop/README.md](desktop/README.md) and [desktop/CHANGELOG.md](desktop/CHANGELOG.md).

## Tech stack

| Layer | Technology |
|---|---|
| Website | Next.js 14, Tailwind CSS, Framer Motion |
| Desktop | Tauri v2 (Rust core), React, TypeScript, Tailwind + shadcn, Framer Motion |
| Data | SQLite (local only) |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE).
