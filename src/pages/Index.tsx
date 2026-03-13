import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OffersSection from "@/components/OffersSection";
import FleetSection from "@/components/FleetSection";
import WhyUsSection from "@/components/WhyUsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SkipperProvider } from "@/context/SkipperContext";

const Index = () => {
  return (
    <SkipperProvider>
      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <FleetSection />
        <OffersSection />
        <WhyUsSection />
        <FAQSection />
        <ContactSection />
        <Footer />
        <WhatsAppButton />
      </main>
    </SkipperProvider>
  );
};

export default Index;
