import { Ship, Clock, Gift, ShieldCheck, Sparkles, Users, PartyPopper, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

const offers = [
  {
    boat: "Okyboats Barracuda 545",
    capacity: 7,
    basic: { hours: "3h + 1h GRATIS", perPerson: 27, total: 190 },
    vip: { hours: "4h + 2h GRATIS + Extras", perPerson: 35, total: 245 },
  },
  {
    boat: "Nireus 620 CL",
    capacity: 10,
    basic: { hours: "3h + 1h GRATIS", perPerson: 24, total: 240 },
    vip: { hours: "4h + 2h GRATIS + Extras", perPerson: 32, total: 320 },
  },
  {
    boat: "Astilux AX 600 Open",
    capacity: 7,
    basic: { hours: "3h + 1h GRATIS", perPerson: 30, total: 210 },
    vip: { hours: "4h + 2h GRATIS + Extras", perPerson: 40, total: 280 },
  },
];

const vipExtras = [
  {
    icon: Clock,
    title: "2 Horas de navegación extra",
    desc: "Valoradas en más de 100 € — ¡Te las regalamos!",
    saving: "100 €",
  },
  {
    icon: Droplets,
    title: "Mini-bar Premium",
    desc: "Bebidas frías y snacks listos al subir",
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
    desc: "20 min de instrucción gratis si no tienes experiencia",
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
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-ocean blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-gold blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-gold text-gold-foreground font-body font-bold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            🔥 Solo en Marzo · Lunes a Jueves
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold">
            Ofertas <span className="text-gold">Exclusivas</span> de Marzo
          </h2>
          <p className="font-body text-navy-foreground/70 mt-4 max-w-2xl mx-auto text-lg">
            Precios por persona que suenan a cena con amigos, no a lujo prohibitivo. Maximiza la diversión, minimiza el gasto.
          </p>
        </div>

        {/* Offer Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {offers.map((o) => (
            <div
              key={o.boat}
              className="bg-card/10 backdrop-blur-sm border border-navy-foreground/10 rounded-lg overflow-hidden hover:border-gold/40 transition-all duration-300"
            >
              {/* Boat Header */}
              <div className="p-6 border-b border-navy-foreground/10">
                <div className="flex items-center gap-2 mb-1">
                  <Ship className="h-5 w-5 text-ocean" />
                  <h3 className="font-display text-lg font-bold">🚤 {o.boat}</h3>
                </div>
                <p className="font-body text-sm text-navy-foreground/60 flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> Hasta {o.capacity} personas
                </p>
              </div>

              {/* Basic Offer */}
              <div className="p-6 border-b border-navy-foreground/10">
                <p className="font-body text-xs uppercase tracking-widest text-ocean font-semibold mb-2">
                  Oferta Básica
                </p>
                <p className="font-body text-sm text-navy-foreground/70 mb-3">
                  <Clock className="inline h-3.5 w-3.5 mr-1" />
                  {o.basic.hours}
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="font-display text-3xl font-bold text-navy-foreground">
                      {o.basic.perPerson} €
                    </span>
                    <span className="font-body text-sm text-navy-foreground/60 ml-1">/ persona</span>
                  </div>
                  <span className="font-body text-xs text-navy-foreground/50">Total: {o.basic.total} €</span>
                </div>
              </div>

              {/* VIP Offer */}
              <div className="p-6 bg-gold/10 relative">
                <div className="absolute top-3 right-3">
                  <span className="bg-gold text-gold-foreground font-body text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    ⭐ Recomendada
                  </span>
                </div>
                <p className="font-body text-xs uppercase tracking-widest text-gold font-semibold mb-2">
                  Oferta VIP
                </p>
                <p className="font-body text-sm text-navy-foreground/70 mb-1">
                  <Gift className="inline h-3.5 w-3.5 mr-1" />
                  {o.vip.hours}
                </p>
                <p className="font-body text-xs text-navy-foreground/50 mb-3">
                  Incluye: Donut acuático, mini-bar y 6h de navegación
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="font-display text-3xl font-bold text-gold">
                      {o.vip.perPerson} €
                    </span>
                    <span className="font-body text-sm text-navy-foreground/60 ml-1">/ persona</span>
                  </div>
                  <span className="font-body text-xs text-navy-foreground/50">Total: {o.vip.total} €</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VIP Savings Breakdown */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl lg:text-3xl font-bold">
              Reserva la <span className="text-gold">Oferta VIP</span> y mira todo lo que te ahorras
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vipExtras.map((extra) => (
              <div
                key={extra.title}
                className="bg-card/10 backdrop-blur-sm border border-navy-foreground/10 rounded-lg p-5 text-center hover:border-gold/30 transition-colors"
              >
                <extra.icon className="h-8 w-8 text-gold mx-auto mb-3" />
                <p className="font-body font-bold text-sm mb-1">{extra.title}</p>
                <p className="font-body text-xs text-navy-foreground/60 mb-2">{extra.desc}</p>
                <span className="inline-block bg-gold/20 text-gold font-body font-bold text-xs px-2 py-0.5 rounded-full">
                  Ahorras {extra.saving}
                </span>
              </div>
            ))}
          </div>

          {/* Savings Summary */}
          <div className="mt-8 bg-gold/10 border border-gold/30 rounded-lg p-6 text-center">
            <p className="font-body text-lg text-navy-foreground/80 mb-2">
              💰 Si contratases todo por separado, pagarías más de <strong className="text-navy-foreground">400 €</strong>
            </p>
            <p className="font-display text-2xl font-bold">
              Con nuestro pack de marzo para 10 personas en la Nireus 620:
            </p>
            <p className="font-display text-4xl font-bold text-gold mt-2">
              Solo 32 € por persona
            </p>
            <p className="font-body text-navy-foreground/70 mt-1">
              ¡Te ahorras más de <strong className="text-gold">80 € directos</strong> en extras y tiempo!
            </p>
          </div>
        </div>

        {/* Guarantee */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-card/10 backdrop-blur-sm border border-ocean/30 rounded-lg p-8 flex flex-col md:flex-row items-start gap-5">
            <ShieldCheck className="h-12 w-12 text-ocean flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-display text-xl font-bold mb-2">
                🛡️ Riesgo Cero — Garantía Climática
              </h4>
              <p className="font-body text-navy-foreground/70 leading-relaxed">
                Sabemos que marzo es traicionero. Por eso, si el día de tu reserva no hace sol o el mar no está para navegar,{" "}
                <strong className="text-navy-foreground">
                  reprogramamos tu salida o te devolvemos el dinero sin preguntas
                </strong>
                . El riesgo lo asumimos nosotros, tú solo disfruta.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-body text-sm text-gold font-semibold uppercase tracking-widest mb-4 animate-pulse">
            🔥 ¡Solo 3 reservas disponibles por día!
          </p>
          <Button
            onClick={scrollToBooking}
            size="lg"
            className="bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold text-lg px-10 py-6"
          >
            Reservar Ahora — Desde 24 €/persona
          </Button>
          <p className="font-body text-xs text-navy-foreground/50 mt-3">
            Oferta válida solo en marzo, de lunes a jueves. Plazas limitadas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
