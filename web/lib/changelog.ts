import type { Lang } from "./i18n";

export type ChangeKind = "new" | "added" | "changed" | "fixed" | "notes";
export type ReleaseStatus = "latest" | "pre" | "unreleased";

export interface ChangeGroup {
  kind: ChangeKind;
  items: Record<Lang, string>[];
}

export interface Release {
  version: string;
  date: string;
  status: ReleaseStatus;
  title: Record<Lang, string>;
  groups: ChangeGroup[];
}

export const RELEASES: Release[] = [
  {
    version: "0.1.0",
    date: "May 2026",
    status: "latest",
    title: {
      en: "First public release",
      de: "Erste öffentliche Version",
      tr: "İlk genel sürüm",
    },
    groups: [
      {
        kind: "new",
        items: [
          {
            en: "Today view — protein ring, calorie total, macro split bar (protein / carbs / fat).",
            de: "Tagesansicht — Protein-Ring, Kaloriensumme, Makro-Balken (Protein / Kohlenhydrate / Fett).",
            tr: "Günlük görünüm — protein halkası, kalori toplamı, makro çubuğu (protein / karbonhidrat / yağ).",
          },
          {
            en: "Quick-add via Ctrl+K / ⌘K — fuzzy search across your food library, hit Enter to log.",
            de: "Schnell-Hinzufügen via Strg+K / ⌘K — Fuzzy-Suche in der Bibliothek, Enter zum Eintragen.",
            tr: "Ctrl+K / ⌘K ile hızlı ekleme — kütüphanede bulanık arama, kaydetmek için Enter.",
          },
          {
            en: "Food Library — save a food once with its macros and a default serving; log it in two keystrokes from then on.",
            de: "Lebensmittel-Bibliothek — einmal mit Makros und Standardportion anlegen; danach mit zwei Tasten eintragen.",
            tr: "Yiyecek Kütüphanesi — bir yiyeceği makrolarıyla bir kez kaydet; sonrasında iki tuşla ekle.",
          },
          {
            en: "Day navigation — step backward and forward through days, jump back to today.",
            de: "Tagesnavigation — vorwärts und rückwärts durch Tage blättern, zum heutigen Tag springen.",
            tr: "Gün navigasyonu — günler arasında ileri geri geçiş, bugüne dön.",
          },
          {
            en: "Weekly bar chart and streak counter in the sidebar.",
            de: "Wöchentliches Balkendiagramm und Serien-Zähler in der Seitenleiste.",
            tr: "Yan panelde haftalık çubuk grafik ve seri sayacı.",
          },
          {
            en: "Edit or remove a logged meal.",
            de: "Eine eingetragene Mahlzeit bearbeiten oder entfernen.",
            tr: "Kaydedilen bir öğünü düzenle veya kaldır.",
          },
          {
            en: "Export the current day to Markdown or CSV (copied to clipboard).",
            de: "Den aktuellen Tag als Markdown oder CSV in die Zwischenablage exportieren.",
            tr: "Günü Markdown veya CSV olarak panoya kopyala.",
          },
          {
            en: "Settings — set your daily protein and calorie goals; switch language.",
            de: "Einstellungen — tägliche Protein- und Kalorienziele festlegen; Sprache wechseln.",
            tr: "Ayarlar — günlük protein ve kalori hedeflerini belirle; dili değiştir.",
          },
          {
            en: "Local-first storage — a single SQLite file in your OS app-data folder. No account, no cloud, no telemetry.",
            de: "Lokale Datenhaltung — eine SQLite-Datei im App-Daten-Ordner. Kein Konto, keine Cloud, keine Telemetrie.",
            tr: "Yerel depolama — uygulama klasöründe tek bir SQLite dosyası. Hesap yok, bulut yok, telemetri yok.",
          },
          {
            en: "Windows and macOS desktop builds via Tauri — the macOS build is a universal binary (Apple Silicon + Intel).",
            de: "Windows- und macOS-Desktop-Builds via Tauri — der macOS-Build ist ein Universal-Binary (Apple Silicon + Intel).",
            tr: "Tauri üzerinden Windows ve macOS masaüstü yapıları — macOS yapısı universal binary (Apple Silicon + Intel).",
          },
          {
            en: "Full UI in English, German and Turkish.",
            de: "Vollständige Benutzeroberfläche auf Englisch, Deutsch und Türkisch.",
            tr: "Tam arayüz İngilizce, Almanca ve Türkçe olarak.",
          },
        ],
      },
      {
        kind: "notes",
        items: [
          {
            en: "Built with Tauri 2 (Rust) + React + TypeScript, Tailwind CSS, Framer Motion. MIT-licensed.",
            de: "Entwickelt mit Tauri 2 (Rust) + React + TypeScript, Tailwind CSS, Framer Motion. MIT-lizenziert.",
            tr: "Tauri 2 (Rust) + React + TypeScript, Tailwind CSS, Framer Motion ile geliştirildi. MIT lisanslı.",
          },
          {
            en: "The macOS build isn't notarized yet — on first launch, right-click Prowtein → Open to get past Gatekeeper. A Linux build is planned for a future release.",
            de: "Der macOS-Build ist noch nicht notarisiert — beim ersten Start Rechtsklick auf Prowtein → Öffnen, um an Gatekeeper vorbeizukommen. Ein Linux-Build ist für eine zukünftige Version geplant.",
            tr: "macOS yapısı henüz noterlenmedi — ilk açılışta Gatekeeper'ı geçmek için Prowtein'a sağ tıkla → Aç. Linux yapısı gelecek bir sürüm için planlanmaktadır.",
          },
        ],
      },
    ],
  },
];
