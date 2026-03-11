import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-28 lg:py-36 bg-primary text-ocean-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="font-body font-semibold text-gold tracking-[0.3em] uppercase text-xs mb-5">
            Contacto
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold">
            ¿Tienes dudas?
          </h2>
          <p className="font-body text-ocean-foreground/60 mt-5 text-lg">
            Estamos encantados de ayudarte a planificar tu próxima aventura en el mar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { icon: MapPin, title: "Ubicación", text: "Port Ginesta, Sitges" },
            { icon: Phone, title: "Teléfono", text: "+34 612 345 678" },
            { icon: Mail, title: "Email", text: "info@nauticanegoba.com" },
            { icon: Clock, title: "Horario", text: "L-D: 9:00 - 20:00" },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 mb-4">
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-1">{title}</h3>
              <p className="font-body text-ocean-foreground/60 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
