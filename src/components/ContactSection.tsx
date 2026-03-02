import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-navy text-navy-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-body font-semibold text-gold tracking-[0.2em] uppercase text-sm mb-3">
            Contacto
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold">
            ¿Tienes dudas?
          </h2>
          <p className="font-body text-navy-foreground/70 mt-4 max-w-xl mx-auto">
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
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-ocean/20 mb-4">
                <Icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-1">{title}</h3>
              <p className="font-body text-navy-foreground/70 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
