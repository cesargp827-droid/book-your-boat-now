import { Compass, ShieldCheck, Star, MapPin, Wrench, Users } from "lucide-react";

const reasons = [
  {
    icon: MapPin,
    title: "Ubicación Privilegiada",
    description:
      "Operamos desde Port Ginesta, en Castelldefels, en la exclusiva Costa del Garraf. Aguas cristalinas y calas escondidas a minutos de Barcelona.",
  },
  {
    icon: Star,
    title: "Flota 100% Actualizada",
    description:
      "Embarcaciones de última generación, revisadas antes de cada salida. Navegarás con total confianza y confort.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad Garantizada",
    description:
      "Todas nuestras embarcaciones cumplen la normativa vigente, con seguros a todo riesgo y equipamiento de seguridad completo.",
  },
  {
    icon: Compass,
    title: "Sin Complicaciones",
    description:
      "Reserva online en minutos, recogida rápida en puerto y briefing personalizado. Tú solo preocúpate de disfrutar.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento Impecable",
    description:
      "Riguroso protocolo de limpieza y revisión mecánica tras cada uso. Calidad premium siempre.",
  },
  {
    icon: Users,
    title: "Atención Personalizada",
    description:
      "Nuestro equipo te asesora para elegir la embarcación ideal y te recomienda las mejores rutas según tu experiencia.",
  },
];

const WhyUsSection = () => {
  return (
    <section className="py-28 lg:py-36 bg-sand">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <p className="font-body font-semibold text-primary tracking-[0.3em] uppercase text-xs mb-5">
            La Diferencia
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground">
            ¿Por qué Nàutica Negobà?
          </h2>
          <p className="font-body text-muted-foreground mt-6 text-lg leading-relaxed">
            3 años de experiencia técnica especializada ofreciendo experiencias náuticas inolvidables en la costa del Garraf.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-5 group-hover:bg-primary/15 transition-colors">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;