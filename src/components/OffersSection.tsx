import { Clock, Gift, ShieldCheck, Sparkles, Users, PartyPopper, Droplets, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import barracudaImg from "@/assets/barracuda-545.jpg";
import nireusImg from "@/assets/nireus-620.jpg";
import astiluxImg from "@/assets/astilux-600.jpg";

const offers = [
  {
    boat: "Okyboats Barracuda 545",
    boatValue: "barracuda-595",
    image: barracudaImg,
    capacity: 7,
    basic: { hours: "3h + 1h GRATIS", perPerson: 27, total: 190 },
    vip: { hours: "4h + 2h GRATIS + Extras", perPerson: 35, total: 245 },
  },
  {
    boat: "Nireus 620 CL",
    boatValue: "nireus-620",
    image: nireusImg,
    capacity: 10,
    highlight: true,
    basic: { hours: "3h + 1h GRATIS", perPerson: 24, total: 240 },
    vip: { hours: "4h + 2h GRATIS + Extras", perPerson: 32, total: 320 },
  },
  {
    boat: "Astilux AX 600 Open",
    boatValue: "astilux-600",
    image: astiluxImg,
    capacity: 7,
    basic: { hours: "3h + 1h GRATIS", perPerson: 30, total: 210 },
    vip: { hours: "4h + 2h GRATIS + Extras", perPerson: 40, total: 280 },
  },
];

const vipExtras = [
  { icon: Clock, title: "2 Horas extra", desc: "Valoradas en más de 100 €", saving: "100 €" },
  { icon: Droplets, title: "Mini-bar Premium", desc: "Bebidas frías y snacks al subir", saving: "20 €" },
  { icon: PartyPopper, title: "Donut Acuático", desc: "Adrenalina pura para tu grupo", saving: "25 €" },
  { icon: Sparkles, title: "Clase personalizada", desc: "20 min de instrucción gratis", saving: "GRATIS" },
];

const OffersSection = () => {
  const navigate = useNavigate();

  const goToBooking = (boatValue: string, pack: string) => {
    navigate(`/reservar?boat=${boatValue}&pack=${pack}`);
  };

  return (
    <section id="offers" className="py-24 lg:py-32 bg-navy text-navy-foreground relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/20 font-body font-semibold text-gold text-xs tracking-widest uppercase px-5 py-2.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Oferta Especial Marzo
          </div>
          <h2 className="font-display text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
            Ofertas Exclusivas
          </h2>
          <p className="font-body text-navy-foreground/50 mt-5 max-w-lg mx-auto text-lg leading-relaxed">
            Precios por persona que hacen la navegación accesible para todos.
          </p>
        </div>

        {/* Offer Cards */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-24">
          {offers.map((o) => (
            <div
              key={o.boat}
              className={`group rounded-2xl overflow-hidden flex flex-col transition-all duration-500 ${
                o.highlight
                  ? "ring-1 ring-gold/40 shadow-[0_0_60px_-15px_hsl(38_80%_55%/0.2)]"
                  : "ring-1 ring-navy-foreground/8 hover:ring-navy-foreground/20"
              } bg-[hsl(210_45%_12%)]`}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={o.image}
                  alt={o.boat}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210_45%_12%)] via-[hsl(210_45%_12%/0.2)] to-transparent" />
                {o.highlight && (
                  <div className="absolute top-4 left-4 bg-gold text-gold-foreground font-body text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
                    Más Popular
                  </div>
                )}
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="font-display text-xl font-bold tracking-tight">{o.boat}</h3>
                  <p className="font-body text-xs text-navy-foreground/50 flex items-center gap-1.5 mt-1">
                    <Users className="h-3 w-3" /> Hasta {o.capacity} personas
                  </p>
                </div>
              </div>

              {/* Pricing tiers */}
              <div className="flex flex-col flex-1">
                {/* Basic */}
                <div className="px-5 py-5 border-b border-navy-foreground/6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-ocean" />
                      <span className="font-body text-[11px] uppercase tracking-[0.15em] text-ocean font-bold">Básica</span>
                    </div>
                    <span className="font-body text-[11px] text-navy-foreground/30">{o.basic.hours}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-2xl font-bold">{o.basic.perPerson}</span>
                      <span className="font-body text-sm text-navy-foreground/40">€/pers.</span>
                    </div>
                    <button
                      onClick={() => goToBooking(o.boatValue, "basic")}
                      className="font-body text-xs text-ocean hover:text-ocean-foreground hover:bg-ocean px-3 py-1.5 rounded-md border border-ocean/30 transition-all flex items-center gap-1"
                    >
                      Reservar <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* VIP */}
                <div className="px-5 py-5 bg-gold/[0.04] flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Gift className="h-3.5 w-3.5 text-gold" />
                      <span className="font-body text-[11px] uppercase tracking-[0.15em] text-gold font-bold">VIP</span>
                    </div>
                    <span className="bg-gold/15 text-gold font-body text-[10px] font-semibold px-2 py-0.5 rounded">
                      RECOMENDADA
                    </span>
                  </div>
                  <p className="font-body text-[11px] text-navy-foreground/35 mb-3">
                    {o.vip.hours} · Donut, mini-bar, 6h navegación
                  </p>
                  <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-2xl font-bold text-gold">{o.vip.perPerson}</span>
                      <span className="font-body text-sm text-navy-foreground/40">€/pers.</span>
                    </div>
                    <button
                      onClick={() => goToBooking(o.boatValue, "vip")}
                      className="font-body text-xs text-gold-foreground bg-gold hover:bg-gold/90 px-3 py-1.5 rounded-md transition-all flex items-center gap-1 font-semibold"
                    >
                      Reservar <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VIP Breakdown */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h3 className="font-display text-2xl lg:text-4xl font-bold tracking-tight">
              ¿Qué incluye la Oferta <span className="text-gold">VIP</span>?
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {vipExtras.map((extra) => (
              <div
                key={extra.title}
                className="bg-[hsl(210_45%_12%)] rounded-xl p-6 text-center border border-navy-foreground/6 hover:border-navy-foreground/15 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gold/8 flex items-center justify-center">
                  <extra.icon className="h-6 w-6 text-gold" />
                </div>
                <p className="font-body font-semibold text-sm mb-1">{extra.title}</p>
                <p className="font-body text-xs text-navy-foreground/40 mb-3 leading-relaxed">{extra.desc}</p>
                <span className="inline-block bg-gold/10 text-gold font-body font-bold text-xs px-3 py-1 rounded-md">
                  Ahorras {extra.saving}
                </span>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-12 border border-gold/15 rounded-2xl p-8 lg:p-10 text-center bg-gold/[0.03]">
            <p className="font-body text-navy-foreground/50 mb-1 text-sm">
              Si contratases todo por separado, pagarías más de <strong className="text-navy-foreground">400 €</strong>
            </p>
            <p className="font-display text-lg lg:text-xl font-semibold text-navy-foreground/80 mb-4">
              Pack de marzo para 10 personas en la Nireus 620
            </p>
            <p className="font-display text-5xl lg:text-6xl font-bold text-gold tracking-tight">
              32 €<span className="text-2xl text-navy-foreground/50 ml-2">/ persona</span>
            </p>
            <p className="font-body text-navy-foreground/40 mt-3 text-sm">
              Más de <strong className="text-gold">80 € de ahorro</strong> en extras y tiempo
            </p>
          </div>
        </div>

        {/* Guarantee */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-[hsl(210_45%_12%)] border border-ocean/15 rounded-2xl p-8 flex flex-col md:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-xl bg-ocean/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-7 w-7 text-ocean" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold mb-2">
                Garantía Climática — Riesgo Cero
              </h4>
              <p className="font-body text-navy-foreground/50 leading-relaxed text-sm">
                Si el día de tu reserva el tiempo no acompaña,{" "}
                <strong className="text-navy-foreground">
                  reprogramamos tu salida o te devolvemos el dinero sin preguntas.
                </strong>
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-body text-xs text-gold/70 font-semibold uppercase tracking-[0.2em] mb-5">
            Plazas limitadas · 3 reservas por día
          </p>
          <Button
            onClick={() => navigate("/reservar?boat=nireus-620&pack=vip")}
            size="lg"
            className="bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold text-base px-10 py-6 rounded-xl"
          >
            Reservar Ahora — Desde 24 €/persona
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <p className="font-body text-[11px] text-navy-foreground/30 mt-4">
            Oferta válida en marzo. Plazas limitadas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
