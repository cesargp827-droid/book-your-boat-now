import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FleetSection from "@/components/FleetSection";
import OffersSection from "@/components/OffersSection";
import WhyUsSection from "@/components/WhyUsSection";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <OffersSection />
      <FleetSection />
      <WhyUsSection />
      <BookingSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
