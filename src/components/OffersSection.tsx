import { Clock, Gift, ShieldCheck, Sparkles, Users, Droplets, ArrowRight } from "lucide-react";
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
    vip: { hours: "4h + 2h GRATIS + Extras", perPerson: 35, total: 245, fullPrice: 400 },
  },
  {
    boat: "Nireus 620 CL",
    boatValue: "nireus-620",
    image: nireusImg,
    capacity: 10,
    highlight: true,
    basic: { hours: "3h + 1h GRATIS", perPerson: 24, total: 240 },
    vip: { hours: "4h + 2h GRATIS + Extras", perPerson: 32, total: 320, fullPrice: 400 },
  },
  {
    boat: "Astilux AX 600 Open",
    boatValue: "astilux-600",
    image: astiluxImg,
    capacity: 7,
    basic: { hours: "3h + 1h GRATIS", perPerson: 30, total: 210 },
    vip: { hours: "4h + 2h GRATIS + Extras", perPerson: 40, total: 280, fullPrice: 400 },
  },
];

const vipExtras = [
  { icon: Clock, title: "2 Horas extra gratis", desc: "Valoradas en más de 100 €", saving: "100 €" },
  { icon: Droplets, title: "Mini-bar premium incluido", desc: "Bebidas frías y snacks al subir", saving: "20 €" },
  { icon: Gift, title: "Donut acuático", desc: "Adrenalina pura para tu grupo", saving: "25 €" },
  { icon: Sparkles, title: "Clase personalizada 20 min", desc: "Instrucción gratis si no tienes experiencia", saving: "GRATIS" },
];

