import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChangelogContent from "@/components/ChangelogContent";

export const metadata: Metadata = {
  title: "Changelog — Prowtein",
  description: "Every Prowtein release, in plain text — from the first alpha to v0.1.0 and what's next.",
};

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <ChangelogContent />
      <Footer />
    </>
  );
}
