import { Clock, Gift, ShieldCheck, Sparkles, Users, PartyPopper, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import barracudaImg from "@/assets/barracuda-545.jpg";
import nireusImg from "@/assets/nireus-620.jpg";
import astiluxImg from "@/assets/astilux-600.jpg";

const offers = [
  {
    boat: "Okyboats Barracuda 545",
    image: barracudaImg,
    capacity: 7,
    basic: { hours: "3h + 1h GRATIS", perPerson: 27, total: 190 },
    vip: { hours: "4h + 2h GRATIS + Extras", perPerson: 35, total: 245 },
  },
  {
    boat: "Nireus 620 CL",
    image: nireusImg,
    capacity: 10,
    highlight: true,
    basic: { hours: "3h + 1h GRATIS", perPerson: 24, total: 240 },
    vip: { hours: "4h + 2h GRATIS + Extras", perPerson: 32, total: 320 },
  },
  {
    boat: "Astilux AX 600 Open",
    image: astiluxImg,
    capacity: 7,
    basic: { hours: "3h + 1h GRATIS", perPerson: 30, total: 210 },
    vip: { hours: "4h + 2h GRATIS + Extras", perPerson: 40, total: 280 },
  },
];

const vipExtras = [
  {
    icon: Clock,
    title: "2 Horas extra",
    desc: "Valoradas en más de 100 €",
    saving: "100 €",
  },
  {
    icon: Droplets,
    title: "Mini-bar Premium",
    desc: "Bebidas frías y snacks al subir",
    saving: "20 €",
  },
  {
    icon: PartyPopper,
    title: "Donut Acuático",
    desc: "Adrenalina pura para tu grupo",
    saving: "25 €",
  },
  {
    icon: Sparkles,
    title: "Clase personalizada",
    desc: "20 min de instrucción gratis",
    saving: "GRATIS",
  },
];

const OffersSection = () => {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="offers" className="py-20 lg:py-28 bg-navy text-navy-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-ocean/8 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-gold/8 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-gold text-gold-foreground font-body font-bold text-xs tracking-widest uppercase px-5 py-2 rounded-full mb-5">
            🔥 Oferta Especial Marzo
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold leading-tight">
            Ofertas <span className="text-gold">Exclusivas</span>
          </h2>
          <p className="font-body text-navy-foreground/60 mt-4 max-w-xl mx-auto text-lg">
            Precios por persona que suenan a cena con amigos. Maximiza la diversión, minimiza el gasto.
          </p>
        </div>

        {/* Offer Cards with images */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {offers.map((o) => (
            <div
              key={o.boat}
              className={`group rounded-2xl overflow-hidden transition-all duration-500 flex flex-col ${
                o.highlight
                  ? "ring-2 ring-gold shadow-[0_0_40px_-10px_hsl(38_80%_55%/0.3)] scale-[1.02]"
                  : "ring-1 ring-navy-foreground/10 hover:ring-gold/40"
              } bg-[hsl(210_50%_14%)]`}
            >
              {/* Boat Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={o.image}
                  alt={o.boat}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210_50%_14%)] via-transparent to-transparent" />
                {o.highlight && (
                  <div className="absolute top-4 left-4 bg-gold text-gold-foreground font-body text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    ⭐ Más Popular
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-xl font-bold">🚤 {o.boat}</h3>
                  <p className="font-body text-sm text-navy-foreground/60 flex items-center gap-1 mt-1">
                    <Users className="h-3.5 w-3.5" /> Hasta {o.capacity} personas
                  </p>
                </div>
              </div>

              {/* Offers */}
              <div className="flex flex-col flex-1">
                {/* Basic */}
                <div className="px-6 py-5 border-b border-navy-foreground/8">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-ocean" />
                    <span className="font-body text-xs uppercase tracking-widest text-ocean font-bold">
                      Oferta Básica
                    </span>
                  </div>
                  <p className="font-body text-sm text-navy-foreground/50 mb-3">{o.basic.hours}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="font-display text-3xl font-bold">{o.basic.perPerson} €</span>
                      <span className="font-body text-sm text-navy-foreground/50 ml-1">/ pers.</span>
                    </div>
                    <span className="font-body text-xs text-navy-foreground/40 bg-navy-foreground/5 px-2 py-1 rounded">
                      Total: {o.basic.total} €
                    </span>
                  </div>
                </div>

                {/* VIP */}
                <div className="px-6 py-5 bg-gold/5 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="h-4 w-4 text-gold" />
                    <span className="font-body text-xs uppercase tracking-widest text-gold font-bold">
                      Oferta VIP
                    </span>
                    <span className="ml-auto bg-gold/20 text-gold font-body text-[10px] font-bold px-2 py-0.5 rounded-full">
                      RECOMENDADA
                    </span>
                  </div>
                  <p className="font-body text-sm text-navy-foreground/50 mb-1">{o.vip.hours}</p>
                  <p className="font-body text-xs text-navy-foreground/40 mb-3">
                    Incluye: Donut acuático, mini-bar y 6h de navegación
                  </p>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="font-display text-3xl font-bold text-gold">{o.vip.perPerson} €</span>
                      <span className="font-body text-sm text-navy-foreground/50 ml-1">/ pers.</span>
                    </div>
                    <span className="font-body text-xs text-navy-foreground/40 bg-navy-foreground/5 px-2 py-1 rounded">
                      Total: {o.vip.total} €
                    </span>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="px-6 py-4">
                  <Button
                    onClick={scrollToBooking}
                    className={`w-full font-body font-bold ${
                      o.highlight
                        ? "bg-gold hover:bg-gold/90 text-gold-foreground"
                        : "bg-ocean hover:bg-ocean/90 text-ocean-foreground"
                    }`}
                  >
                    Reservar Esta Oferta
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VIP Savings Breakdown */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl lg:text-3xl font-bold">
              ¿Qué incluye la <span className="text-gold">Oferta VIP</span>?
            </h3>
            <p className="font-body text-navy-foreground/50 mt-2">Todo lo que te ahorras frente a contratarlo por separado</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vipExtras.map((extra) => (
              <div
                key={extra.title}
                className="bg-[hsl(210_50%_14%)] rounded-xl p-6 text-center border border-navy-foreground/8 hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <extra.icon className="h-7 w-7 text-gold" />
                </div>
                <p className="font-body font-bold text-sm mb-1">{extra.title}</p>
                <p className="font-body text-xs text-navy-foreground/50 mb-3">{extra.desc}</p>
                <span className="inline-block bg-gold/15 text-gold font-body font-bold text-xs px-3 py-1 rounded-full">
                  Ahorras {extra.saving}
                </span>
              </div>
            ))}
          </div>

          {/* Savings Summary */}
          <div className="mt-10 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border border-gold/20 rounded-2xl p-8 text-center">
            <p className="font-body text-navy-foreground/70 mb-2">
              💰 Si contratases todo por separado, pagarías más de <strong className="text-navy-foreground">400 €</strong>
            </p>
            <p className="font-display text-xl lg:text-2xl font-bold">
              Pack de marzo para 10 personas en la Nireus 620:
            </p>
            <p className="font-display text-4xl lg:text-5xl font-bold text-gold mt-3">
              Solo 32 € / persona
            </p>
            <p className="font-body text-navy-foreground/60 mt-2">
              ¡Te ahorras más de <strong className="text-gold">80 €</strong> en extras y tiempo!
            </p>
          </div>
        </div>

        {/* Guarantee */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="bg-[hsl(210_50%_14%)] border border-ocean/20 rounded-2xl p-8 flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-ocean/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-8 w-8 text-ocean" />
            </div>
            <div>
              <h4 className="font-display text-xl font-bold mb-2">
                🛡️ Riesgo Cero — Garantía Climática
              </h4>
              <p className="font-body text-navy-foreground/60 leading-relaxed">
                Si el día de tu reserva no hace sol o el mar no está para navegar,{" "}
                <strong className="text-navy-foreground">
                  reprogramamos tu salida o te devolvemos el dinero sin preguntas.
                </strong>{" "}
                El riesgo lo asumimos nosotros, tú solo disfruta.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-body text-sm text-gold font-semibold uppercase tracking-widest mb-5 animate-pulse">
            🔥 ¡Solo 3 reservas disponibles por día!
          </p>
          <Button
            onClick={scrollToBooking}
            size="lg"
            className="bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold text-lg px-12 py-7 rounded-xl shadow-hero"
          >
            Reservar Ahora — Desde 24 €/persona
          </Button>
          <p className="font-body text-xs text-navy-foreground/40 mt-4">
            Oferta válida en marzo. Plazas limitadas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
