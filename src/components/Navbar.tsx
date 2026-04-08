import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSkipper } from "@/context/SkipperContext";
import logoImg from "@/assets/logo-negoba.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { withSkipper, setWithSkipper } = useSkipper();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const handleSkipperChoice = (skipper: boolean) => {
    setWithSkipper(skipper);
    setDropdownOpen(false);
    setIsOpen(false);
    scrollTo("fleet");
  };

  const desktopLinkClass =
    "text-sand/80 hover:text-gold font-body font-medium text-sm tracking-wide transition-colors";

  return (
    <>
      {/* ===== DESKTOP NAVBAR — hidden on mobile ===== */}
      <nav
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-primary shadow-lg border-b border-sand/5" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center h-16 lg:h-20">
            {/* Logo — extremo izquierdo */}
            <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 flex-shrink-0 mr-12">
              <img
                src={logoImg}
                alt="Nàutica Negobà - Alquiler de barcos en Castelldefels"
                className="h-14 lg:h-16 w-auto brightness-[10] invert-0 opacity-95"
                style={{ filter: "brightness(10)" }}
              />
            </button>

            {/* Nav links — centro */}
            <div className="flex items-center gap-8 flex-1 justify-center">
              <button onClick={() => scrollTo("hero")} className={desktopLinkClass}>
                Inicio
              </button>

              {/* Alquileres dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-1 ${desktopLinkClass}`}
                >
                  Alquileres
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-card rounded-xl shadow-xl border border-border overflow-hidden min-w-[220px] animate-in fade-in slide-in-from-top-2 duration-200">
                    <button
                      onClick={() => handleSkipperChoice(false)}
                      className={`w-full px-5 py-3.5 text-left font-body text-sm transition-colors flex flex-col gap-0.5 ${
                        !withSkipper
                          ? "bg-primary/5 text-primary font-semibold"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>Con Licencia</span>
                      <span className="text-[11px] text-muted-foreground font-normal">
                        Navega por tu cuenta con tu licencia
                      </span>
                    </button>
                    <div className="border-t border-border" />
                    <button
                      onClick={() => handleSkipperChoice(true)}
                      className={`w-full px-5 py-3.5 text-left font-body text-sm transition-colors flex flex-col gap-0.5 ${
                        withSkipper
                          ? "bg-gold/10 text-gold font-semibold"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>Con Patrón</span>
                      <span className="text-[11px] text-muted-foreground font-normal">
                        Capitán profesional incluido (+100€)
                      </span>
                    </button>
                  </div>
                )}
              </div>

              <button onClick={() => scrollTo("offers")} className={desktopLinkClass}>
                Ofertas{" "}
                <span className="text-gold text-[10px] font-bold ml-1">(Mayo)</span>
              </button>

              <button onClick={() => scrollTo("faq")} className={desktopLinkClass}>
                FAQ
              </button>
            </div>

            {/* CTA — extremo derecho */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {withSkipper && (
                <span className="text-[11px] font-body font-semibold text-gold bg-gold/10 px-3 py-1.5 rounded-full">
                  Con Patrón
                </span>
              )}
              <Button
                onClick={() => navigate("/reservar")}
                className="bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold px-6"
              >
                Reservar
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE NAVBAR — visible only on mobile, fondo azul corporativo ===== */}
      <nav
        className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-primary shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="flex items-center h-14 px-4">
          {/* Izquierda — hamburguesa blanca */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary-foreground p-1"
            aria-label="Menú"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Centro — logo + nombre en blanco */}
          <div className="flex-1 flex items-center justify-center gap-2 max-w-[60%] mx-auto">
            <img
              src={logoImg}
              alt="Nàutica Negobà"
              className="h-11 w-auto brightness-[10] flex-shrink-0"
              style={{ filter: "brightness(10)" }}
            />
            <span className="font-display text-primary-foreground font-semibold text-sm tracking-wide whitespace-nowrap">
              Nàutica Negobà
            </span>
          </div>

          {/* Derecha — espacio vacío para equilibrar */}
          <div className="w-8 flex-shrink-0" />
        </div>

        {/* Mobile Menu desplegable */}
        {isOpen && (
          <div className="bg-primary border-t border-primary-foreground/10 px-4 pb-4 pt-3 space-y-1">
            <button
              onClick={() => scrollTo("hero")}
              className="block w-full text-left text-primary-foreground/80 hover:text-gold font-body font-medium py-2.5 transition-colors"
            >
              Inicio
            </button>

            <p className="text-primary-foreground/40 text-[10px] font-body uppercase tracking-wider pt-2 pb-1 px-1">
              Alquileres
            </p>
            <button
              onClick={() => handleSkipperChoice(false)}
              className={`block w-full text-left font-body py-2.5 pl-3 transition-colors ${
                !withSkipper ? "text-gold font-semibold" : "text-primary-foreground/60"
              }`}
            >
              Con Licencia
            </button>
            <button
              onClick={() => handleSkipperChoice(true)}
              className={`block w-full text-left font-body py-2.5 pl-3 transition-colors ${
                withSkipper ? "text-gold font-semibold" : "text-primary-foreground/60"
              }`}
            >
              Con Patrón
            </button>

            <button
              onClick={() => scrollTo("offers")}
              className="block w-full text-left text-primary-foreground/80 hover:text-gold font-body font-medium py-2.5 transition-colors"
            >
              Ofertas <span className="text-gold text-[10px] font-bold">(Mayo)</span>
            </button>

            <button
              onClick={() => scrollTo("faq")}
              className="block w-full text-left text-primary-foreground/80 hover:text-gold font-body font-medium py-2.5 transition-colors"
            >
              FAQ
            </button>

            <Button
              onClick={() => { navigate("/reservar"); setIsOpen(false); }}
              className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold mt-3"
            >
              Reservar Ahora
            </Button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
