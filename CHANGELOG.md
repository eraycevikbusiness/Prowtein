# Changelog

## v0.1.0 — May 2026

First public release.

### New
- Today view — protein ring, calorie total, macro split bar (protein / carbs / fat)
- Quick-add via Ctrl+K / ⌘K — fuzzy search across your food library, hit Enter to log
- Food Library — save a food once with its macros and a default serving; log it in two keystrokes from then on
- Day navigation — step backward and forward through days, jump back to today
- Weekly bar chart and streak counter in the sidebar
- Edit or remove a logged meal
- Export the current day to Markdown or CSV (copied to clipboard)
- Settings — set your daily protein and calorie goals; switch language
- Local-first storage — a single SQLite file in your OS app-data folder. No account, no cloud, no telemetry
- Windows desktop build via Tauri
- Full UI in English, German and Turkish

### Notes
- Built with Tauri 2 (Rust) + React + TypeScript, Tailwind CSS, Framer Motion. MIT-licensed.
- macOS and Linux builds are planned for a future release.
