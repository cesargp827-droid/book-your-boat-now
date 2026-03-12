import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Check,
  Clock,
  CreditCard,
  Droplets,
  ShieldCheck,
  Speaker,
  Users,
  Volume2,
} from "lucide-react";
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

const offerPacks = [
  {
    boatValue: "barracuda-595",
    basic: { label: "Básica · 3h + 1h GRATIS", perPerson: 27, total: 190, duration: "4h (+1h gratis)" },
    vip: { label: "VIP · 4h + 2h GRATIS + Extras", perPerson: 35, total: 245, vipExtra: 55, baseDuration: "4h", duration: "4h (+2h gratis)" },
  },
  {
    boatValue: "nireus-620",
    basic: { label: "Básica · 3h + 1h GRATIS", perPerson: 24, total: 240, duration: "4h (+1h gratis)" },
    vip: { label: "VIP · 4h + 2h GRATIS + Extras", perPerson: 32, total: 320, vipExtra: 50, baseDuration: "4h", duration: "4h (+2h gratis)" },
  },
  {
    boatValue: "astilux-600",
    basic: { label: "Básica · 3h + 1h GRATIS", perPerson: 30, total: 210, duration: "4h (+1h gratis)" },
    vip: { label: "VIP · 4h + 2h GRATIS + Extras", perPerson: 40, total: 280, vipExtra: 70, baseDuration: "4h", duration: "4h (+2h gratis)" },
  },
];

const timeSlots4h = [
  { value: "09:00-13:00", label: "09:00-13:00" },
  { value: "14:00-18:00", label: "14:00-18:00" },
];

const timeSlots8h = [
  { value: "09:00-17:00", label: "09:00-17:00" },
  { value: "10:00-18:00", label: "10:00-18:00" },
];

