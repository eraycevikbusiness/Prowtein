# Prowtein — desktop app

A minimal, **local-first** desktop nutrition tracker. Built with **Tauri v2**
(Rust core) + React + TypeScript, styled with Tailwind + shadcn-style components
+ Framer Motion — the same warm "cream + coral" design system as the
[marketing site](../web).

- ⌘K quick-add — type three letters, hit return, logged
- A food library you register once and log forever
- Protein ring, weekly chart, streak counter
- Export a day to Markdown / CSV (clipboard)
- English / Deutsch / Türkçe — switch in Settings
- All data in one local SQLite file — no account, no cloud, no telemetry

See [`CHANGELOG.md`](./CHANGELOG.md) for the version history. Current: **v0.1.0**.

## Why Tauri (and not Electron)?

Smaller binaries, lower memory, a real Rust backend, and a sane security model.
A Tauri build of an app like this is single-digit MB; an Electron one ships a
whole Chromium. The repo's `CONTRIBUTING.md` already named Tauri as the plan —
this is that.

## Prerequisites

- **Node.js** 18+ and npm
- **Rust** (stable) — install via [rustup](https://rustup.rs)
- Platform build deps for Tauri v2 — see the
  [Tauri prerequisites guide](https://v2.tauri.app/start/prerequisites/)
  (macOS: Xcode Command Line Tools; Linux: `webkit2gtk` + friends; Windows:
  MSVC build tools + WebView2)

## Develop

```bash
cd desktop
npm install
npm run tauri:dev      # launches the app with hot-reload (Vite + Rust)
```

Frontend only (in a browser, no native shell — SQL/clipboard calls will throw):

```bash
npm run dev            # http://localhost:1420
```

## Build a release

```bash
npm run icons          # optional: regenerate the icon set from src-tauri/icons/icon.png
npm run tauri:build    # produces a .app/.dmg (macOS), .msi/.exe (Windows), .AppImage/.deb (Linux)
```

Output lands in `src-tauri/target/release/bundle/`.

## Project layout

```
desktop/
├── index.html              # Vite entry; loads web fonts
├── vite.config.ts          # port 1420, @ → src alias, Tauri-friendly build targets
├── tailwind.config.ts      # warm palette + shadcn tokens
├── components.json          # shadcn config (for `npx shadcn add …`)
├── CHANGELOG.md             # ← keep this updated with every user-visible change
├── src/
│   ├── main.tsx             # React root
│   ├── App.tsx              # shell: sidebar + topbar + view + ⌘K listener
│   ├── index.css            # design system (CSS vars + a few component classes)
│   ├── lib/
│   │   ├── db.ts            # SQLite queries (@tauri-apps/plugin-sql)
│   │   ├── store.ts         # zustand app state + actions
│   │   ├── types.ts         # Food / Entry / Goals …
│   │   ├── format.ts        # dates, meal kinds, macro math, fuzzy search
│   │   ├── export.ts        # day → Markdown / CSV + clipboard
│   │   └── utils.ts         # cn() helper
│   └── components/
│       ├── ui/              # shadcn-style primitives (button, dialog, input, label)
│       ├── Sidebar.tsx  TopBar.tsx  TodayView.tsx  MealRow.tsx
│       ├── QuickAdd.tsx     # ⌘K command palette (cmdk)
│       ├── LibraryView.tsx  FoodFormDialog.tsx
│       ├── ExportDialog.tsx SettingsDialog.tsx  Ring.tsx
└── src-tauri/
    ├── Cargo.toml           # tauri 2, tauri-plugin-sql (sqlite), clipboard-manager
    ├── tauri.conf.json      # window config, bundle metadata
    ├── capabilities/default.json   # permissions for the main window
    ├── icons/icon.png       # placeholder app icon (replace before release)
    └── src/
        ├── main.rs
        └── lib.rs           # registers plugins; SQL migrations + seed library
```

## Data

On first launch, `lib.rs` runs migration v1: it creates `foods`, `entries` and
`settings` tables, seeds ~16 starter foods, and sets default goals (150 g
protein, 2200 kcal). The database file is `prowtein.db` in the app's data
directory (e.g. `~/Library/Application Support/com.eraycevik.prowtein/` on
macOS). It's a plain SQLite file — copy it, back it up, or move it between
machines.

To evolve the schema, add a new `Migration { version: 2, … }` to the vec in
`src-tauri/src/lib.rs` (never edit the v1 SQL — existing users won't re-run it).

## License

MIT — see [`../LICENSE`](../LICENSE).
