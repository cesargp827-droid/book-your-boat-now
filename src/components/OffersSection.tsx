import { Clock, Gift, ShieldCheck, Sparkles, Users, Droplets, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSkipper } from "@/context/SkipperContext";
import barracudaImg from "@/assets/barracuda-545.jpg";
import nireusImg from "@/assets/nireus-620.jpg";
import astiluxImg from "@/assets/astilux-600.jpg";

const SKIPPER_COST = 45;

const offers = [
  {
    boat: "OKIBOATS Barracuda 545",
    boatValue: "barracuda-545",
    image: barracudaImg,
    capacity: 7,
    perPerson: 35,
  },
  {
    boat: "Nireus 620 CL",
    boatValue: "nireus-620",
    image: nireusImg,
    capacity: 10,
    highlight: true,
    perPerson: 32,
  },
  {
    boat: "Astilux AX 600 Open",
    boatValue: "astilux-600",
    image: astiluxImg,
    capacity: 7,
    perPerson: 40,
  },
];

const valueStack = [
  { icon: Clock, title: "2 Horas extra GRATIS", desc: "Navega 6h en total (4h + 2h gratis)", saving: "Ahorras 100 €" },
  { icon: Droplets, title: "Mini-bar Premium", desc: "Bebidas frías y snacks al embarcar", saving: "Ahorras 20 €" },
  { icon: Gift, title: "Donut acuático", desc: "Adrenalina pura para tu grupo", saving: "Ahorras 25 €" },
  { icon: Sparkles, title: "Clase personalizada 20 min", desc: "Instrucción gratuita si no tienes experiencia", saving: "GRATIS" },
];

const OffersSection = () => {
  const navigate = useNavigate();
  const { withSkipper } = useSkipper();

  const getCapacity = (cap: number) => withSkipper ? cap - 1 : cap;

  const getTotal = (perPerson: number, cap: number) =>
    perPerson * getCapacity(cap) + (withSkipper ? SKIPPER_COST : 0);

  const goToBooking = (boatValue: string) => {
    const params = new URLSearchParams({
      boat: boatValue,
      pack: "vip",
      skipper: withSkipper ? "1" : "0",
    });
    navigate(`/reservar?${params.toString()}`);
  };

  return (
    <section id="offers" className="py-28 lg:py-36 bg-primary text-ocean-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="font-body font-semibold text-gold tracking-[0.3em] uppercase text-xs mb-5">
            Oferta Especial Marzo
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight">
            Pack VIP — 4h + 2h GRATIS
          </h2>
          <p className="font-body text-ocean-foreground/60 mt-6 text-lg leading-relaxed">
            6 horas de navegación con todos los extras incluidos. Precio por persona.
          </p>
        </div>

        {/* Value Stack */}
        <div className="max-w-4xl mx-auto mb-20">
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-center mb-10">
            Todo lo que incluye tu <span className="text-gold">Pack VIP</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {valueStack.map((extra) => (
              <div
                key={extra.title}
                className="bg-midnight rounded-xl p-6 text-center border border-ocean-foreground/5 hover:border-gold/20 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gold/10 flex items-center justify-center">
                  <extra.icon className="h-5 w-5 text-gold" />
                </div>
                <p className="font-body font-semibold text-sm mb-1">{extra.title}</p>
                <p className="font-body text-xs text-ocean-foreground/40 mb-3">{extra.desc}</p>
                <span className="inline-block bg-gold/10 text-gold font-body font-bold text-xs px-3 py-1 rounded">
                  {extra.saving}
                </span>
              </div>
            ))}
          </div>

          {/* Savings callout */}
          <div className="mt-10 border border-gold/10 rounded-2xl p-8 lg:p-10 text-center bg-gold/[0.03]">
            <p className="font-body text-ocean-foreground/50 text-sm mb-3">
              Si contratases todo por separado, pagarías más de{" "}
              <strong className="text-ocean-foreground line-through">400 €</strong>
            </p>
            <p className="font-display text-xl font-semibold text-ocean-foreground/80 mb-2">
              Con nosotros, ahorras más de
            </p>
            <p className="font-display text-5xl lg:text-6xl font-bold text-gold tracking-tight">
              80 €
            </p>
            <p className="font-body text-ocean-foreground/40 mt-3 text-sm">
              directos en extras y tiempo de navegación
            </p>
          </div>
        </div>

        {/* Offer Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {offers.map((o) => {
            const cap = getCapacity(o.capacity);
            const total = getTotal(o.perPerson, o.capacity);
            return (
              <div
                key={o.boat}
                className={`group rounded-2xl overflow-hidden flex flex-col transition-all duration-500 bg-midnight ${
                  o.highlight
                    ? "ring-2 ring-gold/30 shadow-[0_0_80px_-20px_hsl(42_87%_63%/0.15)]"
                    : "ring-1 ring-ocean-foreground/5 hover:ring-ocean-foreground/15"
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={o.image}
                    alt={`Pack VIP ${o.boat} — alquiler barcos Sitges`}
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
                      <Users className="h-3 w-3" /> Hasta {cap} personas
                      {withSkipper && <span className="text-gold">(+patrón)</span>}
                    </p>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="font-body text-[11px] text-ocean-foreground/40 mb-4 uppercase tracking-wider">
                    6h navegación · Donut · Mini-bar · Clase
                  </p>

                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-3xl font-bold text-gold">{o.perPerson}</span>
                        <span className="font-body text-sm text-ocean-foreground/40">€/pers.</span>
                      </div>
                      <p className="font-body text-xs text-ocean-foreground/30 mt-1">
                        Total: {total}€
                        {withSkipper && <span className="text-gold"> (incl. patrón)</span>}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto space-y-3">
                    <p className="font-body text-xs text-ocean-foreground/30 text-center">
                      Fianza: 400€ el día del servicio
                    </p>
                    <Button
                      onClick={() => goToBooking(o.boatValue)}
                      className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-body font-bold py-5 rounded-xl"
                    >
                      Reservar Pack VIP <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-midnight border border-ocean-foreground/5 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-7 w-7 text-gold" />
            </div>
            <div>
              <h4 className="font-display text-xl font-bold mb-3">
                Garantía Riesgo Cero
              </h4>
              <p className="font-body text-ocean-foreground/50 leading-relaxed">
                Si el día de tu reserva el tiempo no acompaña,{" "}
                <strong className="text-ocean-foreground">
                  reprogramamos tu salida o te devolvemos el dinero íntegramente.
                </strong>{" "}
                El riesgo lo asumimos nosotros, tú solo disfruta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
