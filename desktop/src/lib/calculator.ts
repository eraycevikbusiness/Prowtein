import type { BodyStats, Goals } from "./types";

const ACTIVITY_MULT: Record<BodyStats["activity"], number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

const PROTEIN_PER_KG: Record<BodyStats["goal"], number> = {
  lose: 2.2,
  maintain: 1.8,
  gain: 2.0,
};

export function calculateGoals(stats: BodyStats): Goals {
  const { weightKg, heightCm, age, gender, activity, goal } = stats;

  // Mifflin-St Jeor BMR
  const bmr =
    gender === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  const tdee = bmr * ACTIVITY_MULT[activity];

  const calories = Math.round(
    goal === "lose" ? tdee - 500 : goal === "gain" ? tdee + 300 : tdee,
  );

  return {
    calories: Math.max(1200, calories),
    protein: Math.round(weightKg * PROTEIN_PER_KG[goal]),
  };
}
