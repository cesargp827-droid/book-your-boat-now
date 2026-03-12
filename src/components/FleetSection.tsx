import { useState } from "react";
import { Users, Zap, Anchor, ShowerHead, Speaker, ArrowRight, X, Clock, Gift, Droplets, Volume2, Donut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
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
  prices: { "4h": number; "8h": number };
  pack: {
    perPerson: number;
    totalBase: number;
    extras: string[];
    duration: string;
  };
}

const boats: BoatData[] = [
  {
    name: "Nireus 620 CL",
    image: nireusImg,
    description: "Navega con la máxima agilidad a bordo de nuestra Nireus 620. Casco deportivo con aceleración inmediata y estabilidad superior.",
    capacity: 10,
    power: "200 CV",
    boatValue: "nireus-620",
    prices: { "4h": 270, "8h": 470 },
    pack: {
      perPerson: 32,
      totalBase: 320,
      extras: ["2h extra gratis", "Mini-bar premium", "Donut acuático", "Clase 20 min"],
      duration: "4h (+2h gratis)",
    },
  },
  {
    name: "OKIBOATS Barracuda 595",
    image: barracudaImg,
    description: "Siente la velocidad pura con la Barracuda 595, la embarcación más ligera y reactiva de nuestra flota en Port Ginesta.",
    capacity: 7,
    power: "100 CV",
    boatValue: "barracuda-595",
    prices: { "4h": 200, "8h": 310 },
    pack: {
      perPerson: 35,
      totalBase: 245,
      extras: ["2h extra gratis", "Mini-bar premium", "Donut acuático", "Clase 20 min"],
      duration: "4h (+2h gratis)",
    },
  },
  {
    name: "Astilux AX 600 Open",
    image: astiluxImg,
    description: "Diseño de vanguardia fusionado con velocidad sorprendente. La mezcla perfecta entre estética y confort premium.",
    capacity: 7,
    power: "100 CV",
    boatValue: "astilux-600",
    prices: { "4h": 225, "8h": 340 },
    pack: {
      perPerson: 40,
      totalBase: 280,
      extras: ["2h extra gratis", "Mini-bar premium", "Donut acuático", "Clase 20 min"],
      duration: "4h (+2h gratis)",
    },
  },
];

const SKIPPER_COST = 100;

