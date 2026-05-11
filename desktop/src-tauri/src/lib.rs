use tauri_plugin_sql::{Builder as SqlBuilder, Migration, MigrationKind};

/// Initial schema + a starter food library + default goals.
/// Migrations run exactly once (tracked by version), so the seed inserts are safe.
///
/// IMPORTANT: never edit the SQL of a migration that has shipped — sqlx stores a
/// checksum per applied migration and a mismatch aborts startup ("migration N was
/// previously applied but has been modified"). To change something, add a new
/// migration with the next version number instead.
const INIT_SQL: &str = r#"
CREATE TABLE IF NOT EXISTS foods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  kcal REAL NOT NULL,
  protein REAL NOT NULL,
  carbs REAL NOT NULL,
  fat REAL NOT NULL,
  serving TEXT NOT NULL DEFAULT '100 g',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  food_id INTEGER NOT NULL REFERENCES foods(id),
  date TEXT NOT NULL,
  servings REAL NOT NULL DEFAULT 1,
  logged_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_entries_date ON entries(date);
CREATE INDEX IF NOT EXISTS idx_entries_food ON entries(food_id);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

INSERT INTO settings (key, value) VALUES
  ('protein_goal', '150'),
  ('calorie_goal', '2200');

INSERT INTO foods (name, kcal, protein, carbs, fat, serving) VALUES
  ('Chicken breast, grilled', 165, 31, 0, 3.6, '100 g'),
  ('Chicken thigh, roasted', 209, 26, 0, 10.9, '100 g'),
  ('Salmon fillet, baked', 208, 22, 0, 13, '100 g'),
  ('Egg, whole', 78, 6.3, 0.6, 5.3, '1 large (50 g)'),
  ('Greek yogurt, plain', 97, 10, 4, 5, '100 g'),
  ('Skyr, plain', 63, 11, 4, 0.2, '100 g'),
  ('Cottage cheese, 2%', 84, 12, 4, 2.3, '100 g'),
  ('Whey protein isolate', 113, 25, 2, 0.6, '1 scoop (30 g)'),
  ('Tofu, firm', 144, 17, 3, 9, '100 g'),
  ('Rolled oats', 380, 13, 67, 6.5, '100 g'),
  ('White rice, cooked', 130, 2.7, 28, 0.3, '100 g'),
  ('Banana', 105, 1.3, 27, 0.4, '1 medium (118 g)'),
  ('Almonds, raw', 579, 21, 22, 50, '100 g'),
  ('Peanut butter', 188, 8, 6, 16, '2 tbsp (32 g)'),
  ('Avocado', 240, 3, 13, 22, '1 medium (150 g)'),
  ('Olive oil', 119, 0, 0, 13.5, '1 tbsp (15 ml)');
"#;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![Migration {
        version: 1,
        description: "create initial schema and seed starter foods",
        sql: INIT_SQL,
        kind: MigrationKind::Up,
    }];

    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(
            SqlBuilder::default()
                .add_migrations("sqlite:prowtein.db", migrations)
                .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running Prowtein");
}
