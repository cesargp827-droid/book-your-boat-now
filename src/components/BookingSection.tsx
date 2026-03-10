import { useState, useMemo } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays, Ship, Clock, CreditCard, Check, ChevronRight } from "lucide-react";
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
    prices: { "4h": 200, "8h": 310 },
  },
  {
    value: "nireus-620",
    name: "Nireus 620 CL",
    image: nireusImg,
    prices: { "4h": 270, "8h": 470 },
  },
  {
    value: "astilux-600",
    name: "Astilux AX 600 Open",
    image: astiluxImg,
    prices: { "4h": 225, "8h": 340 },
  },
];

const durations = [
  { value: "4h", label: "4 horas", desc: "Media jornada" },
  { value: "8h", label: "8 horas", desc: "Día completo" },
];

const BookingSection = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [boat, setBoat] = useState("");
  const [duration, setDuration] = useState("");
  const [step, setStep] = useState(1);

  const selectedBoat = useMemo(() => boats.find((b) => b.value === boat), [boat]);
  const price = useMemo(() => {
    if (!selectedBoat || !duration) return null;
    return selectedBoat.prices[duration as keyof typeof selectedBoat.prices];
  }, [selectedBoat, duration]);

  const handleBoatSelect = (value: string) => {
    setBoat(value);
    if (step === 1) setStep(2);
  };

  const handleDurationSelect = (value: string) => {
    setDuration(value);
    if (step === 2) setStep(3);
  };

  const handleDateSelect = (d: Date | undefined) => {
    setDate(d);
    if (d && step === 3) setStep(4);
  };

  const handleSubmit = () => {
    if (!date || !boat || !duration) {
      toast.error("Por favor, completa todos los campos para reservar.");
      return;
    }
    toast.success("¡Solicitud de reserva enviada! Te contactaremos en breve para confirmar el pago.");
  };

  const isStepComplete = (s: number) => {
    if (s === 1) return !!boat;
    if (s === 2) return !!duration;
    if (s === 3) return !!date;
    return false;
  };

  return (
    <section id="booking" className="py-20 lg:py-28 bg-sand">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-body font-semibold text-ocean tracking-[0.2em] uppercase text-sm mb-3">
            Alquiler Temporada Alta
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground">
            Reserva tu Experiencia
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto">
            3 pasos simples: elige embarcación, duración y fecha.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-10 max-w-md mx-auto">
          {[
            { num: 1, label: "Barco" },
            { num: 2, label: "Duración" },
            { num: 3, label: "Fecha" },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              <button
                onClick={() => setStep(s.num)}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center font-body font-bold text-sm transition-all",
                  step === s.num
                    ? "bg-ocean text-ocean-foreground scale-110"
                    : isStepComplete(s.num)
                    ? "bg-ocean/20 text-ocean"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isStepComplete(s.num) ? <Check className="h-4 w-4" /> : s.num}
              </button>
              <span className={cn(
                "font-body text-sm hidden sm:inline",
                step === s.num ? "text-foreground font-semibold" : "text-muted-foreground"
              )}>
                {s.label}
              </span>
              {i < 2 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />}
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Step 1: Boat Selection as visual cards */}
          <div className={cn("mb-8", step !== 1 && boat && "mb-4")}>
            <label className="flex items-center gap-2 font-body font-semibold text-foreground text-sm mb-4">
              <Ship className="h-4 w-4 text-ocean" />
              1. Elige tu embarcación
            </label>
            {step === 1 || !boat ? (
              <div className="grid sm:grid-cols-3 gap-4">
                {boats.map((b) => (
                  <button
                    key={b.value}
                    onClick={() => handleBoatSelect(b.value)}
                    className={cn(
                      "rounded-xl overflow-hidden text-left transition-all duration-300 border-2 group",
                      boat === b.value
                        ? "border-ocean shadow-card-hover ring-2 ring-ocean/20"
                        : "border-border bg-card hover:border-ocean/40 shadow-card"
                    )}
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={b.image}
                        alt={b.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {boat === b.value && (
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-ocean text-ocean-foreground flex items-center justify-center">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 bg-card">
                      <p className="font-display text-base font-bold text-foreground mb-1">
                        {b.name}
                      </p>
                      <div className="flex gap-3 font-body text-xs text-muted-foreground">
                        <span>4h: <strong className="text-foreground">{b.prices["4h"]}€</strong></span>
                        <span>8h: <strong className="text-foreground">{b.prices["8h"]}€</strong></span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-3 bg-card rounded-xl border-2 border-ocean/20 p-3 pr-5 hover:border-ocean/40 transition-colors"
              >
                <img src={selectedBoat?.image} alt={selectedBoat?.name} className="w-16 h-12 object-cover rounded-lg" />
                <div className="text-left">
                  <p className="font-display text-sm font-bold text-foreground">{selectedBoat?.name}</p>
                  <p className="font-body text-xs text-muted-foreground">Toca para cambiar</p>
                </div>
                <Check className="h-4 w-4 text-ocean ml-auto" />
              </button>
            )}
          </div>

          {/* Step 2: Duration */}
          {(boat || step >= 2) && (
            <div className="mb-8">
              <label className="flex items-center gap-2 font-body font-semibold text-foreground text-sm mb-4">
                <Clock className="h-4 w-4 text-ocean" />
                2. Elige la duración
              </label>
              <div className="grid grid-cols-2 gap-4 max-w-md">
                {durations.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => handleDurationSelect(d.value)}
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
                    {duration === d.value && (
                      <Check className="h-4 w-4 text-ocean mt-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Date + Summary */}
          {(duration || step >= 3) && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <div>
                <label className="flex items-center gap-2 font-body font-semibold text-foreground text-sm mb-4">
                  <CalendarDays className="h-4 w-4 text-ocean" />
                  3. Selecciona la fecha
                </label>
                <div className="bg-card rounded-xl border border-border shadow-card p-4 inline-block">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    disabled={(d) => d < new Date()}
                    locale={es}
                    className={cn("p-3 pointer-events-auto font-body")}
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-base font-semibold font-display",
                      nav: "space-x-1 flex items-center",
                      nav_button: cn(
                        "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"
                      ),
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse",
                      head_row: "flex",
                      head_cell: "text-muted-foreground rounded-md w-11 font-medium text-xs uppercase",
                      row: "flex w-full mt-1",
                      cell: "h-11 w-11 text-center text-sm p-0 relative rounded-lg",
                      day: cn(
                        "h-11 w-11 p-0 font-medium rounded-lg hover:bg-ocean/10 hover:text-ocean transition-colors aria-selected:opacity-100 inline-flex items-center justify-center"
                      ),
                      day_range_end: "day-range-end",
                      day_selected:
                        "bg-ocean text-ocean-foreground hover:bg-ocean hover:text-ocean-foreground focus:bg-ocean focus:text-ocean-foreground rounded-lg font-bold",
                      day_today: "bg-gold/15 text-gold font-bold",
                      day_outside: "day-outside text-muted-foreground opacity-30",
                      day_disabled: "text-muted-foreground opacity-30",
                      day_hidden: "invisible",
                    }}
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <p className="font-body font-semibold text-foreground text-sm mb-4">Resumen de reserva</p>
                <div className="bg-card rounded-xl border border-border shadow-card p-6 space-y-4">
                  {/* Boat summary */}
                  <div className="flex items-center gap-3">
                    {selectedBoat ? (
                      <>
                        <img src={selectedBoat.image} alt={selectedBoat.name} className="w-14 h-10 object-cover rounded-lg" />
                        <div>
                          <p className="font-body text-sm font-semibold text-foreground">🚤 {selectedBoat.name}</p>
                        </div>
                        <Check className="h-4 w-4 text-ocean ml-auto" />
                      </>
                    ) : (
                      <p className="font-body text-sm text-muted-foreground">Selecciona embarcación</p>
                    )}
                  </div>

                  <div className="h-px bg-border" />

                  {/* Duration */}
                  <div className="flex justify-between items-center">
                    <p className="font-body text-sm text-muted-foreground">Duración</p>
                    <p className="font-body text-sm font-semibold text-foreground">
                      {duration ? durations.find((d) => d.value === duration)?.label : "—"}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="flex justify-between items-center">
                    <p className="font-body text-sm text-muted-foreground">Fecha</p>
                    <p className="font-body text-sm font-semibold text-foreground">
                      {date ? format(date, "EEEE d 'de' MMMM", { locale: es }) : "—"}
                    </p>
                  </div>

                  {price && (
                    <>
                      <div className="h-px bg-border" />
                      <div className="flex justify-between items-center">
                        <span className="font-body font-bold text-foreground text-lg">Total</span>
                        <span className="font-display text-3xl font-bold text-ocean">{price} €</span>
                      </div>
                    </>
                  )}

                  <Button
                    onClick={handleSubmit}
                    disabled={!date || !boat || !duration}
                    size="lg"
                    className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold text-lg py-6 mt-2 disabled:opacity-40"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    {price ? `Reservar y Pagar ${price} €` : "Solicitar Reserva"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
