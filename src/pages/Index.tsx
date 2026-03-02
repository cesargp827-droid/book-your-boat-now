import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FleetSection from "@/components/FleetSection";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FleetSection />
      <BookingSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
