import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarDays, Ship, Clock, CreditCard, Check, ChevronRight, ArrowLeft, Users } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import barracudaImg from "@/assets/barracuda-545.jpg";
import nireusImg from "@/assets/nireus-620.jpg";
import astiluxImg from "@/assets/astilux-600.jpg";

const boats = [
  {
    value: "barracuda-595",
    name: "OKIBOATS Barracuda 595",
    image: barracudaImg,
    capacity: 7,
    prices: { "4h": 200, "8h": 310 },
  },
  {
    value: "nireus-620",
    name: "Nireus 620 CL",
    image: nireusImg,
    capacity: 10,
    prices: { "4h": 270, "8h": 470 },
  },
  {
    value: "astilux-600",
    name: "Astilux AX 600 Open",
    image: astiluxImg,
    capacity: 7,
    prices: { "4h": 225, "8h": 340 },
  },
];

// March offer packs
const offerPacks = [
  {
    boatValue: "barracuda-595",
    basic: { label: "Básica · 3h + 1h GRATIS", perPerson: 27, total: 190 },
    vip: { label: "VIP · 4h + 2h GRATIS + Extras", perPerson: 35, total: 245 },
  },
  {
    boatValue: "nireus-620",
    basic: { label: "Básica · 3h + 1h GRATIS", perPerson: 24, total: 240 },
    vip: { label: "VIP · 4h + 2h GRATIS + Extras", perPerson: 32, total: 320 },
  },
  {
    boatValue: "astilux-600",
    basic: { label: "Básica · 3h + 1h GRATIS", perPerson: 30, total: 210 },
    vip: { label: "VIP · 4h + 2h GRATIS + Extras", perPerson: 40, total: 280 },
  },
];

