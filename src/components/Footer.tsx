import logoImg from "@/assets/logo-negoba.png";

const Footer = () => {
  return (
    <footer className="bg-midnight border-t border-ocean-foreground/5 py-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="Nàutica Negobà" className="h-8 w-auto" />
        </div>
        <p className="font-body text-ocean-foreground/40 text-sm">
          © {new Date().getFullYear()} Nàutica Negobà. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
