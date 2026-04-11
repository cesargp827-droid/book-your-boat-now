import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Banknote,
  Check,
  Clock,
  CreditCard,
  Droplets,
  Gift,
  ShieldCheck,
  ShowerHead,
  Speaker,
  Users,
  Volume2,
  Sparkles,
  Anchor,
  Ruler,
  Zap,
  Umbrella,
  Waves,
  Sparkle,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import barracudaImg from "@/assets/barracuda-545.jpg";
import nireusImg from "@/assets/nireus-620.jpg";
import astiluxImg from "@/assets/astilux-600.jpg";

/* ─── Data ─── */
const boats = [
  {
    value: "barracuda-545",
    name: "OKIBOATS Barracuda 545",
    image: barracudaImg,
    capacity: 7,
    power: "100 CV",
    length: "5.45 m",
    prices: { "2h": 130, "4h": 210, "8h": 300 },
    pack: { perPerson: 35, totalBase: 245, duration: "6h (4h + 2h gratis)" },
  },
  {
    value: "nireus-620",
    name: "Nireus 620 CL",
    image: nireusImg,
    capacity: 10,
    power: "200 CV",
    length: "6.20 m",
    prices: { "2h": 140, "4h": 250, "8h": 470 },
    pack: { perPerson: 32, totalBase: 320, duration: "6h (4h + 2h gratis)" },
  },
  {
    value: "astilux-600",
    name: "Astilux AX 600 Open",
    image: astiluxImg,
    capacity: 7,
    power: "100 CV",
    length: "6.00 m",
    prices: { "2h": 130, "4h": 210, "8h": 300 },
    pack: { perPerson: 40, totalBase: 280, duration: "6h (4h + 2h gratis)" },
  },
];

const SKIPPER_COST = 100;
const OPEN_HOUR = 9;
const CLOSE_HOUR = 20;

const DURATION_OPTIONS_STANDARD: { value: string; label: string; hours: number }[] = [
  { value: "2h", label: "2 horas", hours: 2 },
  { value: "4h", label: "4 horas", hours: 4 },
  { value: "8h", label: "8 horas (Día completo)", hours: 8 },
];

const DURATION_VIP = { value: "6h", label: "6 horas (4h + 2h GRATIS)", hours: 6 };

function generateTimeSlots(durationHours: number): { value: string; label: string }[] {
  const slots: { value: string; label: string }[] = [];
  const lastStart = CLOSE_HOUR - durationHours;
  for (let h = OPEN_HOUR; h <= lastStart; h++) {
    const startStr = `${String(h).padStart(2, "0")}:00`;
    const endStr = `${String(h + durationHours).padStart(2, "0")}:00`;
    slots.push({ value: `${startStr}-${endStr}`, label: `${startStr} - ${endStr}` });
  }
  return slots;
}

const steps = [
  { num: 1, label: "Embarcación" },
  { num: 2, label: "Fecha y Hora" },
  { num: 3, label: "Datos" },
  { num: 4, label: "Confirmación" },
];

