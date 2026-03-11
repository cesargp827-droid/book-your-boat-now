import { Users, Zap, Anchor, ShowerHead, Speaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import nireusImg from "@/assets/nireus-620.jpg";
import barracudaImg from "@/assets/barracuda-545.jpg";
import astiluxImg from "@/assets/astilux-600.jpg";

const boats = [
  {
    name: "Nireus 620 CL",
    image: nireusImg,
    description:
      "Navega con la máxima agilidad a bordo de nuestra Nireus 620, diseñada para volar sobre las olas de Sitges. Casco deportivo con aceleración inmediata y estabilidad superior.",
    capacity: 10,
    power: "200 CV",
    license: "Con Licencia",
    price: 270,
    priceLabel: "4h: 270€ · 8h: 470€",
    boatValue: "nireus-620",
  },
  {
    name: "OKIBOATS Barracuda 595",
    image: barracudaImg,
    description:
      "Siente la velocidad pura con la Barracuda 595, la embarcación más ligera y reactiva de nuestra flota en Port Ginesta. Ideal para recorrer grandes distancias.",
    capacity: 7,
    power: "100 CV",
    license: "Con Licencia",
    price: 200,
    priceLabel: "4h: 200€ · 8h: 310€",
    boatValue: "barracuda-595",
  },
  {
    name: "Astilux AX 600 Open",
    image: astiluxImg,
    description:
      "El diseño de vanguardia se fusiona con una velocidad sorprendente. La mezcla perfecta entre estética impecable y confort premium para tu experiencia náutica.",
    capacity: 7,
    power: "100 CV",
    license: "Con Licencia",
    price: 225,
    priceLabel: "4h: 225€ · 8h: 340€",
    boatValue: "astilux-600",
  },
];

const FleetSection = () => {
  const navigate = useNavigate();

  return (
    <section id="fleet" className="py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="font-body font-semibold text-primary tracking-[0.3em] uppercase text-xs mb-5">
            Alquiler Con Licencia
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground">
            Nuestra Flota
          </h2>
          <p className="font-body text-muted-foreground mt-5 text-lg leading-relaxed">
            Embarcaciones premium en Port Ginesta y Sitges. Elige la tuya y reserva en minutos.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {boats.map((boat) => (
            <div key={boat.name} className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 flex flex-col">
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={boat.image}
                  alt={`Alquiler ${boat.name} en Sitges y Port Ginesta`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-gold text-gold-foreground font-body font-bold px-3 py-1.5 rounded-lg text-sm">
                  Desde {boat.price}€
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{boat.name}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                  {boat.description}
                </p>

                {/* Specs */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground font-body">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-primary" /> {boat.capacity} pers.
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-primary" /> {boat.power}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Anchor className="h-4 w-4 text-primary" /> {boat.license}
                  </span>
                </div>

                {/* Equipment icons */}
                <div className="flex items-center gap-4 mb-5 text-xs text-muted-foreground font-body">
                  <span className="flex items-center gap-1.5 bg-muted px-2.5 py-1.5 rounded-lg">
                    <ShowerHead className="h-3.5 w-3.5 text-primary" /> Ducha agua dulce
                  </span>
                  <span className="flex items-center gap-1.5 bg-muted px-2.5 py-1.5 rounded-lg">
                    <Speaker className="h-3.5 w-3.5 text-primary" /> Altavoces HQ
                  </span>
                </div>

                {/* Price label */}
                <p className="font-body text-xs text-muted-foreground mb-4">{boat.priceLabel}</p>

                {/* Fianza */}
                <div className="bg-muted rounded-lg p-3 mb-5">
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Fianza: 400 €.</strong> El pago de la fianza se realizará el mismo día del servicio en el puerto.
                  </p>
                </div>

                {/* CTA */}
                <Button
                  onClick={() => navigate(`/reservar?boat=${boat.boatValue}`)}
                  className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold"
                >
                  Reservar · Desde {boat.price}€
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
