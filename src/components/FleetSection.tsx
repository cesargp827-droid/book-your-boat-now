import { useState } from "react";
import { Users, Zap, ShowerHead, Speaker, ArrowRight, ArrowLeft, Clock, Shield, ShieldCheck, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSkipper } from "@/context/SkipperContext";
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
  const [selectedBoat, setSelectedBoat] = useState<BoatData | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<"2h" | "4h" | "8h">("4h");

  const getCapacity = (boat: BoatData) =>
    withSkipper ? boat.capacity - 1 : boat.capacity;

  const getBasicPrice = (boat: BoatData, dur: "2h" | "4h" | "8h") =>
    boat.prices[dur] + (withSkipper ? SKIPPER_COST : 0);

  const handleReserveBasic = () => {
    if (!selectedBoat) return;
    const params = new URLSearchParams({
      boat: selectedBoat.boatValue,
      skipper: withSkipper ? "1" : "0",
      duration: selectedDuration,
    });
    navigate(`/reservar?${params.toString()}`);
  };

  return (
    <section id="fleet" className="py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <p className="font-body font-semibold text-primary tracking-[0.3em] uppercase text-xs mb-5">
            Nuestra Flota
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground">
            {selectedBoat ? "Configura tu Alquiler" : "Alquiler de Barcos en Castelldefels y Port Ginesta"}
          </h2>
          <p className="font-body text-muted-foreground mt-6 text-lg leading-relaxed">
            {selectedBoat
              ? `Has elegido la ${selectedBoat.name}. Selecciona la duración de tu experiencia.`
              : withSkipper
                ? "Alquiler con patrón profesional incluido. Selecciona tu embarcación."
                : "Alquiler de barcos con licencia en Castelldefels. Equipamiento premium de serie."}
          </p>
          {withSkipper && !selectedBoat && (
            <div className="inline-flex items-center gap-2 mt-5 bg-gold/10 text-gold font-body text-sm font-semibold px-4 py-2 rounded-full border border-gold/20">
              <ShieldCheck className="h-4 w-4" />
              Capitán profesional incluido en todas las embarcaciones
            </div>
          )}
        </div>

        {/* STEP 1: Boat Selection */}
        {!selectedBoat && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
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

                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {boat.name}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                      {boat.description}
                    </p>

                    {/* Specs */}
                    <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground font-body">
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
                    <div className="flex items-center gap-3 mb-6 text-xs text-muted-foreground font-body">
                      <span className="flex items-center gap-1.5 bg-muted px-2.5 py-1.5 rounded-lg">
                        <ShowerHead className="h-3.5 w-3.5 text-primary" /> Ducha agua dulce
                      </span>
                      <span className="flex items-center gap-1.5 bg-muted px-2.5 py-1.5 rounded-lg">
                        <Speaker className="h-3.5 w-3.5 text-primary" /> Altavoces HQ
                      </span>
                    </div>

                    <Button
                      onClick={() => setSelectedBoat(boat)}
                      className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold"
                    >
                      Elegir Barco <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 2: Duration & Price */}
        {selectedBoat && (
          <div className="max-w-2xl mx-auto">
            {/* Back */}
            <button
              onClick={() => setSelectedBoat(null)}
              className="flex items-center gap-2 font-body text-sm text-primary hover:text-primary/80 transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" /> Cambiar embarcación
            </button>

            {/* Selected boat summary */}
            <div className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-card mb-10">
              <img
                src={selectedBoat.image}
                alt={selectedBoat.name}
                className="w-20 h-14 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">{selectedBoat.name}</h3>
                <p className="font-body text-xs text-muted-foreground">
                  {selectedBoat.length} · {getCapacity(selectedBoat)} personas · {selectedBoat.power}
                  {withSkipper && <span className="text-gold ml-1">· Con patrón</span>}
                </p>
              </div>
            </div>

            {/* Tarifa Básica */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border">
              <div className="bg-primary px-6 py-4">
                <h4 className="font-display text-xl font-bold text-primary-foreground">Tarifa Básica</h4>
                <p className="font-body text-sm text-primary-foreground/80 mt-1">Personaliza la duración de tu alquiler</p>
              </div>

              <div className="p-6">
                {/* Duration selector */}
                <p className="font-body text-sm font-semibold text-foreground mb-3">Elige la duración:</p>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {(["2h", "4h", "8h"] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDuration(d)}
                      className={cn(
                        "rounded-xl px-3 py-3 font-body text-sm font-semibold transition-all border-2 text-center",
                        selectedDuration === d
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:border-primary/40"
                      )}
                    >
                      <Clock className="h-3.5 w-3.5 mx-auto mb-1" />
                      {d === "2h" ? "2 horas" : d === "4h" ? "4 horas" : "8 horas"}
                    </button>
                  ))}
                </div>

                {/* Price breakdown */}
                <div className="bg-secondary rounded-xl p-5 mb-6">
                  <div className="space-y-2 text-sm font-body">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Alquiler embarcación ({selectedDuration})</span>
                      <span className="font-semibold text-foreground">{selectedBoat.prices[selectedDuration]}€</span>
                    </div>
                    {withSkipper && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Patrón profesional</span>
                        <span className="font-semibold text-foreground">+{SKIPPER_COST}€</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-border pt-3 mt-3 flex items-end justify-between">
                    <span className="font-body font-bold text-primary text-sm">Total</span>
                    <span className="font-display text-3xl font-bold text-foreground">
                      {getBasicPrice(selectedBoat, selectedDuration)}€
                    </span>
                  </div>
                </div>

                {/* Fianza & guarantee */}
                <div className="space-y-3 mb-6">
                  <p className="font-body text-xs text-muted-foreground text-center">
                    <strong className="text-foreground">Fianza: 400€</strong> — se abona el día del servicio en el puerto
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs font-body text-primary">
                    <Shield className="h-3.5 w-3.5" />
                    <span><strong>Garantía de Riesgo Cero:</strong> devolución íntegra si el clima no acompaña en Castelldefels</span>
                  </div>
                </div>

                <Button
                  onClick={handleReserveBasic}
                  className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold py-5 rounded-xl text-base"
                >
                  Reservar — {getBasicPrice(selectedBoat, selectedDuration)}€
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Nudge to special offer */}
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setSelectedBoat(null);
                  setTimeout(() => {
                    document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="font-body text-sm text-primary hover:text-gold transition-colors underline underline-offset-4"
              >
                ¿Buscas más horas y extras incluidos? Ver Oferta Especial →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FleetSection;