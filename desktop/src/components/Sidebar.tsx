import { useMemo, useState } from "react";
import { Bookmark, Flame, Settings, Sun } from "lucide-react";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { dayLetter, entryTotals, todayISO, weekDays } from "@/lib/format";
import type { View } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SettingsDialog } from "./SettingsDialog";

function Avatar() {
  const userName = useApp((s) => s.userName);
  if (userName) {
    return (
      <div className="w-7 h-7 rounded-full bg-coral flex items-center justify-center text-white text-[13px] font-semibold shrink-0 select-none">
        {userName[0]!.toUpperCase()}
      </div>
    );
  }
  return (
    <div className="w-7 h-7 rounded-full bg-[var(--bg-2)] flex items-center justify-center text-ink-3 shrink-0">
      <Settings size={13} />
    </div>
  );
}

function UserName({ fallback }: { fallback: string }) {
  const userName = useApp((s) => s.userName);
  return <>{userName || fallback}</>;
}

function UserSubtitle({ settingsLabel }: { settingsLabel: string }) {
  const userName = useApp((s) => s.userName);
  if (!userName) return null;
  return <div className="text-[10.5px] text-ink-3">{settingsLabel}</div>;
}

export function Sidebar() {
  const { t, locale } = useT();
  const view = useApp((s) => s.view);
  const setView = useApp((s) => s.setView);
  const streak = useApp((s) => s.streak);
  const goals = useApp((s) => s.goals);
  const recentEntries = useApp((s) => s.recentEntries);
  const goToToday = useApp((s) => s.goToToday);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const nav: { key: View; label: string; Icon: typeof Sun }[] = [
    { key: "today", label: t.nav.today, Icon: Sun },
    { key: "library", label: t.nav.library, Icon: Bookmark },
  ];

  const week = useMemo(() => {
    const days = weekDays(todayISO());
    const byDay = new Map<string, number>();
    for (const e of recentEntries) {
      byDay.set(e.date, (byDay.get(e.date) ?? 0) + entryTotals(e).protein);
    }
    const today = todayISO();
    return days.map((d) => ({
      date: d,
      letter: dayLetter(d, locale),
      frac: goals.protein > 0 ? Math.min(1, (byDay.get(d) ?? 0) / goals.protein) : 0,
      today: d === today,
      future: d > today,
    }));
  }, [recentEntries, goals.protein, locale]);

  return (
    <aside className="w-[212px] shrink-0 border-r border-border bg-card flex flex-col">
      <button
        onClick={() => {
          setView("today");
          void goToToday();
        }}
        className="px-5 py-4 flex items-center gap-2.5 text-left hover:opacity-90"
      >
        <div className="w-7 h-7 rounded-lg bg-coral flex items-center justify-center text-white">
          <span className="font-serif text-[16px] leading-none">P</span>
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold tracking-tight">Prowtein</div>
          <div className="text-[11px] text-ink-3">{t.sidebar.local}</div>
        </div>
      </button>

      <nav className="px-3 py-2 flex flex-col gap-0.5 text-[13.5px]">
        {nav.map(({ key, label, Icon }) => {
          const active = view === key;
          return (
            <button
              key={key}
              onClick={() => setView(key)}
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors",
                active ? "bg-[var(--bg-2)] text-foreground" : "text-ink-2 hover:bg-[var(--surface-2)]",
              )}
            >
              <Icon size={15} className={active ? "text-coral" : ""} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Week protein chart + streak */}
      <div className="mt-3 mx-3 p-3.5 rounded-xl bg-[var(--bg-2)]">
        <div className="flex items-center justify-between mb-2.5">
          <span className="inline-flex items-center gap-1.5 text-[11.5px] text-ink-3">
            <Flame size={12} className={streak > 0 ? "text-coral" : ""} />
            {t.sidebar.streak}
          </span>
          <span className="font-serif text-[18px] leading-none text-foreground">
            {streak}{" "}
            <span className="text-[11px] text-ink-3 font-sans">{streak === 1 ? t.sidebar.day : t.sidebar.days}</span>
          </span>
        </div>
        <div className="flex items-end justify-between gap-1">
          {week.map((w) => (
            <button
              key={w.date}
              onClick={() => {
                setView("today");
                void useApp.getState().goToDate(w.date);
              }}
              className="flex flex-col items-center gap-1.5 flex-1 group"
              title={w.date}
            >
              <div
                className="w-full rounded-full overflow-hidden bg-white group-hover:ring-2 group-hover:ring-coral-soft"
                style={{ height: 36 }}
              >
                <div
                  className="w-full rounded-full"
                  style={{
                    marginTop: `${(1 - w.frac) * 36}px`,
                    height: `${Math.max(w.frac * 36, w.frac > 0 ? 4 : 0)}px`,
                    background: w.today ? "var(--coral)" : "var(--apricot)",
                    opacity: w.today ? 1 : w.future ? 0.25 : 0.6,
                  }}
                />
              </div>
              <span className={cn("text-[10px]", w.today ? "text-coral-deep font-semibold" : "text-ink-3")}>{w.letter}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto p-3">
        <button
          onClick={() => setSettingsOpen(true)}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[var(--surface-2)] transition-colors group"
        >
          <Avatar />
          <div className="flex-1 min-w-0 text-left leading-tight">
            <div className="text-[13px] font-medium text-foreground truncate">
              <UserName fallback={t.nav.settings} />
            </div>
            <UserSubtitle settingsLabel={t.nav.settings} />
          </div>
          <Settings size={13} className="text-ink-3 shrink-0 group-hover:text-ink-2 transition-colors" />
        </button>
      </div>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </aside>
  );
}
