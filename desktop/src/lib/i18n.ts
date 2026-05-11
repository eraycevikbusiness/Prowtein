import { create } from "zustand";
import { addDays, formatDateLong, todayISO } from "./format";

export type Lang = "en" | "de" | "tr";

export const LOCALE: Record<Lang, string> = {
  en: "en-US",
  de: "de-DE",
  tr: "tr-TR",
};

/** Endonyms — used in the language picker (not translated). */
export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "tr", label: "Türkçe" },
];

export function detectLang(): Lang {
  try {
    const s = localStorage.getItem("prowtein-lang");
    if (s === "en" || s === "de" || s === "tr") return s;
  } catch {
    /* no localStorage */
  }
  const n = (typeof navigator !== "undefined" ? navigator.language : "en").toLowerCase();
  if (n.startsWith("de")) return "de";
  if (n.startsWith("tr")) return "tr";
  return "en";
}

export const TRANSLATIONS = {
  en: {
    loading: "Loading your kitchen…",
    loadErrorTitle: "Couldn't open your data",
    common: {
      of: "of",
      food: "food",
      foods: "foods",
      meal: "meal",
      meals: "meals",
      match: "match",
      matches: "matches",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      remove: "Remove",
    },
    nav: { today: "Today", library: "Library", settings: "Settings" },
    sidebar: { local: "Local", streak: "Streak", day: "day", days: "days" },
    dates: { today: "Today", yesterday: "Yesterday", tomorrow: "Tomorrow" },
    mealKinds: { breakfast: "Breakfast", lunch: "Lunch", snack: "Snack", dinner: "Dinner" },
    macros: { calories: "Calories", protein: "Protein", carbs: "Carbs", fat: "Fat" },
    units: { kcal: "kcal", g: "g" },
    topbar: {
      previousDay: "Previous day",
      nextDay: "Next day",
      searchFoods: "Search foods",
      addMeal: "Add meal",
      export: "Export",
    },
    today: {
      todaysMeals: "Today's meals",
      nothingLogged: "Nothing logged yet.",
      quickAddHintPre: "Press",
      quickAddHintPost: ", type three letters, hit return.",
      addAMeal: "Add a meal",
    },
    mealRow: {
      proteinSuffix: "g protein",
      servings: "Servings",
      less: "Less",
      more: "More",
      removeEntry: "Remove entry",
    },
    quickAdd: {
      title: "Quick add a food",
      desc: "Search your food library and log a meal to the selected day.",
      placeholder: "Search foods…  (then ↵ to log)",
      emptyLibrary: "Your library is empty — create your first food below.",
      createPre: "Create",
      createPost: "as a new food",
      logHint: "log",
      navigateHint: "navigate",
    },
    library: {
      searchPlaceholder: "Search your library…",
      newFood: "New food",
      empty: "Your library is empty.",
      noMatch: "Nothing matches",
      addAFood: "Add a food",
      usageLabel: "logged",
      log: "Log",
      deleteConfirm: "Delete this food? Its logged entries go too.",
      editFood: "Edit food",
      deleteFood: "Delete food",
    },
    foodForm: {
      newFood: "New food",
      editFood: "Edit food",
      desc: "Macros are per one serving. Once it's here, logging it is two keystrokes.",
      name: "Name",
      namePlaceholder: "Greek yogurt, plain",
      serving: "Serving",
      nameRequired: "Give it a name.",
      saveChanges: "Save changes",
      addFood: "Add food",
    },
    settings: {
      title: "Daily goals",
      desc: "Your targets. The ring and the week chart fill against your protein goal.",
      localNote: "Your data lives in a single SQLite file on this machine — no account, no cloud, no telemetry.",
      save: "Save goals",
      language: "Language",
    },
    exportDialog: {
      title: "Export",
      desc: "Copies this day's log to your clipboard — paste it wherever you like.",
      copyMarkdown: "Copy as Markdown",
      copyCSV: "Copy as CSV",
      forNotes: "for notes",
      forSpreadsheets: "for spreadsheets",
      copied: "Copied",
      roadmap: "PDF and save-to-file export are on the roadmap.",
      emptyNote: "Heads up — nothing's logged for this day yet.",
    },
  },

  de: {
    loading: "Lade deine Küche …",
    loadErrorTitle: "Konnte deine Daten nicht öffnen",
    common: {
      of: "von",
      food: "Lebensmittel",
      foods: "Lebensmittel",
      meal: "Mahlzeit",
      meals: "Mahlzeiten",
      match: "Treffer",
      matches: "Treffer",
      cancel: "Abbrechen",
      save: "Speichern",
      delete: "Löschen",
      remove: "Entfernen",
    },
    nav: { today: "Heute", library: "Bibliothek", settings: "Einstellungen" },
    sidebar: { local: "Lokal", streak: "Serie", day: "Tag", days: "Tage" },
    dates: { today: "Heute", yesterday: "Gestern", tomorrow: "Morgen" },
    mealKinds: { breakfast: "Frühstück", lunch: "Mittag", snack: "Snack", dinner: "Abendessen" },
    macros: { calories: "Kalorien", protein: "Eiweiß", carbs: "Kohlenhydrate", fat: "Fett" },
    units: { kcal: "kcal", g: "g" },
    topbar: {
      previousDay: "Vorheriger Tag",
      nextDay: "Nächster Tag",
      searchFoods: "Lebensmittel suchen",
      addMeal: "Hinzufügen",
      export: "Export",
    },
    today: {
      todaysMeals: "Heutige Mahlzeiten",
      nothingLogged: "Noch nichts eingetragen.",
      quickAddHintPre: "Drücke",
      quickAddHintPost: ", tippe drei Buchstaben, Enter.",
      addAMeal: "Mahlzeit hinzufügen",
    },
    mealRow: {
      proteinSuffix: "g Eiweiß",
      servings: "Portionen",
      less: "Weniger",
      more: "Mehr",
      removeEntry: "Eintrag entfernen",
    },
    quickAdd: {
      title: "Schnell hinzufügen",
      desc: "Durchsuche deine Lebensmittel-Bibliothek und trage eine Mahlzeit ein.",
      placeholder: "Lebensmittel suchen …  (dann ↵ zum Eintragen)",
      emptyLibrary: "Deine Bibliothek ist leer — lege unten dein erstes Lebensmittel an.",
      createPre: "",
      createPost: "als neues Lebensmittel anlegen",
      logHint: "eintragen",
      navigateHint: "navigieren",
    },
    library: {
      searchPlaceholder: "Bibliothek durchsuchen …",
      newFood: "Neues Lebensmittel",
      empty: "Deine Bibliothek ist leer.",
      noMatch: "Nichts gefunden für",
      addAFood: "Lebensmittel anlegen",
      usageLabel: "eingetragen",
      log: "Eintragen",
      deleteConfirm: "Dieses Lebensmittel löschen? Seine Einträge gehen mit.",
      editFood: "Lebensmittel bearbeiten",
      deleteFood: "Lebensmittel löschen",
    },
    foodForm: {
      newFood: "Neues Lebensmittel",
      editFood: "Lebensmittel bearbeiten",
      desc: "Makros pro Portion. Danach ist Eintragen zwei Tastendrücke.",
      name: "Name",
      namePlaceholder: "Griechischer Joghurt, natur",
      serving: "Portion",
      nameRequired: "Gib ihm einen Namen.",
      saveChanges: "Änderungen speichern",
      addFood: "Hinzufügen",
    },
    settings: {
      title: "Tagesziele",
      desc: "Deine Ziele. Ring und Wochenchart füllen sich gegen dein Eiweiß-Ziel.",
      localNote: "Deine Daten liegen in einer einzigen SQLite-Datei auf diesem Rechner — kein Konto, keine Cloud, keine Telemetrie.",
      save: "Ziele speichern",
      language: "Sprache",
    },
    exportDialog: {
      title: "Export von",
      desc: "Kopiert das Protokoll dieses Tages in die Zwischenablage — füg es ein, wo du willst.",
      copyMarkdown: "Als Markdown kopieren",
      copyCSV: "Als CSV kopieren",
      forNotes: "für Notizen",
      forSpreadsheets: "für Tabellen",
      copied: "Kopiert",
      roadmap: "Datei- und PDF-Export sind auf der Roadmap.",
      emptyNote: "Hinweis — für diesen Tag ist noch nichts eingetragen.",
    },
  },

  tr: {
    loading: "Mutfağın yükleniyor…",
    loadErrorTitle: "Verilerin açılamadı",
    common: {
      of: "/",
      food: "yiyecek",
      foods: "yiyecek",
      meal: "öğün",
      meals: "öğün",
      match: "eşleşme",
      matches: "eşleşme",
      cancel: "İptal",
      save: "Kaydet",
      delete: "Sil",
      remove: "Kaldır",
    },
    nav: { today: "Bugün", library: "Kütüphane", settings: "Ayarlar" },
    sidebar: { local: "Yerel", streak: "Seri", day: "gün", days: "gün" },
    dates: { today: "Bugün", yesterday: "Dün", tomorrow: "Yarın" },
    mealKinds: { breakfast: "Kahvaltı", lunch: "Öğle", snack: "Atıştırma", dinner: "Akşam" },
    macros: { calories: "Kalori", protein: "Protein", carbs: "Karbonhidrat", fat: "Yağ" },
    units: { kcal: "kcal", g: "g" },
    topbar: {
      previousDay: "Önceki gün",
      nextDay: "Sonraki gün",
      searchFoods: "Yiyecek ara",
      addMeal: "Ekle",
      export: "Dışa Aktar",
    },
    today: {
      todaysMeals: "Bugünün öğünleri",
      nothingLogged: "Henüz bir şey kaydedilmedi.",
      quickAddHintPre: "",
      quickAddHintPost: "'ya bas, üç harf yaz, Enter.",
      addAMeal: "Öğün ekle",
    },
    mealRow: {
      proteinSuffix: "g protein",
      servings: "Porsiyon",
      less: "Azalt",
      more: "Artır",
      removeEntry: "Kaydı kaldır",
    },
    quickAdd: {
      title: "Hızlı ekle",
      desc: "Yiyecek kütüphaneni ara ve seçili güne bir öğün kaydet.",
      placeholder: "Yiyecek ara…  (sonra ↵ ile kaydet)",
      emptyLibrary: "Kütüphanen boş — aşağıdan ilk yiyeceğini ekle.",
      createPre: "",
      createPost: "yeni bir yiyecek olarak ekle",
      logHint: "kaydet",
      navigateHint: "gez",
    },
    library: {
      searchPlaceholder: "Kütüphaneni ara…",
      newFood: "Yeni yiyecek",
      empty: "Kütüphanen boş.",
      noMatch: "Eşleşme yok:",
      addAFood: "Yiyecek ekle",
      usageLabel: "kez kaydedildi",
      log: "Kaydet",
      deleteConfirm: "Bu yiyecek silinsin mi? Kayıtları da gider.",
      editFood: "Yiyeceği düzenle",
      deleteFood: "Yiyeceği sil",
    },
    foodForm: {
      newFood: "Yeni yiyecek",
      editFood: "Yiyeceği düzenle",
      desc: "Makrolar bir porsiyon içindir. Sonrası iki tuş vuruşu.",
      name: "Ad",
      namePlaceholder: "Yunan yoğurdu, sade",
      serving: "Porsiyon",
      nameRequired: "Bir ad ver.",
      saveChanges: "Değişiklikleri kaydet",
      addFood: "Ekle",
    },
    settings: {
      title: "Günlük hedefler",
      desc: "Hedeflerin. Halka ve haftalık grafik protein hedefine göre dolar.",
      localNote: "Verilerin bu makinedeki tek bir SQLite dosyasında — hesap yok, bulut yok, telemetri yok.",
      save: "Hedefleri kaydet",
      language: "Dil",
    },
    exportDialog: {
      title: "Dışa aktar:",
      desc: "Bu günün kaydını panoya kopyalar — istediğin yere yapıştır.",
      copyMarkdown: "Markdown olarak kopyala",
      copyCSV: "CSV olarak kopyala",
      forNotes: "notlar için",
      forSpreadsheets: "tablolar için",
      copied: "Kopyalandı",
      roadmap: "PDF ve dosyaya kaydet özelliği yolda.",
      emptyNote: "Not — bu gün için henüz bir şey kaydedilmedi.",
    },
  },
} as const;

