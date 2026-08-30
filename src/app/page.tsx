import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { InquirySection } from "@/components/sections/InquirySection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PortfolioSection />
        <ServicesSection />
        <ProcessSection />
        <InquirySection />
      </main>
      <Footer />
    </>
  );
}
