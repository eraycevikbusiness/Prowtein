import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Download, Plus, Search } from "lucide-react";
import { useApp } from "@/lib/store";
import { relDay, useT } from "@/lib/i18n";
import { formatDateFull, todayISO } from "@/lib/format";
import { Button } from "./ui/button";
import { ExportDialog } from "./ExportDialog";

export function TopBar() {
  const { t, locale } = useT();
  const view = useApp((s) => s.view);
  const selectedDate = useApp((s) => s.selectedDate);
  const shiftDay = useApp((s) => s.shiftDay);
  const goToToday = useApp((s) => s.goToToday);
  const setCommandOpen = useApp((s) => s.setCommandOpen);
  const foodsCount = useApp((s) => s.foods.length);
  const [exportOpen, setExportOpen] = useState(false);
  const isToday = selectedDate === todayISO();

  return (
    <header className="h-14 px-6 flex items-center gap-3 border-b border-border bg-card shrink-0">
      {view === "today" ? (
        <div className="flex items-center gap-2 text-ink-2 min-w-0">
          <Button variant="ghost" size="icon-sm" onClick={() => void shiftDay(-1)} aria-label={t.topbar.previousDay}>
            <ChevronLeft size={16} />
          </Button>
          <div className="leading-tight">
            <div className="text-[15px] font-semibold tracking-tight text-foreground">{relDay(selectedDate, t, locale)}</div>
            <div className="text-[11.5px] text-ink-3">{formatDateFull(selectedDate, locale)}</div>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={() => void shiftDay(1)} aria-label={t.topbar.nextDay}>
            <ChevronRight size={16} />
          </Button>
          {!isToday && (
            <Button variant="subtle" size="sm" className="ml-1.5" onClick={() => void goToToday()}>
              <CalendarDays size={13} /> {t.nav.today}
            </Button>
          )}
        </div>
      ) : (
        <div className="leading-tight">
          <div className="text-[15px] font-semibold tracking-tight text-foreground">{t.nav.library}</div>
          <div className="text-[11.5px] text-ink-3">
            {foodsCount} {foodsCount === 1 ? t.common.food : t.common.foods}
          </div>
        </div>
      )}

      <div className="ml-auto flex items-center gap-2">
        {view === "today" && (
          <>
            <button
              onClick={() => setCommandOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 h-8 rounded-lg bg-[var(--bg-2)] text-ink-3 hover:bg-[var(--border-warm)] hover:text-ink-2 transition-colors"
            >
              <Search size={13} />
              <span className="text-[12.5px]">{t.topbar.searchFoods}</span>
              <span className="chip ml-2">⌘K</span>
            </button>
            <Button size="sm" onClick={() => setCommandOpen(true)}>
              <Plus size={14} /> {t.topbar.addMeal}
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setExportOpen(true)}>
              <Download size={14} /> {t.topbar.export}
            </Button>
          </>
        )}
      </div>

      <ExportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </header>
  );
}
