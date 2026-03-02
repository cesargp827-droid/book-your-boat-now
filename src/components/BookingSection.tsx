import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Ship, Clock } from "lucide-react";
import { toast } from "sonner";

const boats = [
  { value: "nireus-620", label: "Nireus 620 — desde 470€" },
  { value: "barracuda-545", label: "Okyboats Barracuda 545 — desde 370€" },
  { value: "astilux-600", label: "Astilux AX 600 Open — desde 370€" },
];

const timeSlots = [
  { value: "morning", label: "Mañana (9:00 - 14:00)" },
  { value: "afternoon", label: "Tarde (15:00 - 20:00)" },
  { value: "fullday", label: "Día completo (9:00 - 20:00)" },
];

const BookingSection = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [boat, setBoat] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = () => {
    if (!date || !boat || !time) {
      toast.error("Por favor, completa todos los campos para reservar.");
      return;
    }
    toast.success("¡Solicitud de reserva enviada! Te contactaremos en breve para confirmar.");
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
            Selecciona embarcación, fecha y horario. Confirmaremos tu disponibilidad al instante.
          </p>
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
                        {b.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Select */}
              <div>
                <label className="flex items-center gap-2 font-body font-semibold text-foreground text-sm mb-2">
                  <Clock className="h-4 w-4 text-ocean" />
                  Horario
                </label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="font-body">
                    <SelectValue placeholder="Selecciona horario" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((t) => (
                      <SelectItem key={t.value} value={t.value} className="font-body">
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Summary */}
              <div className="bg-ocean-light rounded-lg p-4">
                <p className="font-body text-sm text-foreground font-semibold mb-1">Resumen</p>
                <p className="font-body text-sm text-muted-foreground">
                  {boat ? boats.find((b) => b.value === boat)?.label : "Selecciona embarcación"}
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  {date ? date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" }) : "Selecciona fecha"}
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  {time ? timeSlots.find((t) => t.value === time)?.label : "Selecciona horario"}
                </p>
              </div>

              <Button
                onClick={handleSubmit}
                size="lg"
                className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold text-lg py-6"
              >
                Solicitar Reserva
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
