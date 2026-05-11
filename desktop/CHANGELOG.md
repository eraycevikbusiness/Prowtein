# Changelog — Prowtein desktop

All notable changes to the **desktop app** are recorded here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/); this file
is the source of truth for what the app actually does (the marketing site's
changelog is a little more aspirational).

> **Update this file in the same commit as any user-visible change.**
> Bump `version` in `package.json` and `src-tauri/{Cargo.toml,tauri.conf.json}`
> together when cutting a release.

## [Unreleased]

_Nothing yet._

## [0.1.0] — 2026-05-12

First stable build. The core loop — see your day, quick-add a meal, keep a
library — all works, with local SQLite persistence.

### Added

- **Today view** — a protein ring, the day's calories against your goal, a
  segmented protein/carbs/fat bar, and a timeline of logged meals with a
  derived meal-kind label (breakfast/lunch/snack/dinner) and time.
- **Day navigation** — `‹` / `›` to move between days, a "Today" jump button,
  and clickable bars in the week chart to jump to any day this week.
- **⌘K quick-add** — a fuzzy command palette over your library, ranked with
  most-eaten foods first; `↵` logs the highlighted food (1 serving) to the
  selected day. If nothing matches, `Create "…" as a new food` opens the form
  pre-filled and logs it on save.
- **Food Library** — list, search (fuzzy), add, edit and delete foods; each
  food stores its per-serving macros and a serving label. Deleting a food
  removes its logged entries too (with a confirm).
- **Edit a logged meal** — click a meal row to change its servings (with a
  ±0.5 stepper and a live macro preview) or remove it.
- **Daily goals** — set your protein and calorie targets in Settings; the ring
  and the week chart fill against the protein goal.
- **Streak + week chart** — consecutive days with ≥1 entry, plus a 7-day
  protein mini-chart in the sidebar.
- **Export** — copy the selected day's log to the clipboard as **Markdown**
  (for notes) or **CSV** (for spreadsheets).
- **Local-first storage** — a single SQLite file (`prowtein.db`) in the app's
  data directory, created and migrated on first launch. No account, no cloud,
  no telemetry, no network calls (web fonts aside).
- **Starter library** — 16 common foods seeded on first run so the app is
  useful immediately.

### Tech

- Tauri v2 (Rust core) + React 18 + TypeScript + Vite 6.
- Tailwind CSS v3 + shadcn-style components (Radix UI, `cmdk`, `cva`) +
  Framer Motion — the same warm "cream + coral" design system as the website.
- Data layer: `@tauri-apps/plugin-sql` (SQLite), migrations defined in Rust.
- Clipboard via `@tauri-apps/plugin-clipboard-manager`.

### Known limitations / not yet in 0.1

- English UI only (the website is EN/DE/TR — app localization is planned).
- No dark mode.
- Export is clipboard-only (save-to-file `.md` / `.csv` and PDF are planned).
- No calendar grid or standalone stats page (the week chart covers the basics).
- No sync. (The plan is to let you point `prowtein.db` at any folder, so
  iCloud Drive / Dropbox / Syncthing handles it — without a server.)
- Web fonts (Manrope, Instrument Serif) load from Google Fonts; bundling them
  for fully-offline first paint is planned. They fall back to system fonts.
- App icons are a generated placeholder — run `npm run icons` with your own
  source image before a release build.

[Unreleased]: https://github.com/eraycevikbusiness/Prowtein/compare/desktop-v0.1.0...HEAD
[0.1.0]: https://github.com/eraycevikbusiness/Prowtein/releases/tag/desktop-v0.1.0
