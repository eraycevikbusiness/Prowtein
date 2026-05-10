import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Features from "@/components/Features";
import Demo from "@/components/Demo";
import Download from "@/components/Download";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Showcase />
      <Features />
      <Demo />
      <Download />
      <FAQ />
      <Footer />
    </>
  );
}
