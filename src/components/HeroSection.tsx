import { Shield, Award, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";
import heroImage from "@/assets/hero-boat.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const aboutRef = useReveal();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero — immersive, giant typography, left-aligned */}
      <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Alquiler de barcos en Port Ginesta — embarcación navegando por la costa del Garraf, Castelldefels"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-primary/40" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, hsl(197 100% 8% / 0.85) 0%, hsl(197 100% 15% / 0.3) 50%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-20 lg:pb-28 pt-32">
          {/* Staggered reveal: tag → title → subtitle → CTA */}
          <p className="animate-fade-up font-body font-semibold text-gold tracking-[0.35em] uppercase text-xs lg:text-sm mb-6">
            Port Ginesta · Castelldefels
          </p>

          <h1 className="animate-fade-up-delay-1 font-display font-bold text-ocean-foreground leading-[0.95] tracking-tight text-[clamp(3rem,10vw,12rem)] max-w-[14ch]">
            Alquiler de Barcos en Port Ginesta
          </h1>

          <p className="animate-fade-up-delay-2 font-body text-ocean-foreground/70 mt-8 text-lg lg:text-xl max-w-xl leading-relaxed">
            Experiencias náuticas premium en Castelldefels. 3 años de experiencia técnica especializada en la costa del Garraf.
          </p>

          {/* Trust badge inline */}
          <div className="animate-fade-up-delay-2 flex items-center gap-3 mt-6 text-ocean-foreground/50 font-body text-sm">
            <Shield className="h-4 w-4 text-gold" />
            <span>
              <strong className="text-ocean-foreground/80">Garantía Riesgo Cero</strong> — devolución íntegra si el clima no acompaña
            </span>
          </div>

          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 mt-12">
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
              className="border-ocean-foreground/40 text-ocean-foreground bg-ocean-foreground/10 hover:bg-ocean-foreground/20 font-body text-lg px-10 py-6 backdrop-blur-sm"
            >
              Ver Embarcaciones
            </Button>
          </div>
        </div>
      </section>

      {/* About / Story — with video background */}
      <section id="about" className="relative py-28 lg:py-36 overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata"
        >
          <source src="/videos/historia.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-primary/70" />

        <div className="relative z-10 container mx-auto px-4" ref={aboutRef}>
          <div className="max-w-4xl mx-auto text-center">
            <p data-reveal className="font-body font-semibold text-gold tracking-[0.3em] uppercase text-xs mb-5">
              Nuestra Historia
            </p>
            <h2 data-reveal className="font-display text-3xl lg:text-5xl font-bold text-ocean-foreground mb-8">
              3 Años de Experiencia Técnica Especializada
            </h2>
            <p data-reveal className="font-body text-ocean-foreground/80 text-lg leading-relaxed max-w-3xl mx-auto mb-16">
              Nàutica Negobà nace de la unión de{" "}
              <strong className="text-ocean-foreground">tres socios con 3 años de sólida experiencia técnica especializada</strong>{" "}
              en el sector náutico. Dos de ellos ya operaban en esta misma náutica de Port Ginesta, lo que garantiza un{" "}
              <strong className="text-ocean-foreground">conocimiento profundo de las rutas y condiciones del Garraf</strong>{" "}
              pese a la juventud de la marca. Operamos desde Port Ginesta brindando la mejor experiencia náutica para los residentes y turistas de{" "}
              <strong className="text-ocean-foreground">Castelldefels</strong>.{" "}
              <strong className="text-ocean-foreground">Seguridad, profesionalidad y pasión</strong> por el mar definen cada una de nuestras salidas.
            </p>

            <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div data-reveal className="bg-ocean-foreground/10 backdrop-blur-sm rounded-xl p-8 border border-ocean-foreground/20">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gold/20 flex items-center justify-center">
                  <Award className="h-5 w-5 text-gold" />
                </div>
                <p className="font-display text-2xl font-bold text-ocean-foreground mb-1">3 años</p>
                <p className="font-body text-ocean-foreground/70 text-sm">de experiencia especializada</p>
              </div>
              <div data-reveal className="bg-ocean-foreground/10 backdrop-blur-sm rounded-xl p-8 border border-ocean-foreground/20">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gold/20 flex items-center justify-center">
                  <Anchor className="h-5 w-5 text-gold" />
                </div>
                <p className="font-display text-2xl font-bold text-ocean-foreground mb-1">3 barcos</p>
                <p className="font-body text-ocean-foreground/70 text-sm">revisados antes de cada salida</p>
              </div>
              <div data-reveal className="bg-ocean-foreground/10 backdrop-blur-sm rounded-xl p-8 border border-ocean-foreground/20">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gold/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-gold" />
                </div>
                <p className="font-display text-2xl font-bold text-ocean-foreground mb-1">Riesgo Cero</p>
                <p className="font-body text-ocean-foreground/70 text-sm">devolución si el clima falla</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
