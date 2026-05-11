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
- Windows and macOS desktop builds via Tauri (the macOS build is a universal binary — Apple Silicon and Intel)
- Full UI in English, German and Turkish

### Notes
- Built with Tauri 2 (Rust) + React + TypeScript, Tailwind CSS, Framer Motion. MIT-licensed.
- The macOS build isn't notarized yet — on first launch, right-click Prowtein → Open to get past Gatekeeper.
- A Linux build is planned for a future release.
