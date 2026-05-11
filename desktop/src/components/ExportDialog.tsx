import { FileText } from "lucide-react";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { printDayAsPDF, printWeekAsPDF } from "@/lib/export";
import { formatDateFull, todayISO, weekDays } from "@/lib/format";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

export function ExportDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { t, locale } = useT();
  const date = useApp((s) => s.selectedDate);
  const entries = useApp((s) => s.entries);
  const goals = useApp((s) => s.goals);
  const userName = useApp((s) => s.userName);
  const recentEntries = useApp((s) => s.recentEntries);

  const doDayPDF = () => printDayAsPDF(date, entries, goals, userName, locale);

  const doWeekPDF = () => {
    const days = weekDays(todayISO());
    const weekEntries = recentEntries.filter((e) => days.includes(e.date));
    printWeekAsPDF(weekEntries, goals, userName, locale);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t.exportDialog.title} — {formatDateFull(date, locale)}
          </DialogTitle>
          <DialogDescription>{t.exportDialog.desc}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          {/* MD + CSV — disabled for now */}
          <Button variant="secondary" disabled className="justify-between opacity-40 cursor-not-allowed">
            <span className="inline-flex items-center gap-2">
              {t.exportDialog.copyMarkdown}
            </span>
            <span className="text-[11px] text-ink-3">{t.exportDialog.comingSoon}</span>
          </Button>
          <Button variant="secondary" disabled className="justify-between opacity-40 cursor-not-allowed">
            <span className="inline-flex items-center gap-2">
              {t.exportDialog.copyCSV}
            </span>
            <span className="text-[11px] text-ink-3">{t.exportDialog.comingSoon}</span>
          </Button>

          <div className="h-px bg-border my-1" />

          {/* PDF exports */}
          <Button variant="secondary" className="justify-between" onClick={doDayPDF}>
            <span className="inline-flex items-center gap-2">
              <FileText size={14} />
              {t.exportDialog.exportPDF}
            </span>
            <span className="text-[11px] text-ink-3">{t.exportDialog.forPrint}</span>
          </Button>
          <Button variant="secondary" className="justify-between" onClick={doWeekPDF}>
            <span className="inline-flex items-center gap-2">
              <FileText size={14} />
              {t.exportDialog.exportWeekPDF}
            </span>
            <span className="text-[11px] text-ink-3">{t.exportDialog.forPrint}</span>
          </Button>
        </div>
        {entries.length === 0 && (
          <p className="text-[12px] text-ink-3 leading-relaxed">{t.exportDialog.emptyNote}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