const steps = [
  { num: 1, label: "Fecha" },
  { num: 2, label: "Hora" },
  { num: 3, label: "Datos" },
  { num: 4, label: "Pago" },
];

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const preselectedBoat = searchParams.get("boat") || "";
  const preselectedPack = searchParams.get("pack") || "";
  const isOffer = !!preselectedPack;

  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>();
  const [boat] = useState(preselectedBoat);
  const [pack, setPack] = useState(preselectedPack);
  const [duration, setDuration] = useState(isOffer ? "4h" : "");
  const [timeSlot, setTimeSlot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState("2");
  const [addSkipper, setAddSkipper] = useState(false);

  const selectedBoat = useMemo(() => boats.find((b) => b.value === boat), [boat]);
  const offerBoat = useMemo(() => offerPacks.find((o) => o.boatValue === boat), [boat]);
  const selectedOffer = useMemo(() => {
    if (!pack || !offerBoat) return null;
    return pack === "vip" ? offerBoat.vip : offerBoat.basic;
  }, [pack, offerBoat]);

  const basePrice = useMemo(() => {
    if (selectedOffer) {
      return pack === "vip"
        ? selectedOffer.total - (selectedOffer as any).vipExtra
        : selectedOffer.total;
    }
    if (!selectedBoat || !duration) return null;
    return selectedBoat.prices[duration as keyof typeof selectedBoat.prices];
  }, [selectedBoat, duration, selectedOffer, pack]);

  const vipExtra = pack === "vip" && selectedOffer ? (selectedOffer as any).vipExtra : 0;
  const skipperCost = addSkipper ? 100 : 0;
  const finalPrice = (basePrice || 0) + vipExtra + skipperCost;

  const currentTimeSlots = duration === "8h" ? timeSlots8h : timeSlots4h;

  const canGoNext = () => {
    if (step === 1) return !!date;
    if (step === 2) return !!duration && !!timeSlot;
    if (step === 3) return !!name && !!email && !!phone && !!people;
    return true;
  };

  const goNext = () => {
    if (!canGoNext()) return;
    setStep((s) => Math.min(s + 1, 4));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    toast.success("¡Solicitud de reserva enviada! Te contactaremos en breve para confirmar el pago.");
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Top bar */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-body text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a la flota
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Left: Steps */}
          <div>
            {/* Stepper */}
            <div className="bg-card rounded-2xl border border-border shadow-card p-8 lg:p-10">
              <div className="flex items-center justify-between mb-10 max-w-lg mx-auto">
                {steps.map((s, i) => (
                  <div key={s.num} className="flex items-center flex-1 last:flex-0">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center font-body font-bold text-sm transition-all",
                          step > s.num
                            ? "bg-primary text-primary-foreground"
                            : step === s.num
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {step > s.num ? <Check className="h-4 w-4" /> : s.num}
                      </div>
                      <span
                        className={cn(
                          "font-body text-xs mt-2 font-medium",
                          step === s.num ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={cn(
                          "flex-1 h-0.5 mx-3 mt-[-20px]",
                          step > s.num ? "bg-primary" : "bg-border"
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Fecha */}
              {step === 1 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Selecciona la fecha
                  </h2>
                  <div className="flex justify-center">
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
                        day: "h-11 w-11 p-0 font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors aria-selected:opacity-100 inline-flex items-center justify-center",
                        day_range_end: "day-range-end",
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-lg font-bold",
                        day_today: "bg-gold/15 text-gold font-bold",
                        day_outside: "day-outside text-muted-foreground opacity-30",
                        day_disabled: "text-muted-foreground opacity-30",
                        day_hidden: "invisible",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Hora */}
              {step === 2 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Selecciona el horario
                    </h2>
                    <button
                      onClick={goBack}
                      className="font-body text-sm text-primary hover:underline"
                    >
                      Cambiar fecha
                    </button>
                  </div>

                  {!isOffer && (
                    <>
                      <p className="font-body text-sm font-semibold text-foreground mb-3">Duración:</p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {[
                          { value: "4h", label: "4 horas (+1h gratis)" },
                          { value: "8h", label: "8 horas (Día completo)" },
                        ].map((d) => (
                          <button
                            key={d.value}
                            onClick={() => { setDuration(d.value); setTimeSlot(""); }}
                            className={cn(
                              "rounded-xl px-5 py-4 font-body text-sm font-semibold transition-all border-2 text-center",
                              duration === d.value
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-card text-foreground border-border hover:border-primary/40"
                            )}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {(duration || isOffer) && (
                    <div className="grid grid-cols-2 gap-4">
                      {currentTimeSlots.map((slot) => (
                        <button
                          key={slot.value}
                          onClick={() => setTimeSlot(slot.value)}
                          className={cn(
                            "rounded-xl p-5 text-left transition-all border-2",
                            timeSlot === slot.value
                              ? "border-primary bg-primary/5"
                              : "border-border bg-card hover:border-primary/40"
                          )}
                        >
                          <p className="font-body text-sm font-semibold text-primary flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {slot.label}
                          </p>
                          {selectedBoat && !isOffer && duration && (
                            <p className="font-body text-xs text-muted-foreground mt-1">
                              {selectedBoat.prices[duration as keyof typeof selectedBoat.prices]}€
                            </p>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Datos */}
              {step === 3 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Tus datos
                    </h2>
                    <button
                      onClick={() => setStep(2)}
                      className="font-body text-sm text-primary hover:underline"
                    >
                      Cambiar horario
                    </button>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <Label className="font-body text-sm font-semibold text-primary">
                        Nombre completo <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        className="mt-2 font-body"
                      />
                    </div>
                    <div>
                      <Label className="font-body text-sm font-semibold text-primary">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="mt-2 font-body"
                      />
                    </div>
                    <div>
                      <Label className="font-body text-sm font-semibold text-primary">
                        Teléfono <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+34 600 000 000"
                        className="mt-2 font-body"
                      />
                    </div>
                    <div>
                      <Label className="font-body text-sm font-semibold text-primary">
                        Número de personas
                      </Label>
                      <Select value={people} onValueChange={setPeople}>
                        <SelectTrigger className="mt-2 font-body">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: selectedBoat?.capacity || 10 }, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              {i + 1} {i === 0 ? "persona" : "personas"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-secondary rounded-xl p-5 flex items-start gap-3 border border-border">
                      <Checkbox
                        id="skipper"
                        checked={addSkipper}
                        onCheckedChange={(v) => setAddSkipper(v === true)}
                        className="mt-0.5"
                      />
                      <label htmlFor="skipper" className="cursor-pointer">
                        <p className="font-body text-sm font-semibold text-foreground">
                          Añadir patrón (+100€)
                        </p>
                        <p className="font-body text-xs text-muted-foreground">
                          Un profesional conduce mientras tú disfrutas
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Pago */}
              {step === 4 && (
                <div className="text-center py-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Confirmar y Pagar
                  </h2>
                  <p className="font-body text-muted-foreground mb-8 max-w-md mx-auto">
                    Revisa el resumen de tu reserva y pulsa el botón para completar el pago de forma segura.
                  </p>
                  <Button
                    onClick={handleSubmit}
                    size="lg"
                    className="bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold text-lg px-12 py-6 rounded-xl"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Continuar al pago — {finalPrice} €
                  </Button>
                </div>
              )}

              {/* Navigation buttons */}
              {step < 4 && (
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
                  {step > 1 ? (
                    <Button variant="ghost" onClick={goBack} className="font-body">
                      <ArrowLeft className="h-4 w-4 mr-2" /> Atrás
                    </Button>
                  ) : (
                    <div />
                  )}
                  {step === 3 ? (
                    <Button
                      onClick={goNext}
                      disabled={!canGoNext()}
                      size="lg"
                      className="bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold px-8 py-5 rounded-xl disabled:opacity-40"
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Continuar al pago
                    </Button>
                  ) : (
                    <Button
                      onClick={goNext}
                      disabled={!canGoNext()}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold px-8 rounded-xl disabled:opacity-40"
                    >
                      Siguiente
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Summary Sidebar */}
          <div className="lg:sticky lg:top-8 self-start">
            <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-5">
                  Resumen de reserva
                </h3>

                {/* Boat info */}
                {selectedBoat && (
                  <div className="flex gap-4 mb-5">
                    <img
                      src={selectedBoat.image}
                      alt={selectedBoat.name}
                      className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div>
                      <p className="font-display text-sm font-bold text-foreground">
                        {selectedBoat.name}
                      </p>
                      <p className="font-body text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Users className="h-3 w-3" /> Hasta {selectedBoat.capacity} pers.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center gap-1 bg-primary/8 text-primary font-body text-[10px] font-semibold px-2 py-1 rounded-md">
                          <Droplets className="h-3 w-3" /> Ducha agua dulce
                        </span>
                        <span className="inline-flex items-center gap-1 bg-primary/8 text-primary font-body text-[10px] font-semibold px-2 py-1 rounded-md">
                          <Volume2 className="h-3 w-3" /> Altavoces Bluetooth HQ
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pack toggle */}
                {isOffer && offerBoat && (
                  <div className="mb-5">
                    <p className="font-body text-sm font-semibold text-foreground mb-2">
                      Pack seleccionado:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPack("basic")}
                        className={cn(
                          "rounded-lg py-2.5 font-body text-sm font-semibold transition-all",
                          pack === "basic"
                            ? "bg-muted text-foreground"
                            : "bg-card text-muted-foreground border border-border"
                        )}
                      >
                        Básico
                      </button>
                      <button
                        onClick={() => setPack("vip")}
                        className={cn(
                          "rounded-lg py-2.5 font-body text-sm font-bold transition-all",
                          pack === "vip"
                            ? "bg-gold text-gold-foreground"
                            : "bg-card text-muted-foreground border border-border"
                        )}
                      >
                        VIP
                      </button>
                    </div>
                  </div>
                )}

                {/* Details */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-body text-muted-foreground">Fecha</span>
                    <span className="font-body font-semibold text-primary">
                      {date ? format(date, "d MMM yyyy", { locale: es }) : "—"}
                    </span>
                  </div>
                  {timeSlot && (
                    <div className="flex justify-between">
                      <span className="font-body text-muted-foreground">Horario</span>
                      <span className="font-body font-semibold text-primary">{timeSlot}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-body text-muted-foreground">Duración</span>
                    <span className="font-body font-semibold text-primary">
                      {selectedOffer ? selectedOffer.duration : duration || "—"}
                    </span>
                  </div>
                </div>

                {/* Price breakdown */}
                {basePrice !== null && basePrice > 0 && (
                  <div className="mt-5 pt-4 border-t border-border space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-body text-muted-foreground">
                        Alquiler {duration || "4h"}
                      </span>
                      <span className="font-body font-semibold text-foreground">{basePrice}€</span>
                    </div>
                    {pack === "vip" && vipExtra > 0 && (
                      <div className="flex justify-between">
                        <span className="font-body text-muted-foreground">Pack VIP</span>
                        <span className="font-body font-semibold text-foreground">+{vipExtra}€</span>
                      </div>
                    )}
                    {addSkipper && (
                      <div className="flex justify-between">
                        <span className="font-body text-muted-foreground">Patrón</span>
                        <span className="font-body font-semibold text-foreground">+100€</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Total */}
                {finalPrice > 0 && (
                  <div className="mt-4 bg-gold/10 rounded-xl p-4 flex items-end justify-between">
                    <span className="font-body font-bold text-primary text-sm">Total</span>
                    <div className="text-right">
                      <span className="font-display text-3xl font-bold text-foreground">
                        {finalPrice}€
                      </span>
                      {parseInt(people) > 1 && (
                        <p className="font-body text-xs text-muted-foreground">
                          {Math.round(finalPrice / parseInt(people))}€ por persona
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Fianza */}
                <div className="mt-4 bg-gold/8 rounded-xl p-4 border border-gold/15">
                  <p className="font-body text-sm font-bold text-primary">Fianza: 400€</p>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">
                    Se abona el día del servicio en el puerto.
                  </p>
                </div>

                {/* Garantía */}
                <div className="mt-4 flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    <strong>Garantía Riesgo Cero:</strong> si hace mal tiempo,
                    reprogramamos o devolvemos el 100%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
