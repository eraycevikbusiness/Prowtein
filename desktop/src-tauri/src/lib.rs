use tauri_plugin_sql::{Builder as SqlBuilder, Migration, MigrationKind};

/// Initial schema + a starter food library + default goals.
/// Migrations run exactly once (tracked by version), so the seed inserts are safe.
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

"#;

const REMOVE_SEEDS_SQL: &str = r#"
DELETE FROM foods
WHERE name IN (
  'Chicken breast, grilled','Chicken thigh, roasted','Salmon fillet, baked',
  'Egg, whole','Greek yogurt, plain','Skyr, plain','Cottage cheese, 2%',
  'Whey protein isolate','Tofu, firm','Rolled oats','White rice, cooked',
  'Banana','Almonds, raw','Peanut butter','Avocado','Olive oil'
)
AND id NOT IN (SELECT DISTINCT food_id FROM entries);
"#;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create initial schema and seed starter foods",
            sql: INIT_SQL,
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "remove unlogged seed foods",
            sql: REMOVE_SEEDS_SQL,
            kind: MigrationKind::Up,
        },
    ];

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
