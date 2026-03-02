import { Anchor } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy border-t border-ocean/10 py-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Anchor className="h-5 w-5 text-gold" />
          <span className="font-display text-sm font-semibold text-navy-foreground">Náutica Negobà</span>
        </div>
        <p className="font-body text-navy-foreground/50 text-sm">
          © {new Date().getFullYear()} Náutica Negobà. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
