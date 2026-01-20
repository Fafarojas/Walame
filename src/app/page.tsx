import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsSection } from "@/components/StatsSection";
import { OrchestrationSection } from "@/components/OrchestrationSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-dark text-white selection:bg-brand-blue selection:text-white">
      <Navbar />
      <Hero />
      <StatsSection />
      <OrchestrationSection />
      <IndustriesSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
