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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary backdrop-blur-md border-b border-primary-foreground/10 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5">
            <img
              src={logoImg}
              alt="Nàutica Negobà - Alquiler de barcos en Sitges"
              className="h-10 lg:h-12 w-auto"
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {/* Ofertas */}
            <button
              onClick={() => scrollTo("offers")}
              className="text-primary-foreground/80 hover:text-gold font-body font-medium text-sm tracking-wide transition-colors"
            >
              Ofertas{" "}
              <span className="text-gold text-[10px] font-bold ml-1">(Tiempo Limitado)</span>
            </button>

            {/* Alquileres dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-primary-foreground/80 hover:text-gold font-body font-medium text-sm tracking-wide transition-colors"
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
                    <span>Sin Patrón</span>
                    <span className="text-[11px] text-muted-foreground font-normal">
                      Requiere licencia de navegación
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
                      Capitán profesional incluido
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* FAQ */}
            <button
              onClick={() => scrollTo("faq")}
              className="text-primary-foreground/80 hover:text-gold font-body font-medium text-sm tracking-wide transition-colors"
            >
              FAQ
            </button>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
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

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary-foreground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-primary-foreground/10 mt-2 pt-4 space-y-1">
            <button
              onClick={() => scrollTo("offers")}
              className="block w-full text-left text-primary-foreground/80 hover:text-gold font-body py-2.5 transition-colors"
            >
              Ofertas <span className="text-gold text-[10px] font-bold">(Tiempo Limitado)</span>
            </button>

            <p className="text-primary-foreground/50 text-[10px] font-body uppercase tracking-wider pt-2 pb-1 px-1">
              Alquileres
            </p>
            <button
              onClick={() => handleSkipperChoice(false)}
              className={`block w-full text-left font-body py-2.5 pl-3 transition-colors ${
                !withSkipper ? "text-gold font-semibold" : "text-primary-foreground/70"
              }`}
            >
              Sin Patrón
            </button>
            <button
              onClick={() => handleSkipperChoice(true)}
              className={`block w-full text-left font-body py-2.5 pl-3 transition-colors ${
                withSkipper ? "text-gold font-semibold" : "text-primary-foreground/70"
              }`}
            >
              Con Patrón
            </button>

            <button
              onClick={() => scrollTo("faq")}
              className="block w-full text-left text-primary-foreground/80 hover:text-gold font-body py-2.5 transition-colors"
            >
              FAQ
            </button>

            <Button
              onClick={() => { navigate("/reservar"); setIsOpen(false); }}
              className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold mt-3"
            >
              Reservar
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
