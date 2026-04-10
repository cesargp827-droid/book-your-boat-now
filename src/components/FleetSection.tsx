import { Users, Zap, ShowerHead, Speaker, ArrowRight, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSkipper } from "@/context/SkipperContext";
import { useReveal } from "@/hooks/useReveal";
import nireusImg from "@/assets/nireus-620.jpg";
import barracudaImg from "@/assets/barracuda-545.jpg";
import astiluxImg from "@/assets/astilux-600.jpg";

interface BoatData {
  name: string;
  image: string;
  description: string;
  capacity: number;
  power: string;
  length: string;
  boatValue: string;
  prices: { "2h": number; "4h": number; "8h": number };
}

const boats: BoatData[] = [
  {
    name: "Nireus 620 CL",
    image: nireusImg,
    description: "Casco deportivo con aceleración inmediata y estabilidad superior.",
    capacity: 10,
    power: "200 CV",
    length: "6.20 m",
    boatValue: "nireus-620",
    prices: { "2h": 140, "4h": 250, "8h": 470 },
  },
  {
    name: "OKIBOATS Barracuda 545",
    image: barracudaImg,
    description: "La embarcación más ligera y reactiva de nuestra flota.",
    capacity: 7,
    power: "100 CV",
    length: "5.45 m",
    boatValue: "barracuda-545",
    prices: { "2h": 130, "4h": 210, "8h": 300 },
  },
  {
    name: "Astilux AX 600 Open",
    image: astiluxImg,
    description: "Diseño de vanguardia fusionado con confort premium.",
    capacity: 7,
    power: "100 CV",
    length: "6.00 m",
    boatValue: "astilux-600",
    prices: { "2h": 130, "4h": 210, "8h": 300 },
  },
];

const SKIPPER_COST = 45;

const FleetSection = () => {
  const navigate = useNavigate();
  const { withSkipper } = useSkipper();
  const headerRef = useReveal();

  const getCapacity = (boat: BoatData) =>
    withSkipper ? boat.capacity - 1 : boat.capacity;

  const handleSelectBoat = (boat: BoatData) => {
    const params = new URLSearchParams({
      boat: boat.boatValue,
      skipper: withSkipper ? "1" : "0",
    });
    navigate(`/reservar?${params.toString()}`);
  };

  return (
    <section id="fleet" className="py-16 lg:py-36 bg-background">
      <div className="container mx-auto px-4">
      {/* Header */}
        <div className="text-center mb-10 lg:mb-20 max-w-2xl mx-auto" ref={headerRef}>
          <p data-reveal className="font-body font-semibold text-primary tracking-[0.3em] uppercase text-xs mb-5">
            Nuestra Flota
          </p>
          <h2 data-reveal className="font-display text-2xl lg:text-5xl font-bold text-foreground">
            Alquiler de Barcos en Castelldefels y Port Ginesta
          </h2>
          <p className="font-body text-muted-foreground mt-6 text-lg leading-relaxed">
            {withSkipper
              ? "Alquiler con patrón profesional incluido. Selecciona tu embarcación."
              : "Alquiler de barcos con licencia en Castelldefels. Equipamiento premium de serie."}
          </p>
        </div>

        {/* Boat Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 max-w-6xl mx-auto">
          {boats.map((boat) => {
            const cap = getCapacity(boat);
            return (
              <div
                key={boat.boatValue}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 flex flex-col"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={boat.image}
                    alt={`Alquiler ${boat.name} ${withSkipper ? "con patrón" : "con licencia"} en Castelldefels y Port Ginesta`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {boat.name === "Nireus 620 CL" && (
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground font-body text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
                      Más Popular
                    </div>
                  )}
                  {withSkipper && (
                    <div className="absolute bottom-4 left-4 bg-gold/90 text-gold-foreground font-body text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
                      Con Patrón +{SKIPPER_COST}€
                    </div>
                  )}
                </div>

                <div className="p-4 lg:p-7 flex flex-col flex-1">
                  <h3 className="font-display text-lg lg:text-xl font-bold text-foreground mb-1 lg:mb-2">
                    {boat.name}
                  </h3>
                  <p className="font-body text-muted-foreground text-xs lg:text-sm leading-relaxed mb-3 lg:mb-5 flex-1">
                    {boat.description}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-3 lg:mb-4 text-xs lg:text-sm text-muted-foreground font-body">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-primary" /> {cap} pers.
                      {withSkipper && <span className="text-[10px] text-gold">(+patrón)</span>}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Ruler className="h-4 w-4 text-primary" /> {boat.length}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-primary" /> {boat.power}
                    </span>
                  </div>

                  {/* Equipment */}
                  <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6 text-[10px] lg:text-xs text-muted-foreground font-body">
                    <span className="flex items-center gap-1.5 bg-muted px-2.5 py-1.5 rounded-lg">
                      <ShowerHead className="h-3.5 w-3.5 text-primary" /> Ducha agua dulce
                    </span>
                    <span className="flex items-center gap-1.5 bg-muted px-2.5 py-1.5 rounded-lg">
                      <Speaker className="h-3.5 w-3.5 text-primary" /> Altavoces HQ
                    </span>
                  </div>

                  <Button
                    onClick={() => handleSelectBoat(boat)}
                    className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold"
                  >
                    Elegir Barco <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;