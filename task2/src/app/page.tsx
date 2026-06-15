import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Statistics from "@/components/Statistics";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30">
      <Navbar />
      <Hero />
      <Features />
      <Statistics />
      <CTASection />
      <Footer />
    </main>
  );
}
