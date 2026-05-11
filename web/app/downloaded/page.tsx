import type { Metadata } from "next";
import DownloadedContent from "@/components/DownloadedContent";

export const metadata: Metadata = {
  title: "Thanks for downloading — Prowtein",
  description: "Your Prowtein download has started. Here's how to get up and running.",
};

export default function DownloadedPage() {
  return <DownloadedContent />;
}