/** Union of the three dictionaries — same shape, different strings. */
export type Dict = (typeof TRANSLATIONS)[Lang];

// ── Language state (tiny standalone store; persisted to localStorage) ───────
interface LangState {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export const useLangStore = create<LangState>((set) => ({
  lang: detectLang(),
  setLang: (l) => {
    set({ lang: l });
    try {
      localStorage.setItem("prowtein-lang", l);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") document.documentElement.lang = l;
  },
}));

if (typeof document !== "undefined") document.documentElement.lang = useLangStore.getState().lang;

/** The current language, its dictionary, the matching Intl locale, and a setter. */
export function useT(): { lang: Lang; t: Dict; locale: string; setLang: (l: Lang) => void } {
  const lang = useLangStore((s) => s.lang);
  const setLang = useLangStore((s) => s.setLang);
  return { lang, t: TRANSLATIONS[lang], locale: LOCALE[lang], setLang };
}

/** "Today" / "Yesterday" / "Tomorrow" / a localized "Mon, May 11". */
export function relDay(iso: string, t: Dict, locale: string): string {
  const today = todayISO();
  if (iso === today) return t.dates.today;
  if (iso === addDays(today, -1)) return t.dates.yesterday;
  if (iso === addDays(today, 1)) return t.dates.tomorrow;
  return formatDateLong(iso, locale);
}
