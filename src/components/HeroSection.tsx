import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-boat.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Alquiler de barcos en Sitges y Port Ginesta — embarcación navegando por la costa del Garraf"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-primary/55" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, hsl(197 100% 15% / 0.2) 0%, hsl(197 100% 15% / 0.75) 100%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <p className="animate-fade-up text-gold font-body font-semibold tracking-[0.3em] uppercase text-sm mb-8">
          Port Ginesta · Sitges · Costa del Garraf
        </p>
        <h1 className="animate-fade-up-delay-1 font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-ocean-foreground leading-tight max-w-5xl mx-auto">
          Alquiler de Barcos en Sitges y Port Ginesta
          <br />
          <span className="text-gold">— Nàutica Negobà</span>
        </h1>
        <p className="animate-fade-up-delay-2 font-body text-lg sm:text-xl text-ocean-foreground/80 mt-8 max-w-2xl mx-auto leading-relaxed">
          Experiencias náuticas premium en la costa del Garraf. Alquila tu embarcación con licencia y descubre las calas más exclusivas.
        </p>
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button
            onClick={() => navigate("/reservar")}
            size="lg"
            className="bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold text-lg px-10 py-6 shadow-hero"
          >
            Reservar Ahora
          </Button>
          <Button
            onClick={() => scrollTo("fleet")}
            size="lg"
            variant="outline"
            className="border-ocean-foreground/30 text-ocean-foreground hover:bg-ocean-foreground/10 font-body text-lg px-10 py-6"
          >
            Ver Embarcaciones
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollTo("offers")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ocean-foreground/50 animate-bounce"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
};

export default HeroSection;
