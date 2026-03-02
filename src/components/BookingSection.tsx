import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Ship, Clock, CreditCard } from "lucide-react";
import { toast } from "sonner";

const boats = [
  {
    value: "barracuda-595",
    name: "OKIBOATS Barracuda 595",
    prices: { "4h": 200, "8h": 310 },
  },
  {
    value: "nireus-620",
    name: "Nireus 620 CL",
    prices: { "4h": 270, "8h": 470 },
  },
  {
    value: "astilux-600",
    name: "Astilux AX 600 Open",
    prices: { "4h": 225, "8h": 340 },
  },
];

const durations = [
  { value: "4h", label: "4 horas" },
  { value: "8h", label: "8 horas (día completo)" },
];

const BookingSection = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [boat, setBoat] = useState("");
  const [duration, setDuration] = useState("");

  const selectedBoat = useMemo(() => boats.find((b) => b.value === boat), [boat]);
  const price = useMemo(() => {
    if (!selectedBoat || !duration) return null;
    return selectedBoat.prices[duration as keyof typeof selectedBoat.prices];
  }, [selectedBoat, duration]);

  const handleSubmit = () => {
    if (!date || !boat || !duration) {
      toast.error("Por favor, completa todos los campos para reservar.");
      return;
    }
    toast.success("¡Solicitud de reserva enviada! Te contactaremos en breve para confirmar el pago.");
  };

  return (
    <section id="booking" className="py-20 lg:py-28 bg-sand">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-body font-semibold text-ocean tracking-[0.2em] uppercase text-sm mb-3">
            Reserva Online
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground">
            Reserva tu Experiencia
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto">
            Selecciona embarcación, duración y fecha. Temporada Alta.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
          {boats.map((b) => (
            <button
              key={b.value}
              onClick={() => setBoat(b.value)}
              className={`rounded-lg p-5 text-left transition-all duration-300 border-2 ${
                boat === b.value
                  ? "border-ocean bg-ocean/5 shadow-card-hover"
                  : "border-border bg-card hover:border-ocean/40 shadow-card"
              }`}
            >
              <p className="font-display text-base font-bold text-foreground mb-3">
                🚤 {b.name}
              </p>
              <div className="space-y-1">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">4 horas</span>
                  <span className="font-bold text-foreground">{b.prices["4h"]} €</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">8 horas</span>
                  <span className="font-bold text-foreground">{b.prices["8h"]} €</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-card p-6 lg:p-10">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Selectors */}
            <div className="space-y-6">
              {/* Boat Select */}
              <div>
                <label className="flex items-center gap-2 font-body font-semibold text-foreground text-sm mb-2">
                  <Ship className="h-4 w-4 text-ocean" />
                  Embarcación
                </label>
                <Select value={boat} onValueChange={setBoat}>
                  <SelectTrigger className="font-body">
                    <SelectValue placeholder="Selecciona una embarcación" />
                  </SelectTrigger>
                  <SelectContent>
                    {boats.map((b) => (
                      <SelectItem key={b.value} value={b.value} className="font-body">
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration Select */}
              <div>
                <label className="flex items-center gap-2 font-body font-semibold text-foreground text-sm mb-2">
                  <Clock className="h-4 w-4 text-ocean" />
                  Duración
                </label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="font-body">
                    <SelectValue placeholder="Selecciona duración" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((d) => (
                      <SelectItem key={d.value} value={d.value} className="font-body">
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Summary */}
              <div className="bg-ocean-light rounded-lg p-4 space-y-1">
                <p className="font-body text-sm text-foreground font-semibold mb-2">Resumen de reserva</p>
                <p className="font-body text-sm text-muted-foreground">
                  {selectedBoat ? `🚤 ${selectedBoat.name}` : "Selecciona embarcación"}
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  {duration ? durations.find((d) => d.value === duration)?.label : "Selecciona duración"}
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  {date
                    ? date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })
                    : "Selecciona fecha"}
                </p>
                {price && (
                  <div className="pt-2 mt-2 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="font-body font-semibold text-foreground">Total</span>
                      <span className="font-display text-2xl font-bold text-ocean">{price} €</span>
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={handleSubmit}
                size="lg"
                className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold text-lg py-6"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                {price ? `Reservar y Pagar ${price} €` : "Solicitar Reserva"}
              </Button>
            </div>

            {/* Right: Calendar */}
            <div>
              <label className="flex items-center gap-2 font-body font-semibold text-foreground text-sm mb-2">
                <CalendarDays className="h-4 w-4 text-ocean" />
                Fecha
              </label>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date()}
                  className="rounded-lg border font-body"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
