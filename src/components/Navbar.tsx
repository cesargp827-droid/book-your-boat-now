import { useState } from "react";
import { Anchor, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-ocean-foreground/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5">
            <Anchor className="h-7 w-7 text-gold" />
            <span className="font-display text-xl font-bold text-ocean-foreground tracking-wide">
              Nàutica Negobà
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: "Alquiler Con Licencia", id: "fleet" },
              { label: "Salidas Con Patrón", id: "contact" },
              { label: "Ofertas", id: "offers" },
              { label: "FAQ", id: "faq" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-ocean-foreground/70 hover:text-gold font-body font-medium text-sm tracking-wide transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
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
            className="md:hidden text-ocean-foreground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-ocean-foreground/10 mt-2 pt-4 space-y-3">
            {["Alquiler Con Licencia|fleet", "Salidas Con Patrón|contact", "Ofertas|offers", "FAQ|faq"].map((item) => {
              const [label, id] = item.split("|");
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="block w-full text-left text-ocean-foreground/70 hover:text-gold font-body py-2 transition-colors"
                >
                  {label}
                </button>
              );
            })}
            <Button
              onClick={() => { navigate("/reservar"); setIsOpen(false); }}
              className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold mt-2"
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