/* ─── Route selector page ─── */
const RouteSelector = ({ onSelect }: { onSelect: (route: "vip" | "standard") => void }) => (
  <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
    <div className="max-w-3xl w-full">
      <div className="text-center mb-12">
        <Anchor className="h-10 w-10 text-primary mx-auto mb-4" />
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3">
          ¿Qué experiencia buscas?
        </h1>
        <p className="font-body text-muted-foreground text-lg">
          Elige tu camino y te guiaremos paso a paso.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* VIP */}
        <button
          onClick={() => onSelect("vip")}
          className="group bg-card rounded-2xl border-2 border-gold/20 hover:border-gold/60 p-8 text-left transition-all duration-300 hover:shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 bg-gold text-gold-foreground font-body text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
            Oferta
          </div>
          <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
            <Sparkles className="h-7 w-7 text-gold" />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Pack VIP</h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
            6 horas de navegación con donut acuático, mini-bar y clase personalizada incluidos.
          </p>
          <ul className="space-y-2 font-body text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-gold" /> 4h + 2h GRATIS</li>
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-gold" /> Donut acuático incluido</li>
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-gold" /> Mini-bar premium</li>
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-gold" /> Clase de navegación 20 min</li>
          </ul>
          <p className="font-body text-xs text-gold font-bold mt-5">Desde 32€/persona →</p>
        </button>

        {/* Standard */}
        <button
          onClick={() => onSelect("standard")}
          className="group bg-card rounded-2xl border-2 border-border hover:border-primary/40 p-8 text-left transition-all duration-300 hover:shadow-lg"
        >
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
            <Anchor className="h-7 w-7 text-primary" />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Alquiler por Horas</h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
            Elige la duración que prefieras: 2, 4 u 8 horas. Precio fijo por barco.
          </p>
          <ul className="space-y-2 font-body text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Ducha de agua dulce</li>
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Altavoces Bluetooth HQ</li>
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Horario flexible</li>
          </ul>
          <p className="font-body text-xs text-primary font-bold mt-5">Desde 130€/barco →</p>
        </button>
      </div>

      {/* Payment info banner */}
      <div className="mt-8 bg-card rounded-2xl border border-border p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <Banknote className="h-5 w-5 text-primary" />
        </div>
        <p className="font-body text-sm font-bold text-foreground">¡Reserva ahora, paga el día del servicio!</p>
        <p className="font-body text-xs text-muted-foreground mt-1">Sin pagos hoy · Datáfono o Efectivo en puerto</p>
      </div>

      <div className="mt-6 flex justify-center">
        <a href="/" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </a>
      </div>
    </div>
  </div>
);