const durations = [
  { value: "4h", label: "4 horas", desc: "Media jornada" },
  { value: "8h", label: "8 horas", desc: "Día completo" },
];

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const preselectedBoat = searchParams.get("boat") || "";
  const preselectedPack = searchParams.get("pack") || ""; // "basic" or "vip"
  const isOffer = !!preselectedPack;

  const [date, setDate] = useState<Date | undefined>();
  const [boat, setBoat] = useState(preselectedBoat);
  const [duration, setDuration] = useState("");
  const [pack, setPack] = useState(preselectedPack);

  const selectedBoat = useMemo(() => boats.find((b) => b.value === boat), [boat]);
  const selectedOffer = useMemo(() => {
    if (!pack || !boat) return null;
    const offerBoat = offerPacks.find((o) => o.boatValue === boat);
    if (!offerBoat) return null;
    return pack === "vip" ? offerBoat.vip : offerBoat.basic;
  }, [pack, boat]);

  const regularPrice = useMemo(() => {
    if (!selectedBoat || !duration) return null;
    return selectedBoat.prices[duration as keyof typeof selectedBoat.prices];
  }, [selectedBoat, duration]);

  const finalPrice = selectedOffer ? selectedOffer.total : regularPrice;

  const handleSubmit = () => {
    if (!date || !boat || (!duration && !pack)) {
      toast.error("Por favor, completa todos los campos para reservar.");
      return;
    }
    toast.success("¡Solicitud de reserva enviada! Te contactaremos en breve para confirmar el pago.");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="bg-primary text-ocean-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-navy-foreground/70 hover:text-navy-foreground transition-colors font-body text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>
          <div className="h-5 w-px bg-navy-foreground/20" />
          <h1 className="font-display text-lg font-bold">Reserva tu Experiencia</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Left: Form */}
          <div className="space-y-8">
            {/* Step 1: Boat */}
            <div>
              <h2 className="flex items-center gap-2 font-display text-xl font-bold text-foreground mb-4">
                <span className="w-8 h-8 rounded-full bg-ocean text-ocean-foreground flex items-center justify-center text-sm font-body font-bold">1</span>
                Embarcación
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {boats.map((b) => (
                  <button
                    key={b.value}
                    onClick={() => { setBoat(b.value); if (!isOffer) setPack(""); }}
                    className={cn(
                      "rounded-xl overflow-hidden text-left transition-all duration-300 border-2 group",
                      boat === b.value
                        ? "border-ocean ring-2 ring-ocean/20 shadow-card-hover"
                        : "border-border bg-card hover:border-ocean/40 shadow-card"
                    )}
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img src={b.image} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      {boat === b.value && (
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-ocean text-ocean-foreground flex items-center justify-center">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-card">
                      <p className="font-display text-sm font-bold text-foreground">{b.name}</p>
                      <p className="font-body text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Users className="h-3 w-3" /> {b.capacity} pers.
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Pack or Duration */}
            {boat && (
              <div>
                <h2 className="flex items-center gap-2 font-display text-xl font-bold text-foreground mb-4">
                  <span className="w-8 h-8 rounded-full bg-ocean text-ocean-foreground flex items-center justify-center text-sm font-body font-bold">2</span>
                  {isOffer ? "Tu Oferta" : "Duración"}
                </h2>

                {isOffer && selectedOffer ? (
                  <div className="grid grid-cols-2 gap-4 max-w-lg">
                    {["basic", "vip"].map((p) => {
                      const offerBoat = offerPacks.find((o) => o.boatValue === boat);
                      if (!offerBoat) return null;
                      const offerData = p === "vip" ? offerBoat.vip : offerBoat.basic;
                      return (
                        <button
                          key={p}
                          onClick={() => setPack(p)}
                          className={cn(
                            "rounded-xl p-5 text-left transition-all duration-300 border-2",
                            pack === p
                              ? p === "vip" ? "border-gold bg-gold/5 shadow-card-hover" : "border-ocean bg-ocean/5 shadow-card-hover"
                              : "border-border bg-card hover:border-ocean/40 shadow-card"
                          )}
                        >
                          <p className={cn("font-body text-xs uppercase tracking-widest font-bold mb-2", p === "vip" ? "text-gold" : "text-ocean")}>
                            {p === "vip" ? "⭐ VIP" : "Básica"}
                          </p>
                          <p className="font-body text-xs text-muted-foreground mb-2">{offerData.label}</p>
                          <p className={cn("font-display text-2xl font-bold", p === "vip" ? "text-gold" : "text-ocean")}>
                            {offerData.perPerson} €<span className="font-body text-sm text-muted-foreground ml-1">/ pers.</span>
                          </p>
                          <p className="font-body text-xs text-muted-foreground mt-1">Total: {offerData.total} €</p>
                          {pack === p && <Check className={cn("h-4 w-4 mt-2", p === "vip" ? "text-gold" : "text-ocean")} />}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 max-w-lg">
                    {durations.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => setDuration(d.value)}
                        className={cn(
                          "rounded-xl p-5 text-left transition-all duration-300 border-2",
                          duration === d.value
                            ? "border-ocean bg-ocean/5 shadow-card-hover"
                            : "border-border bg-card hover:border-ocean/40 shadow-card"
                        )}
                      >
                        <p className="font-display text-lg font-bold text-foreground">{d.label}</p>
                        <p className="font-body text-xs text-muted-foreground">{d.desc}</p>
                        {selectedBoat && (
                          <p className="font-display text-xl font-bold text-ocean mt-2">
                            {selectedBoat.prices[d.value as keyof typeof selectedBoat.prices]} €
                          </p>
                        )}
                        {duration === d.value && <Check className="h-4 w-4 text-ocean mt-2" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Date */}
            {(duration || pack) && (
              <div>
                <h2 className="flex items-center gap-2 font-display text-xl font-bold text-foreground mb-4">
                  <span className="w-8 h-8 rounded-full bg-ocean text-ocean-foreground flex items-center justify-center text-sm font-body font-bold">3</span>
                  Fecha
                </h2>
                <div className="bg-card rounded-xl border border-border shadow-card p-4 inline-block">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date()}
                    locale={es}
                    className={cn("p-3 pointer-events-auto font-body")}
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-base font-semibold font-display",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse",
                      head_row: "flex",
                      head_cell: "text-muted-foreground rounded-md w-11 font-medium text-xs uppercase",
                      row: "flex w-full mt-1",
                      cell: "h-11 w-11 text-center text-sm p-0 relative rounded-lg",
                      day: "h-11 w-11 p-0 font-medium rounded-lg hover:bg-ocean/10 hover:text-ocean transition-colors aria-selected:opacity-100 inline-flex items-center justify-center",
                      day_range_end: "day-range-end",
                      day_selected: "bg-ocean text-ocean-foreground hover:bg-ocean hover:text-ocean-foreground focus:bg-ocean focus:text-ocean-foreground rounded-lg font-bold",
                      day_today: "bg-gold/15 text-gold font-bold",
                      day_outside: "day-outside text-muted-foreground opacity-30",
                      day_disabled: "text-muted-foreground opacity-30",
                      day_hidden: "invisible",
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right: Summary Sidebar */}
          <div className="lg:sticky lg:top-8 self-start">
            <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
              {/* Boat preview */}
              {selectedBoat && (
                <div className="relative aspect-[16/9]">
                  <img src={selectedBoat.image} alt={selectedBoat.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <p className="font-display text-lg font-bold text-foreground">🚤 {selectedBoat.name}</p>
                  </div>
                </div>
              )}

              <div className="p-6 space-y-4">
                <h3 className="font-display text-lg font-bold text-foreground">Resumen de reserva</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-muted-foreground">Embarcación</span>
                    <span className="font-body text-sm font-semibold text-foreground">{selectedBoat?.name || "—"}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-muted-foreground">{isOffer ? "Oferta" : "Duración"}</span>
                    <span className="font-body text-sm font-semibold text-foreground">
                      {isOffer
                        ? (pack === "vip" ? "VIP (6h)" : "Básica (4h)")
                        : (duration ? durations.find((d) => d.value === duration)?.label : "—")}
                    </span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-muted-foreground">Fecha</span>
                    <span className="font-body text-sm font-semibold text-foreground">
                      {date ? format(date, "EEEE d MMM", { locale: es }) : "—"}
                    </span>
                  </div>
                </div>

                {finalPrice && (
                  <>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between items-end">
                      <span className="font-body font-bold text-foreground">Total</span>
                      <div className="text-right">
                        <span className="font-display text-3xl font-bold text-ocean">{finalPrice} €</span>
                        {selectedOffer && (
                          <p className="font-body text-xs text-muted-foreground">
                            {selectedOffer.perPerson} € / persona
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <Button
                  onClick={handleSubmit}
                  disabled={!date || !boat || (!duration && !pack)}
                  size="lg"
                  className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold text-lg py-6 disabled:opacity-40"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  {finalPrice ? `Reservar y Pagar ${finalPrice} €` : "Solicitar Reserva"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