const OffersSection = () => {
  const navigate = useNavigate();

  const goToBooking = (boatValue: string, pack: string) => {
    navigate(`/reservar?boat=${boatValue}&pack=${pack}`);
  };

  return (
    <section id="offers" className="py-28 lg:py-36 bg-primary text-ocean-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <p className="font-body font-semibold text-gold tracking-[0.3em] uppercase text-xs mb-5">
            Oferta Especial Marzo
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight">
            Packs Exclusivos
          </h2>
          <p className="font-body text-ocean-foreground/50 mt-6 text-lg leading-relaxed">
            Precios por persona que hacen la navegación accesible. Sin sorpresas, sin complicaciones.
          </p>
        </div>

        {/* Offer Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-28">
          {offers.map((o) => (
            <div
              key={o.boat}
              className={`group rounded-2xl overflow-hidden flex flex-col transition-all duration-500 bg-midnight ${
                o.highlight
                  ? "ring-2 ring-gold/30 shadow-[0_0_80px_-20px_hsl(42_87%_63%/0.15)]"
                  : "ring-1 ring-ocean-foreground/5 hover:ring-ocean-foreground/15"
              }`}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={o.image}
                  alt={`Alquiler ${o.boat} en Sitges`}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />
                {o.highlight && (
                  <div className="absolute top-4 left-4 bg-gold text-gold-foreground font-body text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
                    Más Popular
                  </div>
                )}
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="font-display text-xl font-bold">{o.boat}</h3>
                  <p className="font-body text-xs text-ocean-foreground/50 flex items-center gap-1.5 mt-1">
                    <Users className="h-3 w-3" /> Hasta {o.capacity} personas
                  </p>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex flex-col flex-1">
                {/* Basic */}
                <div className="px-6 py-5 border-b border-ocean-foreground/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-3.5 w-3.5 text-ocean-foreground/40" />
                    <span className="font-body text-[11px] uppercase tracking-[0.15em] text-ocean-foreground/50 font-semibold">Básica — {o.basic.hours}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-3xl font-bold">{o.basic.perPerson}</span>
                      <span className="font-body text-sm text-ocean-foreground/40">€/pers.</span>
                    </div>
                    <button
                      onClick={() => goToBooking(o.boatValue, "basic")}
                      className="font-body text-xs text-ocean-foreground/60 hover:text-gold px-3 py-2 rounded-lg border border-ocean-foreground/10 hover:border-gold/30 transition-all flex items-center gap-1.5"
                    >
                      Reservar <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* VIP */}
                <div className="px-6 py-5 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Gift className="h-3.5 w-3.5 text-gold" />
                      <span className="font-body text-[11px] uppercase tracking-[0.15em] text-gold font-bold">VIP</span>
                    </div>
                    <span className="bg-gold/10 text-gold font-body text-[10px] font-semibold px-2.5 py-1 rounded">
                      RECOMENDADA
                    </span>
                  </div>
                  <p className="font-body text-[11px] text-ocean-foreground/30 mb-4">
                    {o.vip.hours} · Donut, mini-bar, 6h navegación
                  </p>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="font-body text-sm text-ocean-foreground/30 line-through mr-2">{o.vip.fullPrice} €</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-3xl font-bold text-gold">{o.vip.perPerson}</span>
                        <span className="font-body text-sm text-ocean-foreground/40">€/pers.</span>
                      </div>
                    </div>
                    <button
                      onClick={() => goToBooking(o.boatValue, "vip")}
                      className="font-body text-xs text-gold-foreground bg-gold hover:bg-gold/90 px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 font-bold"
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
        <div className="max-w-4xl mx-auto mb-24">
          <h3 className="font-display text-3xl lg:text-4xl font-bold text-center mb-12">
            ¿Qué incluye la Oferta <span className="text-gold">VIP</span>?
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vipExtras.map((extra) => (
              <div
                key={extra.title}
                className="bg-midnight rounded-xl p-6 text-center border border-ocean-foreground/5 hover:border-gold/15 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gold/8 flex items-center justify-center">
                  <extra.icon className="h-5 w-5 text-gold" />
                </div>
                <p className="font-body font-semibold text-sm mb-1">{extra.title}</p>
                <p className="font-body text-xs text-ocean-foreground/40 mb-3">{extra.desc}</p>
                <span className="inline-block bg-gold/10 text-gold font-body font-bold text-xs px-3 py-1 rounded">
                  Ahorras {extra.saving}
                </span>
              </div>
            ))}
          </div>

          {/* Savings summary */}
          <div className="mt-14 border border-gold/10 rounded-2xl p-10 text-center bg-gold/[0.03]">
            <p className="font-body text-ocean-foreground/50 text-sm mb-2">
              Si contratases todo por separado, pagarías más de <strong className="text-ocean-foreground line-through">400 €</strong>
            </p>
            <p className="font-display text-xl font-semibold text-ocean-foreground/70 mb-5">
              Pack VIP para 10 personas · Nireus 620
            </p>
            <p className="font-display text-5xl lg:text-6xl font-bold text-gold tracking-tight">
              32 €<span className="text-xl text-ocean-foreground/40 ml-2">/ persona</span>
            </p>
            <p className="font-body text-ocean-foreground/40 mt-4 text-sm">
              Más de <strong className="text-gold">80 € de ahorro</strong> directo en extras y tiempo
            </p>
          </div>
        </div>

        {/* Guarantee */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-midnight border border-ocean-foreground/5 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-xl bg-gold/8 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-7 w-7 text-gold" />
            </div>
            <div>
              <h4 className="font-display text-xl font-bold mb-3">
                Garantía Riesgo Cero
              </h4>
              <p className="font-body text-ocean-foreground/50 leading-relaxed">
                Si el día de tu reserva el tiempo no acompaña,{" "}
                <strong className="text-ocean-foreground">
                  reprogramamos tu salida o te devolvemos el dinero íntegramente sin preguntas.
                </strong>{" "}
                El riesgo lo asumimos nosotros, tú solo disfruta.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-body text-xs text-gold/60 font-semibold uppercase tracking-[0.25em] mb-6">
            Solo 3 reservas disponibles por día
          </p>
          <Button
            onClick={() => navigate("/reservar?boat=nireus-620&pack=vip")}
            size="lg"
            className="bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold text-base px-12 py-6 rounded-xl"
          >
            Reservar Ahora — Desde 24 €/persona
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
