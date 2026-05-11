import Database from "@tauri-apps/plugin-sql";
import type { Entry, Food, FoodInput, Goals } from "./types";

let _db: Database | null = null;

/** Lazily open (and run migrations for) the local SQLite database. */
export async function db(): Promise<Database> {
  if (!_db) _db = await Database.load("sqlite:prowtein.db");
  return _db;
}

// ── Foods ──────────────────────────────────────────────────────────────────

export async function listFoods(): Promise<Food[]> {
  const d = await db();
  return d.select<Food[]>(
    `SELECT f.id, f.name, f.kcal, f.protein, f.carbs, f.fat, f.serving, f.created_at,
            (SELECT COUNT(*) FROM entries e WHERE e.food_id = f.id) AS uses
       FROM foods f
      ORDER BY uses DESC, f.name COLLATE NOCASE ASC`,
  );
}

export async function createFood(input: FoodInput): Promise<number> {
  const d = await db();
  const r = await d.execute(
    `INSERT INTO foods (name, kcal, protein, carbs, fat, serving) VALUES (?,?,?,?,?,?)`,
    [input.name, input.kcal, input.protein, input.carbs, input.fat, input.serving],
  );
  return r.lastInsertId ?? 0;
}

export async function updateFood(id: number, input: FoodInput): Promise<void> {
  const d = await db();
  await d.execute(`UPDATE foods SET name=?, kcal=?, protein=?, carbs=?, fat=?, serving=? WHERE id=?`, [
    input.name,
    input.kcal,
    input.protein,
    input.carbs,
    input.fat,
    input.serving,
    id,
  ]);
}

export async function deleteFood(id: number): Promise<void> {
  const d = await db();
  await d.execute(`DELETE FROM entries WHERE food_id=?`, [id]);
  await d.execute(`DELETE FROM foods WHERE id=?`, [id]);
}

// ── Entries ────────────────────────────────────────────────────────────────

const ENTRY_COLS = `e.id, e.food_id, e.date, e.servings, e.logged_at,
                    f.name, f.kcal, f.protein, f.carbs, f.fat, f.serving`;

export async function listEntries(date: string): Promise<Entry[]> {
  const d = await db();
  return d.select<Entry[]>(
    `SELECT ${ENTRY_COLS} FROM entries e JOIN foods f ON f.id = e.food_id
      WHERE e.date = ? ORDER BY e.logged_at ASC, e.id ASC`,
    [date],
  );
}

export async function listEntriesBetween(fromDate: string, toDate: string): Promise<Entry[]> {
  const d = await db();
  return d.select<Entry[]>(
    `SELECT ${ENTRY_COLS} FROM entries e JOIN foods f ON f.id = e.food_id
      WHERE e.date >= ? AND e.date <= ? ORDER BY e.date ASC, e.logged_at ASC`,
    [fromDate, toDate],
  );
}

export async function addEntry(foodId: number, date: string, servings: number, loggedAt: string): Promise<number> {
  const d = await db();
  const r = await d.execute(`INSERT INTO entries (food_id, date, servings, logged_at) VALUES (?,?,?,?)`, [
    foodId,
    date,
    servings,
    loggedAt,
  ]);
  return r.lastInsertId ?? 0;
}

export async function setEntryServings(id: number, servings: number): Promise<void> {
  const d = await db();
  await d.execute(`UPDATE entries SET servings=? WHERE id=?`, [servings, id]);
}

export async function deleteEntry(id: number): Promise<void> {
  const d = await db();
  await d.execute(`DELETE FROM entries WHERE id=?`, [id]);
}

export async function loggedDates(): Promise<string[]> {
  const d = await db();
  const rows = await d.select<{ date: string }[]>(`SELECT DISTINCT date FROM entries ORDER BY date DESC`);
  return rows.map((r) => r.date);
}

// ── Settings (goals) ───────────────────────────────────────────────────────

export async function getGoals(): Promise<Goals> {
  const d = await db();
  const rows = await d.select<{ key: string; value: string }[]>(`SELECT key, value FROM settings`);
  const map = new Map(rows.map((r) => [r.key, r.value]));
  return {
    protein: Number(map.get("protein_goal") ?? 150) || 150,
    calories: Number(map.get("calorie_goal") ?? 2200) || 2200,
  };
}

export async function setGoals(g: Goals): Promise<void> {
  const d = await db();
  await d.execute(
    `INSERT INTO settings(key,value) VALUES('protein_goal',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`,
    [String(Math.round(g.protein))],
  );
  await d.execute(
    `INSERT INTO settings(key,value) VALUES('calorie_goal',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`,
    [String(Math.round(g.calories))],
  );
}