const FleetSection = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [offerType, setOfferType] = useState<"basic" | "pack">("basic");
  const [duration, setDuration] = useState<"4h" | "8h">("4h");
  const [withSkipper, setWithSkipper] = useState(false);

  const activeBoat = boats.find((b) => b.boatValue === openModal);

  const computedPrice = (() => {
    if (!activeBoat) return 0;
    const base = offerType === "pack"
      ? activeBoat.pack.perPerson * activeBoat.capacity
      : activeBoat.prices[duration];
    return base + (withSkipper ? SKIPPER_COST : 0);
  })();

  const handleReserve = () => {
    if (!activeBoat) return;
    const params = new URLSearchParams({ boat: activeBoat.boatValue, skipper: withSkipper ? "1" : "0" });
    if (offerType === "pack") {
      params.set("pack", "vip");
    } else {
      params.set("duration", duration);
    }
    navigate(`/reservar?${params.toString()}`);
  };

  const resetAndOpen = (boatValue: string) => {
    setOfferType("basic");
    setDuration("4h");
    setWithSkipper(false);
    setOpenModal(boatValue);
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
            Elige tu Embarcación
          </h2>
          <p className="font-body text-muted-foreground mt-5 text-lg leading-relaxed">
            Alquiler con licencia en Port Ginesta y Sitges. Dos opciones: tarifa por barco o pack exclusivo por persona.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {boats.map((boat) => (
            <div key={boat.name} className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 flex flex-col">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={boat.image}
                  alt={`Alquiler ${boat.name} en Sitges y Port Ginesta`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-gold text-gold-foreground font-body font-bold px-3 py-1.5 rounded-lg text-sm">
                  Desde {boat.prices["4h"]}€
                </div>
                {boat.name === "Nireus 620 CL" && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground font-body text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
                    Más Popular
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{boat.name}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  {boat.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-muted-foreground font-body">
                  <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" /> {boat.capacity} pers.</span>
                  <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-primary" /> {boat.power}</span>
                </div>

                <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground font-body">
                  <span className="flex items-center gap-1.5 bg-muted px-2.5 py-1.5 rounded-lg">
                    <ShowerHead className="h-3.5 w-3.5 text-primary" /> Ducha
                  </span>
                  <span className="flex items-center gap-1.5 bg-muted px-2.5 py-1.5 rounded-lg">
                    <Speaker className="h-3.5 w-3.5 text-primary" /> Altavoces HQ
                  </span>
                </div>

                {/* Two price previews */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-body">
                  <div className="bg-secondary rounded-lg p-2.5 text-center">
                    <p className="text-muted-foreground mb-0.5">Básica</p>
                    <p className="font-bold text-foreground">{boat.prices["4h"]}€ <span className="font-normal text-muted-foreground">/ 4h</span></p>
                  </div>
                  <div className="bg-gold/10 rounded-lg p-2.5 text-center border border-gold/20">
                    <p className="text-gold font-semibold mb-0.5">Pack VIP</p>
                    <p className="font-bold text-foreground">{boat.pack.perPerson}€ <span className="font-normal text-muted-foreground">/ pers.</span></p>
                  </div>
                </div>

                <Button
                  onClick={() => resetAndOpen(boat.boatValue)}
                  className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold"
                >
                  Reservar <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeBoat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4" onClick={() => setOpenModal(null)}>
          <div
            className="bg-card rounded-2xl shadow-hero max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative">
              <img src={activeBoat.image} alt={activeBoat.name} className="w-full aspect-[16/9] object-cover rounded-t-2xl" />
              <button onClick={() => setOpenModal(null)} className="absolute top-4 right-4 w-8 h-8 bg-card/80 backdrop-blur rounded-full flex items-center justify-center">
                <X className="h-4 w-4 text-foreground" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card to-transparent h-16" />
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground">{activeBoat.name}</h3>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  <Users className="h-3.5 w-3.5 inline mr-1" />
                  Hasta {activeBoat.capacity} personas · {activeBoat.power}
                </p>
              </div>

              {/* Offer type selector */}
              <div>
                <p className="font-body text-sm font-semibold text-foreground mb-3">Tipo de oferta</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setOfferType("basic")}
                    className={cn(
                      "rounded-xl p-4 text-left transition-all border-2",
                      offerType === "basic"
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/30"
                    )}
                  >
                    <p className="font-body text-xs uppercase tracking-wider font-bold text-primary mb-1">Básica</p>
                    <p className="font-body text-[11px] text-muted-foreground">Alquiler embarcación completa</p>
                    <p className="font-display text-xl font-bold text-foreground mt-2">
                      {activeBoat.prices["4h"]}€ <span className="font-body text-xs text-muted-foreground">/ 4h</span>
                    </p>
                  </button>
                  <button
                    onClick={() => setOfferType("pack")}
                    className={cn(
                      "rounded-xl p-4 text-left transition-all border-2",
                      offerType === "pack"
                        ? "border-gold bg-gold/5"
                        : "border-border bg-card hover:border-gold/30"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-body text-xs uppercase tracking-wider font-bold text-gold mb-1">Pack VIP</p>
                      <span className="bg-gold/10 text-gold font-body text-[9px] font-bold px-2 py-0.5 rounded">MAYO</span>
                    </div>
                    <p className="font-body text-[11px] text-muted-foreground">Precio por persona × {activeBoat.capacity}</p>
                    <p className="font-display text-xl font-bold text-gold mt-2">
                      {activeBoat.pack.perPerson}€ <span className="font-body text-xs text-muted-foreground">/ pers.</span>
                    </p>
                  </button>
                </div>
              </div>

              {/* Duration (only for basic) */}
              {offerType === "basic" && (
                <div>
                  <p className="font-body text-sm font-semibold text-foreground mb-3">Duración</p>
                  <div className="grid grid-cols-2 gap-3">
                    {(["4h", "8h"] as const).map((d) => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={cn(
                          "rounded-xl px-4 py-3 font-body text-sm font-semibold transition-all border-2 text-center",
                          duration === d
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-foreground border-border hover:border-primary/40"
                        )}
                      >
                        {d === "4h" ? "4 horas" : "8 horas (Día completo)"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pack extras */}
              {offerType === "pack" && (
                <div className="bg-gold/5 rounded-xl p-4 border border-gold/15">
                  <p className="font-body text-xs font-bold text-gold uppercase tracking-wider mb-2">Incluido en el Pack VIP</p>
                  <ul className="space-y-1.5">
                    {activeBoat.pack.extras.map((e) => (
                      <li key={e} className="font-body text-xs text-muted-foreground flex items-center gap-2">
                        <Gift className="h-3 w-3 text-gold flex-shrink-0" /> {e}
                      </li>
                    ))}
                  </ul>
                  <p className="font-body text-[11px] text-muted-foreground mt-3 pt-2 border-t border-gold/10">
                    Duración total: <strong className="text-foreground">{activeBoat.pack.duration}</strong> · Mín. {activeBoat.capacity} personas (barco completo)
                  </p>
                </div>
              )}

              {/* Skipper toggle */}
              <div className="flex items-center justify-between bg-secondary rounded-xl p-4">
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">¿Necesitas Patrón?</p>
                  <p className="font-body text-xs text-muted-foreground">
                    {withSkipper
                      ? "Un profesional conduce — no necesitas licencia"
                      : "Requiere licencia de navegación válida"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-body text-xs font-semibold text-muted-foreground">+{SKIPPER_COST}€</span>
                  <Switch checked={withSkipper} onCheckedChange={setWithSkipper} />
                </div>
              </div>

              {/* Price summary */}
              <div className="bg-gold/8 rounded-xl p-5 border border-gold/15">
                <div className="space-y-2 text-sm font-body mb-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {offerType === "pack"
                        ? `Precio por persona × ${activeBoat.capacity}`
                        : `Alquiler embarcación completa (${duration})`}
                    </span>
                    <span className="font-semibold text-foreground">
                      {offerType === "pack"
                        ? `${activeBoat.pack.perPerson} × ${activeBoat.capacity} = ${activeBoat.pack.totalBase}€`
                        : `${activeBoat.prices[duration]}€`}
                    </span>
                  </div>
                  {withSkipper && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Patrón profesional</span>
                      <span className="font-semibold text-foreground">+{SKIPPER_COST}€</span>
                    </div>
                  )}
                </div>
                <div className="border-t border-gold/15 pt-3 flex items-end justify-between">
                  <span className="font-body font-bold text-primary text-sm">Total</span>
                  <span className="font-display text-3xl font-bold text-foreground">{computedPrice}€</span>
                </div>
              </div>

              {/* Fianza */}
              <p className="font-body text-xs text-muted-foreground text-center">
                <strong className="text-foreground">Fianza: 400€</strong> — se abona el día del servicio en el puerto
              </p>

              {/* CTA */}
              <Button
                onClick={handleReserve}
                size="lg"
                className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold text-base py-6 rounded-xl"
              >
                Reservar — {computedPrice}€
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FleetSection;
