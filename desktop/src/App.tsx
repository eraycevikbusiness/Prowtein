import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { TodayView } from "@/components/TodayView";
import { LibraryView } from "@/components/LibraryView";
import { QuickAdd } from "@/components/QuickAdd";

export default function App() {
  const { t } = useT();
  const ready = useApp((s) => s.ready);
  const loadError = useApp((s) => s.loadError);
  const view = useApp((s) => s.view);
  const init = useApp((s) => s.init);
  const setCommandOpen = useApp((s) => s.setCommandOpen);

  useEffect(() => {
    void init();
  }, [init]);

  // Global ⌘K / Ctrl+K → quick add
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCommandOpen]);

  if (!ready) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="flex items-center gap-2 text-ink-3 text-sm">
          <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
          {t.loading}
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-2 bg-background px-8 text-center">
        <div className="font-serif text-2xl text-foreground">{t.loadErrorTitle}</div>
        <div className="text-ink-3 text-[13.5px] max-w-md leading-relaxed">{loadError}</div>
      </div>
    );
  }

  return (
    <div className="h-full flex bg-[var(--surface-2)] text-foreground">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar />
        <main className="flex-1 min-h-0 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="min-h-full"
            >
              {view === "today" ? <TodayView /> : <LibraryView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <QuickAdd />
    </div>
  );
}
