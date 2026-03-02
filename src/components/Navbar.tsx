import { useState } from "react";
import { Anchor, Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-ocean/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
            <Anchor className="h-7 w-7 text-gold" />
            <span className="font-display text-xl font-bold text-navy-foreground tracking-wide">
              Náutica Negobà
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Inicio", id: "hero" },
              { label: "Flota", id: "fleet" },
              { label: "Reservar", id: "booking" },
              { label: "Contacto", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-navy-foreground/80 hover:text-gold font-body font-medium text-sm tracking-wide transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA + Phone */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+34612345678" className="flex items-center gap-2 text-navy-foreground/70 text-sm">
              <Phone className="h-4 w-4" />
              <span>+34 612 345 678</span>
            </a>
            <Button
              onClick={() => scrollTo("booking")}
              className="bg-gold hover:bg-gold/90 text-gold-foreground font-body font-semibold"
            >
              Reservar Ahora
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-navy-foreground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-ocean/20 mt-2 pt-4 space-y-3">
            {["Inicio|hero", "Flota|fleet", "Reservar|booking", "Contacto|contact"].map((item) => {
              const [label, id] = item.split("|");
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="block w-full text-left text-navy-foreground/80 hover:text-gold font-body py-2 transition-colors"
                >
                  {label}
                </button>
              );
            })}
            <Button
              onClick={() => scrollTo("booking")}
              className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-semibold mt-2"
            >
              Reservar Ahora
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
