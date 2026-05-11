import type { Metadata } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/LangContext";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prowtein — Track what fuels you. Daily.",
  description:
    "A minimal desktop nutrition tracker. Built for people who know their macros. Free, open source, for macOS, Windows, and Linux.",
  openGraph: {
    title: "Prowtein — Track what fuels you. Daily.",
    description: "A minimal desktop nutrition tracker. Built for people who know their macros.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#FAF7F2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${instrumentSerif.variable} font-sans bg-[#FAF7F2] text-[#1A1814] antialiased`}
      >
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
