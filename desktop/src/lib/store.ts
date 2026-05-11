import { create } from "zustand";
import * as db from "./db";
import { addDays, localTimestamp, todayISO } from "./format";
import type { BodyStats, Entry, Food, FoodInput, Goals, View } from "./types";

interface AppState {
  ready: boolean;
  loadError: string | null;
  view: View;
  selectedDate: string;
  foods: Food[];
  entries: Entry[]; // entries for `selectedDate`
  recentEntries: Entry[]; // last ~4 weeks, for the mini week chart
  goals: Goals;
  loggedDateSet: Set<string>;
  streak: number;
  commandOpen: boolean;
  userName: string;
  showWelcome: boolean;
  bodyStats: BodyStats | null;

  init: () => Promise<void>;
  setView: (v: View) => void;
  goToDate: (iso: string) => Promise<void>;
  shiftDay: (n: number) => Promise<void>;
  goToToday: () => Promise<void>;
  refreshDay: () => Promise<void>;
  refreshFoods: () => Promise<void>;
  refreshMeta: () => Promise<void>;

  logFood: (food: Food, servings?: number) => Promise<void>;
  changeServings: (entryId: number, servings: number) => Promise<void>;
  removeEntry: (entryId: number) => Promise<void>;

  addFood: (input: FoodInput) => Promise<Food | undefined>;
  editFood: (id: number, input: FoodInput) => Promise<void>;
  removeFood: (id: number) => Promise<void>;

  saveGoals: (g: Goals) => Promise<void>;
  setCommandOpen: (open: boolean) => void;
  setUserName: (name: string) => Promise<void>;
  dismissWelcome: () => void;
  setBodyStats: (stats: BodyStats) => Promise<void>;
}

/** Consecutive days (ending today, or yesterday if today is still empty) with ≥1 entry. */
function computeStreak(dates: Set<string>): number {
  const today = todayISO();
  let cursor: string | null = dates.has(today)
    ? today
    : dates.has(addDays(today, -1))
      ? addDays(today, -1)
      : null;
  if (!cursor) return 0;
  let n = 0;
  while (cursor && dates.has(cursor)) {
    n++;
    cursor = addDays(cursor, -1);
  }
  return n;
}

export const useApp = create<AppState>((set, get) => ({
  ready: false,
  loadError: null,
  view: "today",
  selectedDate: todayISO(),
  foods: [],
  entries: [],
  recentEntries: [],
  goals: { protein: 150, calories: 2200 },
  loggedDateSet: new Set(),
  streak: 0,
  commandOpen: false,
  userName: "",
  showWelcome: false,
  bodyStats: null,

  init: async () => {
    try {
      const [foods, goals, name, bodyStats] = await Promise.all([db.listFoods(), db.getGoals(), db.getName(), db.getBodyStats()]);
      set({ foods, goals, userName: name ?? "", showWelcome: name === null, bodyStats });
      await get().refreshDay();
      await get().refreshMeta();
      set({ ready: true, loadError: null });
    } catch (e) {
      set({ loadError: e instanceof Error ? e.message : String(e), ready: true });
    }
  },

  setView: (v) => set({ view: v }),

  goToDate: async (iso) => {
    set({ selectedDate: iso });
    await get().refreshDay();
  },
  shiftDay: async (n) => get().goToDate(addDays(get().selectedDate, n)),
  goToToday: async () => get().goToDate(todayISO()),

  refreshDay: async () => set({ entries: await db.listEntries(get().selectedDate) }),
  refreshFoods: async () => set({ foods: await db.listFoods() }),
  refreshMeta: async () => {
    const dates = await db.loggedDates();
    const dateSet = new Set(dates);
    const recentEntries = await db.listEntriesBetween(addDays(todayISO(), -27), addDays(todayISO(), 1));
    set({ recentEntries, loggedDateSet: dateSet, streak: computeStreak(dateSet) });
  },

  logFood: async (food, servings = 1) => {
    await db.addEntry(food.id, get().selectedDate, Math.max(0.05, servings), localTimestamp());
    await Promise.all([get().refreshDay(), get().refreshFoods(), get().refreshMeta()]);
  },
  changeServings: async (entryId, servings) => {
    await db.setEntryServings(entryId, Math.max(0.05, servings));
    await get().refreshDay();
  },
  removeEntry: async (entryId) => {
    await db.deleteEntry(entryId);
    await Promise.all([get().refreshDay(), get().refreshFoods(), get().refreshMeta()]);
  },

  addFood: async (input) => {
    const id = await db.createFood(input);
    await get().refreshFoods();
    return get().foods.find((f) => f.id === id);
  },
  editFood: async (id, input) => {
    await db.updateFood(id, input);
    await Promise.all([get().refreshFoods(), get().refreshDay()]);
  },
  removeFood: async (id) => {
    await db.deleteFood(id);
    await Promise.all([get().refreshFoods(), get().refreshDay(), get().refreshMeta()]);
  },

  saveGoals: async (g) => {
    await db.setGoals(g);
    set({ goals: await db.getGoals() });
  },

  setCommandOpen: (open) => set({ commandOpen: open }),

  setUserName: async (name) => {
    await db.setName(name);
    set({ userName: name.trim(), showWelcome: false });
  },
  dismissWelcome: () => {
    void db.setName("");
    set({ showWelcome: false });
  },
  setBodyStats: async (stats) => {
    await db.setBodyStats(stats);
    set({ bodyStats: stats });
  },
}));
