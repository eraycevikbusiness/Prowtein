import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Impressum — Prowtein",
};

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main className="relative pt-28 sm:pt-36 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-[13.5px] text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors mb-8"
          >
            ← Zurück
          </a>
          <h1 className="font-serif text-[40px] leading-[1.08] tracking-tight text-[var(--ink)] mb-10">
            Impressum
          </h1>
          <div className="space-y-6 text-[15.5px] text-[var(--ink-2)] leading-relaxed">
            <p>
              Prowtein ist ein privates, nicht-kommerzielles Open-Source-Projekt, veröffentlicht unter der MIT-Lizenz.
            </p>
            <p>
              <strong className="text-[var(--ink)] font-semibold">Verantwortlich:</strong> Eray Cevik, Schweiz
            </p>
            <p>
              <strong className="text-[var(--ink)] font-semibold">Kontakt:</strong>{" "}
              <a href="mailto:eray.cevik.business@gmail.com" className="text-[var(--accent)] hover:underline">
                eray.cevik.business@gmail.com
              </a>
            </p>
            <p className="text-[14px] text-[var(--ink-3)]">
              Für Anfragen zu Urheberrecht, Datenschutz oder rechtlichen Anliegen wenden Sie sich bitte per E-Mail.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
