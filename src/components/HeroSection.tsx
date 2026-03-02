import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-boat.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Barco navegando por la costa mediterránea"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, hsl(210 60% 12% / 0.3) 0%, hsl(210 60% 12% / 0.7) 100%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <p className="animate-fade-up text-gold font-body font-semibold tracking-[0.25em] uppercase text-sm mb-6">
          Port Ginesta · Sitges · Costa del Garraf
        </p>
        <h1 className="animate-fade-up-delay-1 font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-navy-foreground leading-tight max-w-4xl mx-auto">
          NáuticaNegobà
          <br />
          <span className="text-gold">Navega sin límites</span>
        </h1>
        <p className="animate-fade-up-delay-2 font-body text-lg sm:text-xl text-navy-foreground/80 mt-6 max-w-2xl mx-auto leading-relaxed">
          Alquila tu embarcación ideal y descubre las calas más exclusivas de la costa catalana. Sin complicaciones, solo mar y libertad.
        </p>
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button
            onClick={() => scrollTo("fleet")}
            size="lg"
            className="bg-gold hover:bg-gold/90 text-gold-foreground font-body font-semibold text-lg px-8 py-6 shadow-hero"
          >
            Ver Embarcaciones
          </Button>
          <Button
            onClick={() => scrollTo("booking")}
            size="lg"
            variant="outline"
            className="border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground/10 font-body text-lg px-8 py-6"
          >
            Reservar Ahora
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollTo("fleet")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-navy-foreground/60 animate-bounce"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
};

export default HeroSection;
