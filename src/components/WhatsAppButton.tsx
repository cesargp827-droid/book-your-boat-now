import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/34622696574?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20un%20barco"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(142_70%_45%)] hover:bg-[hsl(142_70%_40%)] text-ocean-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;
