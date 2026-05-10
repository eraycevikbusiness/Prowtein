import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LangProvider } from "@/lib/LangContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-black text-white antialiased`}>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
