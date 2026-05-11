/** A food in the library — macros are per single `serving`. */
export interface Food {
  id: number;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string; // human label, e.g. "100 g" or "1 scoop (30 g)"
  created_at: string;
  /** how many times it's been logged — used to rank ⌘K results */
  uses: number;
}

/** Editable shape when creating / updating a food. */
export interface FoodInput {
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

/** A logged meal: a food + a date + a servings multiplier. */
export interface Entry {
  id: number;
  food_id: number;
  date: string; // YYYY-MM-DD (local)
  servings: number;
  logged_at: string; // ISO-ish "YYYY-MM-DD HH:MM:SS"
  // joined from foods:
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

export type MealKind = "breakfast" | "lunch" | "snack" | "dinner";

export interface Goals {
  protein: number;
  calories: number;
}

export interface DayTotals {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export type View = "today" | "library";