/* ─── Main Booking Component ─── */
const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const boatParam = searchParams.get("boat") || "";
  const packParam = searchParams.get("pack") || "";
  const durationParam = searchParams.get("duration") || "";
  const skipperParam = searchParams.get("skipper") === "1";

  const initialRoute = packParam === "vip" ? "vip" : boatParam ? "standard" : null;

  const [route, setRoute] = useState<"vip" | "standard" | null>(initialRoute);
  const [step, setStep] = useState(boatParam ? 2 : 1);
  const [selectedBoatValue, setSelectedBoatValue] = useState(boatParam);
  const [duration, setDuration] = useState(durationParam || "4h");
  const [date, setDate] = useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState("2");
  const [withSkipper, setWithSkipper] = useState(skipperParam);

  const selectedBoat = useMemo(() => boats.find((b) => b.value === selectedBoatValue), [selectedBoatValue]);

  const durationHours = useMemo(() => {
    if (route === "vip") return DURATION_VIP.hours;
    const found = DURATION_OPTIONS_STANDARD.find((d) => d.value === duration);
    return found?.hours || 4;
  }, [route, duration]);

  const timeSlots = useMemo(() => generateTimeSlots(durationHours), [durationHours]);

  const basePrice = useMemo(() => {
    if (!selectedBoat) return 0;
    if (route === "vip") return selectedBoat.pack.totalBase;
    return selectedBoat.prices[duration as keyof typeof selectedBoat.prices] || 0;
  }, [selectedBoat, route, duration]);

  const skipperCost = withSkipper ? SKIPPER_COST : 0;
  const finalPrice = basePrice + skipperCost;

  const canGoNext = useCallback(() => {
    if (step === 1) return !!selectedBoatValue;
    if (step === 2) return !!date && !!timeSlot;
    if (step === 3) return !!name && !!email && !!phone;
    return true;
  }, [step, selectedBoatValue, date, timeSlot, name, email, phone]);

  const goNext = () => { if (canGoNext()) setStep((s) => Math.min(s + 1, 4)); };
  const goBack = () => {
    if (step === 1) { setRoute(null); return; }
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = () => {
    toast.success("¡Reserva confirmada! Te contactaremos en breve con los detalles.");
  };

  const handleDurationChange = (d: string) => {
    setDuration(d);
    setTimeSlot("");
  };

  if (!route) {
    return <RouteSelector onSelect={(r) => { setRoute(r); setStep(1); setSelectedBoatValue(""); }} />;
  }

  const isVip = route === "vip";

  return (
    <div className="min-h-screen bg-secondary">
      {/* Top bar */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-body text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </button>
          <div className={cn(
            "font-body text-xs font-bold px-3 py-1.5 rounded-full",
            isVip ? "bg-gold/15 text-gold" : "bg-primary/10 text-primary"
          )}>
            {isVip ? "✨ Pack VIP" : "⚓ Alquiler por Horas"}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Left: Steps */}
          <div className="bg-card rounded-2xl border border-border shadow-card p-6 lg:p-10">
            {/* Stepper */}
            <div className="flex items-center justify-between mb-10 max-w-lg mx-auto">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-center flex-1 last:flex-0">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-body font-bold text-sm transition-all",
                      step > s.num ? "bg-primary text-primary-foreground" :
                      step === s.num ? "bg-primary text-primary-foreground" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {step > s.num ? <Check className="h-4 w-4" /> : s.num}
                    </div>
                    <span className={cn(
                      "font-body text-[10px] lg:text-xs mt-2 font-medium",
                      step === s.num ? "text-primary" : "text-muted-foreground"
                    )}>{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={cn("flex-1 h-0.5 mx-3 mt-[-20px]", step > s.num ? "bg-primary" : "bg-border")} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Boat selection */}
            {step === 1 && (
              <div>
                <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-2">
                  Elige tu embarcación
                </h2>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  {isVip ? "Todas incluyen Pack VIP completo." : "Precio fijo por barco, independientemente del número de personas."}
                </p>
                <div className="grid gap-4">
                  {boats.map((boat) => (
                    <button
                      key={boat.value}
                      onClick={() => setSelectedBoatValue(boat.value)}
                      className={cn(
                        "flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border-2 transition-all text-left relative",
                        selectedBoatValue === boat.value
                          ? isVip ? "border-gold bg-gold/5" : "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/30"
                      )}
                    >
                      <img src={boat.image} alt={boat.name} className="w-full sm:w-28 h-20 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-display text-sm font-bold text-foreground">{boat.name}</p>
                          <span className="inline-flex items-center gap-1 bg-accent/10 text-accent font-body text-[9px] font-bold px-2 py-0.5 rounded-md">
                            <ShieldCheck className="h-2.5 w-2.5" /> Riesgo Cero
                          </span>
                        </div>
                        <p className="font-body text-xs text-muted-foreground flex items-center gap-3 mt-1 flex-wrap">
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {boat.capacity} pers.</span>
                          <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> {boat.power}</span>
                          <span className="flex items-center gap-1"><Ruler className="h-3 w-3" /> {boat.length}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground font-body text-[10px] px-2 py-1 rounded-md">
                            <ShowerHead className="h-3 w-3 text-primary" /> Ducha
                          </span>
                          <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground font-body text-[10px] px-2 py-1 rounded-md">
                            <Speaker className="h-3 w-3 text-primary" /> Altavoces HQ
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {isVip ? (
                          <>
                            <p className="font-display text-lg font-bold text-gold">{boat.pack.perPerson}€</p>
                            <p className="font-body text-[10px] text-muted-foreground">/persona</p>
                          </>
                        ) : (
                          <>
                            <p className="font-display text-lg font-bold text-primary">Desde {boat.prices["2h"]}€</p>
                            <p className="font-body text-[10px] text-muted-foreground">/barco</p>
                          </>
                        )}
                      </div>
                      {selectedBoatValue === boat.value && (
                        <div className={cn(
                          "absolute top-3 right-3 sm:static w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                          isVip ? "bg-gold text-gold-foreground" : "bg-primary text-primary-foreground"
                        )}>
                          <Check className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Date, Duration & Time */}
            {step === 2 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground">Fecha y Horario</h2>
                  <button onClick={goBack} className="font-body text-sm text-primary hover:underline">Cambiar barco</button>
                </div>

                {!isVip && (
                  <div className="mb-6">
                    <p className="font-body text-sm font-semibold text-foreground mb-3">Duración:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {DURATION_OPTIONS_STANDARD.map((d) => (
                        <button
                          key={d.value}
                          onClick={() => handleDurationChange(d.value)}
                          className={cn(
                            "rounded-xl px-3 py-3 font-body text-sm font-semibold transition-all border-2 text-center",
                            duration === d.value
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card text-foreground border-border hover:border-primary/40"
                          )}
                        >
                          <Clock className="h-3.5 w-3.5 mx-auto mb-1" />
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {isVip && (
                  <div className="mb-6 bg-gold/10 rounded-xl px-5 py-3 border border-gold/20">
                    <p className="font-body text-sm font-semibold text-gold flex items-center gap-2">
                      <Clock className="h-4 w-4" /> {DURATION_VIP.label}
                    </p>
                  </div>
                )}

                <p className="font-body text-sm font-semibold text-foreground mb-3">Fecha:</p>
                <div className="flex justify-center mb-6">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => { setDate(d); setTimeSlot(""); }}
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
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-lg font-bold",
                      day_today: "bg-gold/15 text-gold font-bold",
                      day_outside: "day-outside text-muted-foreground opacity-30",
                      day_disabled: "text-muted-foreground opacity-30",
                      day_hidden: "invisible",
                    }}
                  />
                </div>

                {date && (
                  <>
                    <p className="font-body text-sm font-semibold text-foreground mb-3">
                      Franja horaria ({String(durationHours)}h) — Horario: {OPEN_HOUR}:00 a {CLOSE_HOUR}:00
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.value}
                          onClick={() => setTimeSlot(slot.value)}
                          className={cn(
                            "rounded-xl px-3 py-3 text-center transition-all border-2",
                            timeSlot === slot.value
                              ? isVip ? "border-gold bg-gold/10 text-gold" : "border-primary bg-primary/5 text-primary"
                              : "border-border bg-card hover:border-primary/30 text-foreground"
                          )}
                        >
                          <p className="font-body text-sm font-semibold flex items-center justify-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" /> {slot.label}
                          </p>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 3: Personal data */}
            {step === 3 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground">Tus datos</h2>
                  <button onClick={() => setStep(2)} className="font-body text-sm text-primary hover:underline">Cambiar horario</button>
                </div>
                <div className="space-y-5">
                  <div>
                    <Label className="font-body text-sm font-semibold text-primary">Nombre completo <span className="text-destructive">*</span></Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" className="mt-2 font-body" />
                  </div>
                  <div>
                    <Label className="font-body text-sm font-semibold text-primary">Email <span className="text-destructive">*</span></Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className="mt-2 font-body" />
                  </div>
                  <div>
                    <Label className="font-body text-sm font-semibold text-primary">Teléfono <span className="text-destructive">*</span></Label>
                    <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+34 600 000 000" className="mt-2 font-body" />
                  </div>
                  {selectedBoat && (
                    <div>
                      <Label className="font-body text-sm font-semibold text-primary">Número de personas</Label>
                      <Select value={people} onValueChange={setPeople}>
                        <SelectTrigger className="mt-2 font-body"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: selectedBoat.capacity }, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              {i + 1} {i === 0 ? "persona" : "personas"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="py-4">
                <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-6 text-center">Confirmar Reserva</h2>

                {/* Payment info */}
                <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-bold text-foreground">Sin pagos hoy</p>
                      <p className="font-body text-xs text-muted-foreground">
                        El importe total se abona el día del servicio antes de embarcar
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
                      <CreditCard className="h-3.5 w-3.5 text-primary" /> Datáfono
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
                      <Banknote className="h-3.5 w-3.5 text-primary" /> Efectivo
                    </span>
                  </div>
                </div>

                {/* Deposit info */}
                <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-bold text-foreground">Fianza: 400 €</p>
                      <p className="font-body text-xs text-muted-foreground mt-1 leading-relaxed">
                        Preautorización con datáfono el día del servicio. <strong className="text-foreground">No se cobra</strong>, solo se retiene temporalmente. Se libera automáticamente al finalizar si el barco está perfecto.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cancellation guarantee */}
                <div className="bg-gold/5 border border-gold/15 rounded-2xl p-6 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-bold text-foreground">Garantía Riesgo Cero</p>
                      <p className="font-body text-xs text-muted-foreground mt-1">
                        Cancela gratis hasta 3 días (72h) antes de tu salida. La tarjeta solo se solicita como garantía frente a cancelaciones tardías.
                      </p>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSubmit} size="lg" className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold text-lg px-12 py-6 rounded-xl">
                  Confirmar Reserva Gratuita
                </Button>
                <p className="font-body text-xs text-muted-foreground text-center mt-3">
                  No se realizará ningún cargo hoy
                </p>
              </div>
            )}

            {/* Nav buttons */}
            {step < 4 && (
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
                <Button variant="ghost" onClick={goBack} className="font-body">
                  <ArrowLeft className="h-4 w-4 mr-2" /> {step === 1 ? "Cambiar tipo" : "Atrás"}
                </Button>
                {step === 3 ? (
                  <Button onClick={goNext} disabled={!canGoNext()} size="lg" className="bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold px-8 py-5 rounded-xl disabled:opacity-40">
                    Revisar y confirmar
                  </Button>
                ) : (
                  <Button onClick={goNext} disabled={!canGoNext()} className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold px-8 rounded-xl disabled:opacity-40">
                    Siguiente
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Right: Summary Sidebar */}
          <div className="lg:sticky lg:top-8 self-start space-y-4">
            <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden p-6">
              <div className="flex items-center gap-2 mb-5">
                <h3 className="font-display text-xl font-bold text-foreground">Resumen</h3>
                <span className={cn(
                  "font-body text-[10px] font-bold px-2 py-0.5 rounded-full",
                  isVip ? "bg-gold/15 text-gold" : "bg-primary/10 text-primary"
                )}>
                  {isVip ? "VIP" : "Básico"}
                </span>
              </div>

              {/* Boat info */}
              {selectedBoat && (
                <div className="flex gap-4 mb-5">
                  <img src={selectedBoat.image} alt={selectedBoat.name} className="w-20 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <p className="font-display text-sm font-bold text-foreground">{selectedBoat.name}</p>
                    <p className="font-body text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Users className="h-3 w-3" /> {selectedBoat.capacity} pers. · <Zap className="h-3 w-3" /> {selectedBoat.power}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center gap-1 bg-primary/8 text-primary font-body text-[10px] font-semibold px-2 py-1 rounded-md">
                        <Droplets className="h-3 w-3" /> Ducha
                      </span>
                      <span className="inline-flex items-center gap-1 bg-primary/8 text-primary font-body text-[10px] font-semibold px-2 py-1 rounded-md">
                        <Volume2 className="h-3 w-3" /> Altavoces
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* VIP extras */}
              {isVip && (
                <div className="mb-5 bg-gold/5 rounded-xl p-4 border border-gold/10">
                  <p className="font-body text-xs font-bold text-gold mb-2">Incluido en tu Pack VIP:</p>
                  <ul className="space-y-1.5 font-body text-xs text-muted-foreground">
                    <li className="flex items-center gap-2"><Gift className="h-3 w-3 text-gold" /> Donut acuático</li>
                    <li className="flex items-center gap-2"><Droplets className="h-3 w-3 text-gold" /> Mini-bar premium</li>
                    <li className="flex items-center gap-2"><Sparkles className="h-3 w-3 text-gold" /> Clase de navegación 20 min</li>
                  </ul>
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
                    {isVip ? DURATION_VIP.label : DURATION_OPTIONS_STANDARD.find(d => d.value === duration)?.label || duration}
                  </span>
                </div>
              </div>

              {/* Skipper toggle */}
              <div className="flex items-center justify-between mt-5 bg-secondary rounded-xl p-3">
                <div>
                  <p className="font-body text-xs font-semibold text-foreground">Patrón profesional</p>
                  <p className="font-body text-[10px] text-muted-foreground">
                    {withSkipper ? "Incluido (+100€)" : "Sin patrón"}
                  </p>
                </div>
                <Switch checked={withSkipper} onCheckedChange={setWithSkipper} />
              </div>

              {/* Price breakdown */}
              <div className="mt-5 pt-4 border-t border-border space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-body text-muted-foreground">
                    {isVip && selectedBoat
                      ? `${selectedBoat.pack.perPerson}€ × ${selectedBoat.capacity} pers.`
                      : "Alquiler embarcación"}
                  </span>
                  <span className="font-body font-semibold text-foreground">{basePrice}€</span>
                </div>
                {withSkipper && (
                  <div className="flex justify-between">
                    <span className="font-body text-muted-foreground">Patrón profesional</span>
                    <span className="font-body font-semibold text-foreground">+{SKIPPER_COST}€</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="mt-4 bg-gold/10 rounded-xl p-4">
                <div className="flex items-end justify-between">
                  <span className="font-body font-bold text-primary text-sm">A pagar en puerto</span>
                  <div className="text-right">
                    <span className="font-display text-3xl font-bold text-foreground">{finalPrice}€</span>
                    {isVip && selectedBoat && (
                      <p className="font-body text-xs text-muted-foreground">
                        {Math.round(finalPrice / selectedBoat.capacity)}€/persona
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment today = 0 */}
              <div className="mt-3 bg-gold/5 rounded-xl p-4 border border-gold/20">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm font-bold text-gold">Pago hoy</span>
                  <span className="font-display text-2xl font-bold text-gold">0 €</span>
                </div>
              </div>

              {/* Fianza */}
              <div className="mt-3 bg-muted rounded-xl p-4">
                <p className="font-body text-xs font-bold text-foreground">Fianza: 400€</p>
                <p className="font-body text-[10px] text-muted-foreground mt-0.5">Preautorización con datáfono · Se libera al finalizar</p>
              </div>

              {/* Guarantee */}
              <div className="mt-4 flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  <strong>Garantía Riesgo Cero:</strong> Cancela gratis hasta 72h antes
                </p>
              </div>

              {/* Payment methods */}
              <div className="mt-4 flex items-center justify-center gap-4 pt-3 border-t border-border">
                <span className="inline-flex items-center gap-1.5 font-body text-[10px] text-muted-foreground">
                  <CreditCard className="h-3.5 w-3.5" /> Datáfono
                </span>
                <span className="inline-flex items-center gap-1.5 font-body text-[10px] text-muted-foreground">
                  <Banknote className="h-3.5 w-3.5" /> Efectivo
                </span>
              </div>
            </div>

            {/* What's included */}
            <div className="bg-card rounded-2xl border border-border shadow-card p-6">
              <p className="font-body text-xs font-bold text-foreground mb-3">¿Qué incluye el alquiler?</p>
              <div className="grid grid-cols-2 gap-2">
                <span className="inline-flex items-center gap-1.5 font-body text-[10px] text-muted-foreground bg-muted px-2.5 py-2 rounded-lg">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Seguro a todo riesgo
                </span>
                <span className="inline-flex items-center gap-1.5 font-body text-[10px] text-muted-foreground bg-muted px-2.5 py-2 rounded-lg">
                  <Anchor className="h-3.5 w-3.5 text-primary" /> Amarre incluido
                </span>
                <span className="inline-flex items-center gap-1.5 font-body text-[10px] text-muted-foreground bg-muted px-2.5 py-2 rounded-lg">
                  <Sparkle className="h-3.5 w-3.5 text-primary" /> Limpieza
                </span>
                <span className="inline-flex items-center gap-1.5 font-body text-[10px] text-muted-foreground bg-muted px-2.5 py-2 rounded-lg">
                  <Waves className="h-3.5 w-3.5 text-primary" /> Nevera a bordo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
