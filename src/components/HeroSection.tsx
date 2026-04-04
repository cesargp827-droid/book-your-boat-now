import { ChevronDown, Shield, Award, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-boat.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Alquiler de barcos en Castelldefels y Port Ginesta — embarcación navegando por la costa del Garraf"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-primary/55" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, hsl(197 100% 15% / 0.2) 0%, hsl(197 100% 15% / 0.75) 100%)" }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <p className="animate-fade-up text-gold font-body font-semibold tracking-[0.3em] uppercase text-sm mb-8">
            Port Ginesta · Castelldefels · Costa del Garraf
          </p>
          <h1 className="animate-fade-up-delay-1 font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-ocean-foreground leading-tight max-w-5xl mx-auto">
            Explora el Mediterráneo con la Confianza de los Expertos
          </h1>
          <p className="animate-fade-up-delay-2 font-body text-lg sm:text-xl text-ocean-foreground/80 mt-8 max-w-2xl mx-auto leading-relaxed">
            Alquiler de barcos en Castelldefels y Port Ginesta. Experiencias náuticas premium en la costa del Garraf con 3 años de experiencia técnica especializada.
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

        <button
          onClick={() => scrollTo("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ocean-foreground/50 animate-bounce"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </section>

      {/* About / Story */}
      <section id="about" className="py-28 lg:py-36 bg-sand">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-body font-semibold text-primary tracking-[0.3em] uppercase text-xs mb-5">
              Nuestra Historia
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-8">
              3 Años de Experiencia Técnica Especializada
            </h2>
            <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto mb-16">
              Nàutica Negobà nace de la unión de <strong className="text-foreground">tres socios con más de una década de experiencia técnica</strong> en el sector náutico. Dos de ellos ya operaban en esta misma náutica de Port Ginesta, lo que garantiza un conocimiento profundo de la flota, las rutas y las condiciones del Garraf. Operamos desde Port Ginesta brindando la mejor experiencia náutica para los residentes y turistas de <strong className="text-foreground">Castelldefels</strong>. <strong className="text-foreground">Seguridad, profesionalidad y pasión</strong> por el mar definen cada una de nuestras salidas.
            </p>

            <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="bg-card rounded-xl p-8 shadow-card">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <p className="font-display text-2xl font-bold text-foreground mb-1">+10 años</p>
                <p className="font-body text-muted-foreground text-sm">de experiencia técnica</p>
              </div>
              <div className="bg-card rounded-xl p-8 shadow-card">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Anchor className="h-5 w-5 text-primary" />
                </div>
                <p className="font-display text-2xl font-bold text-foreground mb-1">3 barcos</p>
                <p className="font-body text-muted-foreground text-sm">revisados antes de cada salida</p>
              </div>
              <div className="bg-card rounded-xl p-8 shadow-card">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <p className="font-display text-2xl font-bold text-foreground mb-1">Riesgo Cero</p>
                <p className="font-body text-muted-foreground text-sm">devolución si el clima falla</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;