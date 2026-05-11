import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Prowtein",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="relative pt-28 sm:pt-36 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-[13.5px] text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors mb-8"
          >
            ← Back
          </a>
          <h1 className="font-serif text-[40px] leading-[1.08] tracking-tight text-[var(--ink)] mb-2">
            Privacy Policy
          </h1>
          <p className="text-[13.5px] text-[var(--ink-3)] mb-10">Stand: Mai 2026 · Gemäß nDSG (Schweiz)</p>

          <div className="space-y-8 text-[15.5px] text-[var(--ink-2)] leading-relaxed">
            <section>
              <h2 className="text-[13px] uppercase tracking-[0.12em] font-semibold text-[var(--ink-3)] mb-3">
                Die App
              </h2>
              <p>
                Die Prowtein-Desktop-App speichert alle Daten ausschliesslich lokal auf Ihrem Gerät — in einer SQLite-Datei im App-Daten-Ordner Ihres Betriebssystems. Es werden keine Daten übertragen. Die App stellt keine Netzwerkverbindungen her und enthält keine Analyse-, Absturzmelde- oder Telemetriefunktionen.
              </p>
            </section>

            <section>
              <h2 className="text-[13px] uppercase tracking-[0.12em] font-semibold text-[var(--ink-3)] mb-3">
                Diese Website
              </h2>
              <p>
                Diese Website verwendet keine Cookies und erhebt keine personenbezogenen Daten. Die Spracheinstellung wird im <code className="text-[13.5px] bg-[var(--bg-2)] px-1.5 py-0.5 rounded">localStorage</code> Ihres Browsers gespeichert und verlässt Ihr Gerät nicht.
              </p>
              <p className="mt-3">
                Die Website wird über Vercel gehostet. Vercel kann im Rahmen des Betriebs der Infrastruktur Standard-Zugriffsprotokolle erfassen (IP-Adresse, Zeitstempel, aufgerufene URL). Diese unterliegen der{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  Datenschutzerklärung von Vercel
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-[13px] uppercase tracking-[0.12em] font-semibold text-[var(--ink-3)] mb-3">
                Kontakt
              </h2>
              <p>
                Bei Fragen zum Datenschutz:{" "}
                <a href="mailto:eray.cevik.business@gmail.com" className="text-[var(--accent)] hover:underline">
                  eray.cevik.business@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
