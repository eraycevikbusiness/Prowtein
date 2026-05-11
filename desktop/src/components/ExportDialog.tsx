import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useApp } from "@/lib/store";
import { copyToClipboard, dayToCSV, dayToMarkdown } from "@/lib/export";
import { formatDateFull } from "@/lib/format";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

export function ExportDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const date = useApp((s) => s.selectedDate);
  const entries = useApp((s) => s.entries);
  const goals = useApp((s) => s.goals);
  const [copied, setCopied] = useState<"md" | "csv" | null>(null);

  const doCopy = async (kind: "md" | "csv") => {
    const text = kind === "md" ? dayToMarkdown(date, entries, goals) : dayToCSV(date, entries);
    await copyToClipboard(text);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1600);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setCopied(null);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export {formatDateFull(date)}</DialogTitle>
          <DialogDescription>Copies this day's log to your clipboard — paste it wherever you like.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Button variant="secondary" className="justify-between" onClick={() => void doCopy("md")}>
            <span className="inline-flex items-center gap-2">
              {copied === "md" ? <Check size={14} className="text-coral-deep" /> : <Copy size={14} />}
              Copy as Markdown
            </span>
            <span className="text-[11px] text-ink-3">{copied === "md" ? "Copied" : "for notes"}</span>
          </Button>
          <Button variant="secondary" className="justify-between" onClick={() => void doCopy("csv")}>
            <span className="inline-flex items-center gap-2">
              {copied === "csv" ? <Check size={14} className="text-coral-deep" /> : <Copy size={14} />}
              Copy as CSV
            </span>
            <span className="text-[11px] text-ink-3">{copied === "csv" ? "Copied" : "for spreadsheets"}</span>
          </Button>
        </div>
        <p className="text-[12px] text-ink-3 leading-relaxed">
          PDF and save-to-file export are on the roadmap.
          {entries.length === 0 ? " Heads up — nothing's logged for this day yet." : ""}
        </p>
      </DialogContent>
    </Dialog>
  );
}
