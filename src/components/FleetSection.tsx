import { useState } from "react";
import { Users, Zap, ShowerHead, Speaker, ArrowRight, ArrowLeft, Gift, ShieldCheck, Clock, Sparkles, Check, Shield } from "lucide-react";
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
  boatValue: string;
  prices: { "2h": number; "4h": number; "8h": number };
  pack: {
    perPerson: number;
    extras: { name: string; saving: string }[];
    duration: string;
    totalHours: string;
  };
}

const boats: BoatData[] = [
  {
    name: "Nireus 620 CL",
    image: nireusImg,
    description: "Casco deportivo con aceleración inmediata y estabilidad superior.",
    capacity: 10,
    power: "200 CV",
    boatValue: "nireus-620",
    prices: { "2h": 140, "4h": 250, "8h": 470 },
    pack: {
      perPerson: 32,
      extras: [
        { name: "Donut acuático", saving: "25 €" },
        { name: "Mini-bar Premium", saving: "20 €" },
        { name: "Clase personalizada 20 min", saving: "" },
      ],
      duration: "4h + 2h GRATIS",
      totalHours: "6h",
    },
  },
  {
    name: "OKIBOATS Barracuda 545",
    image: barracudaImg,
    description: "La embarcación más ligera y reactiva de nuestra flota.",
    capacity: 7,
    power: "100 CV",
    boatValue: "barracuda-545",
    prices: { "2h": 130, "4h": 210, "8h": 300 },
    pack: {
      perPerson: 35,
      extras: [
        { name: "Donut acuático", saving: "25 €" },
        { name: "Mini-bar Premium", saving: "20 €" },
        { name: "Clase personalizada 20 min", saving: "" },
      ],
      duration: "4h + 2h GRATIS",
      totalHours: "6h",
    },
  },
  {
    name: "Astilux AX 600 Open",
    image: astiluxImg,
    description: "Diseño de vanguardia fusionado con confort premium.",
    capacity: 7,
    power: "100 CV",
    boatValue: "astilux-600",
    prices: { "2h": 130, "4h": 210, "8h": 300 },
    pack: {
      perPerson: 40,
      extras: [
        { name: "Donut acuático", saving: "25 €" },
        { name: "Mini-bar Premium", saving: "20 €" },
        { name: "Clase personalizada 20 min", saving: "" },
      ],
      duration: "4h + 2h GRATIS",
      totalHours: "6h",
    },
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

  const getPackTotal = (boat: BoatData) =>
    boat.pack.perPerson * getCapacity(boat) + (withSkipper ? SKIPPER_COST : 0);

  const savingComparison = selectedBoat
    ? getPackTotal(selectedBoat) - getBasicPrice(selectedBoat, "4h")
    : 0;

  const handleReserveBasic = () => {
    if (!selectedBoat) return;
    const params = new URLSearchParams({
      boat: selectedBoat.boatValue,
      skipper: withSkipper ? "1" : "0",
      duration: selectedDuration,
    });
    navigate(`/reservar?${params.toString()}`);
  };

  const handleReservePack = () => {
    if (!selectedBoat) return;
    const params = new URLSearchParams({
      boat: selectedBoat.boatValue,
      skipper: withSkipper ? "1" : "0",
      pack: "vip",
    });
    navigate(`/reservar?${params.toString()}`);
  };

  return (
    <section id="fleet" className="py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="font-body font-semibold text-primary tracking-[0.3em] uppercase text-xs mb-5">
            Nuestra Flota
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground">
            {selectedBoat ? "Elige tu Experiencia" : "Elige tu Embarcación"}
          </h2>
          <p className="font-body text-muted-foreground mt-5 text-lg leading-relaxed">
            {selectedBoat
              ? `Has elegido la ${selectedBoat.name}. Ahora selecciona tu modalidad de navegación.`
              : withSkipper
                ? "Alquiler con patrón profesional en Sitges y Port Ginesta."
                : "Alquiler de barcos en Sitges con licencia. Selecciona tu embarcación para ver opciones."}
          </p>
          {withSkipper && !selectedBoat && (
            <div className="inline-flex items-center gap-2 mt-4 bg-gold/10 text-gold font-body text-sm font-semibold px-4 py-2 rounded-full border border-gold/20">
              <ShieldCheck className="h-4 w-4" />
              Capitán profesional incluido
            </div>
          )}
        </div>

        {/* STEP 1: Boat Selection */}
        {!selectedBoat && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                      alt={`Alquiler ${boat.name} ${withSkipper ? "con patrón" : "con licencia"} en Sitges y Port Ginesta`}
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

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {boat.name}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                      {boat.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-muted-foreground font-body">
                      <span className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-primary" /> {cap} pers.
                        {withSkipper && <span className="text-[10px] text-gold">(+patrón)</span>}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Zap className="h-4 w-4 text-primary" /> {boat.power}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-5 text-xs text-muted-foreground font-body">
                      <span className="flex items-center gap-1.5 bg-muted px-2.5 py-1.5 rounded-lg">
                        <ShowerHead className="h-3.5 w-3.5 text-primary" /> Ducha agua dulce
                      </span>
                      <span className="flex items-center gap-1.5 bg-muted px-2.5 py-1.5 rounded-lg">
                        <Speaker className="h-3.5 w-3.5 text-primary" /> Altavoces HQ
                      </span>
                    </div>

                    <Button
                      onClick={() => setSelectedBoat(boat)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body font-bold"
                    >
                      Elegir Barco <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 2: Tariff Selection */}
        {selectedBoat && (
          <div className="max-w-5xl mx-auto">
            {/* Back button */}
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
                  {getCapacity(selectedBoat)} personas · {selectedBoat.power}
                  {withSkipper && <span className="text-gold ml-1">· Con patrón</span>}
                </p>
              </div>
            </div>

            {/* Two options side by side */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* A) TARIFA BÁSICA */}
              <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border flex flex-col">
                <div className="bg-primary px-6 py-4">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-primary-foreground/70 mb-1">Opción A</p>
                  <h4 className="font-display text-xl font-bold text-primary-foreground">Tarifa Básica</h4>
                  <p className="font-body text-sm text-primary-foreground/80 mt-1">Alquiler de embarcación completa</p>
                </div>

                <div className="p-6 flex flex-col flex-1">
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

                  {/* Price */}
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

                  <div className="mt-auto space-y-4">
                    {/* Fianza */}
                    <p className="font-body text-xs text-muted-foreground text-center">
                      <strong className="text-foreground">Fianza: 400€</strong> — se abona el día del servicio en el puerto
                    </p>

                    <Button
                      onClick={handleReserveBasic}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body font-bold py-5 rounded-xl"
                    >
                      Reservar — {getBasicPrice(selectedBoat, selectedDuration)}€
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* B) OFERTA ESPECIAL MARZO */}
              <div className="bg-card rounded-2xl shadow-card overflow-hidden border-2 border-gold relative flex flex-col">
                {/* Recommended badge */}
                <div className="absolute -top-px -right-px bg-gold text-gold-foreground font-body text-[10px] font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl uppercase tracking-wider z-10">
                  Recomendado
                </div>

                <div className="bg-gold px-6 py-4">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-foreground/70 mb-1">Opción B · Oferta Marzo</p>
                  <h4 className="font-display text-xl font-bold text-gold-foreground">Pack Especial</h4>
                  <p className="font-body text-sm text-gold-foreground/80 mt-1">
                    {selectedBoat.pack.duration} · Todo incluido
                  </p>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Value Stack */}
                  <p className="font-body text-sm font-semibold text-foreground mb-3">
                    <Sparkles className="h-4 w-4 inline text-gold mr-1" />
                    Incluido en tu pack:
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 bg-gold/5 rounded-lg px-3 py-2 border border-gold/10">
                      <Clock className="h-4 w-4 text-gold flex-shrink-0" />
                      <span className="font-body text-sm text-foreground font-semibold">6 horas de navegación</span>
                      <span className="ml-auto font-body text-[10px] bg-gold/15 text-gold font-bold px-2 py-0.5 rounded">2h GRATIS</span>
                    </div>
                    {selectedBoat.pack.extras.map((extra) => (
                      <div key={extra.name} className="flex items-center gap-2 bg-gold/5 rounded-lg px-3 py-2 border border-gold/10">
                        <Gift className="h-4 w-4 text-gold flex-shrink-0" />
                        <span className="font-body text-sm text-foreground">{extra.name}</span>
                        {extra.saving && (
                          <span className="ml-auto font-body text-[10px] bg-gold/15 text-gold font-bold px-2 py-0.5 rounded">
                            Ahorro {extra.saving}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="bg-gold/8 rounded-xl p-5 border border-gold/15 mb-6">
                    <div className="space-y-2 text-sm font-body">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {selectedBoat.pack.perPerson}€ × {getCapacity(selectedBoat)} personas
                        </span>
                        <span className="font-semibold text-foreground">
                          {selectedBoat.pack.perPerson * getCapacity(selectedBoat)}€
                        </span>
                      </div>
                      {withSkipper && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Patrón profesional</span>
                          <span className="font-semibold text-foreground">+{SKIPPER_COST}€</span>
                        </div>
                      )}
                    </div>
                    <div className="border-t border-gold/15 pt-3 mt-3 flex items-end justify-between">
                      <span className="font-body font-bold text-gold text-sm">Total</span>
                      <span className="font-display text-3xl font-bold text-foreground">
                        {getPackTotal(selectedBoat)}€
                      </span>
                    </div>
                  </div>

                  {/* Savings comparison */}
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 mb-4">
                    <p className="font-body text-xs text-primary text-center leading-relaxed">
                      <strong>Navega 6 horas con todos los extras</strong> por solo{" "}
                      <strong className="text-gold">
                        {savingComparison > 0 ? `${savingComparison}€ más` : `${Math.abs(savingComparison)}€ menos`}
                      </strong>{" "}
                      que el alquiler básico de 4h
                    </p>
                  </div>

                  <div className="mt-auto space-y-4">
                    {/* Fianza */}
                    <p className="font-body text-xs text-muted-foreground text-center">
                      <strong className="text-foreground">Fianza: 400€</strong> — se abona el día del servicio en el puerto
                    </p>

                    <Button
                      onClick={handleReservePack}
                      className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold py-5 rounded-xl text-base"
                    >
                      Reservar Pack — {getPackTotal(selectedBoat)}€
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Garantía */}
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-3 bg-card rounded-xl px-6 py-4 shadow-card border border-border">
                <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-left">
                  <p className="font-body text-sm font-bold text-foreground">Garantía de Riesgo Cero</p>
                  <p className="font-body text-xs text-muted-foreground">Devolución íntegra si el clima no acompaña</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FleetSection;
