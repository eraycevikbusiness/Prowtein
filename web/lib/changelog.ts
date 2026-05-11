export type ChangeKind = "new" | "added" | "changed" | "fixed" | "notes";
export type ReleaseStatus = "latest" | "pre" | "unreleased";

export interface ChangeGroup {
  kind: ChangeKind;
  items: string[];
}

export interface Release {
  /** Either a semver string like "0.1.0", or the literal "unreleased". */
  version: string;
  /** Locale-neutral human date, e.g. "May 2026". */
  date: string;
  status: ReleaseStatus;
  /** Short English summary line. */
  title: string;
  groups: ChangeGroup[];
}

/**
 * Hand-written changelog. Entry bodies stay in English (the way GitHub releases
 * read); the surrounding page chrome is translated via `t.changelog`.
 */
export const RELEASES: Release[] = [
  {
    version: "unreleased",
    date: "on the workbench",
    status: "unreleased",
    title: "What's next",
    groups: [
      {
        kind: "new",
        items: [
          "Dark mode — a warm, low-light variant of the whole app.",
          "Point your data file at any folder, so iCloud Drive / Dropbox / Syncthing gives you sync without a server.",
          "Linux ARM builds (Raspberry Pi, ARM laptops).",
          "Per-meal notes and an optional photo.",
        ],
      },
      {
        kind: "changed",
        items: ["Faster cold start — target is under 200 ms to an interactive window."],
      },
    ],
  },
  {
    version: "0.1.0",
    date: "May 2026",
    status: "latest",
    title: "First public build",
    groups: [
      {
        kind: "new",
        items: [
          "⌘K quick-add — type three letters, hit return, logged.",
          "Food Library — register a food once with its macros and a default serving; log it forever.",
          "Daily slides — one clean view per day, swipe through your week.",
          "Visual progress — protein ring, weekly bar chart, streak counter.",
          "Export to PDF, CSV or Markdown.",
          "Local-first storage — a single SQLite file in your OS app-data folder. No account, no cloud, no telemetry.",
          "Native desktop builds for macOS (Universal), Windows (x64) and Linux (AppImage).",
          "Signed binaries and opt-in auto-update.",
          "Full UI in English, German and Turkish.",
        ],
      },
      {
        kind: "notes",
        items: [
          "Built with Blazor Hybrid + .NET MAUI. MIT-licensed — source on GitHub.",
          "Under 15 MB per platform. No Electron.",
        ],
      },
    ],
  },
  {
    version: "0.0.3",
    date: "April 2026",
    status: "pre",
    title: "Beta 3 — charts & speed",
    groups: [
      {
        kind: "added",
        items: [
          "Weekly bar chart and streak counter.",
          "Keyboard navigation for the whole day view (j / k, return, ⌫).",
        ],
      },
      {
        kind: "changed",
        items: [
          "New fuzzy matcher — sub-millisecond search across ~1k foods.",
          "Most-eaten foods now float to the top of ⌘K automatically.",
        ],
      },
      {
        kind: "fixed",
        items: [
          "Crash when logging a food with an empty serving size.",
          "Off-by-one in the week-start day on locales where the week starts on Sunday.",
        ],
      },
    ],
  },
  {
    version: "0.0.2",
    date: "March 2026",
    status: "pre",
    title: "Beta 2 — the Library",
    groups: [
      {
        kind: "added",
        items: ["Food Library with default servings.", "Edit and delete past entries."],
      },
      {
        kind: "changed",
        items: ["Moved the data store from a JSON file to SQLite."],
      },
      {
        kind: "fixed",
        items: [
          "Decimal-separator handling on German and Turkish locales.",
          "Window size and position no longer reset on quit.",
        ],
      },
    ],
  },
  {
    version: "0.0.1",
    date: "February 2026",
    status: "pre",
    title: "First alpha",
    groups: [
      {
        kind: "added",
        items: [
          "Day view with manual meal entry.",
          "Protein ring against a daily goal.",
          "macOS build only.",
        ],
      },
    ],
  },
];
