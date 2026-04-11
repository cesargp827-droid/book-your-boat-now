import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Necesito licencia de navegación para alquilar un barco?",
    a: "Sí, todas nuestras embarcaciones requieren licencia de navegación válida. El patrón debe presentarla el día del servicio en el puerto antes de la salida.",
  },
  {
    q: "¿Cuándo y cómo se paga el alquiler?",
    a: "La reserva es completamente gratuita. El importe total del alquiler se abona el mismo día del servicio, antes de embarcar, mediante datáfono (tarjeta) o efectivo. No se realiza ningún cargo en el momento de la reserva.",
  },
  {
    q: "¿Cómo funciona la fianza de 400 €?",
    a: "La fianza de 400 € se gestiona mediante una preautorización con datáfono el día del servicio, antes de embarcar. No se cobra dinero — solo se retiene temporalmente. Se libera automáticamente al finalizar la navegación si la embarcación se entrega en perfectas condiciones.",
  },
  {
    q: "¿Puedo cancelar mi reserva?",
    a: "Sí. Con nuestra Garantía Riesgo Cero, puedes cancelar gratis hasta 3 días (72h) antes de tu salida. Sin preguntas ni cargos.",
  },
  {
    q: "¿Qué incluye el Pack VIP?",
    a: "El Pack VIP incluye 6 horas de navegación (4h + 2h gratis), donut acuático, mini-bar premium con bebidas frías y snacks, y una clase personalizada de 20 minutos si no tienes experiencia previa.",
  },
  {
    q: "¿Desde dónde salen las embarcaciones?",
    a: "Todas nuestras embarcaciones salen desde Port Ginesta, en Castelldefels, en la exclusiva Costa del Garraf. A solo 30 minutos de Barcelona.",
  },
  {
    q: "¿Qué incluye el alquiler?",
    a: "Todas las embarcaciones incluyen seguros a todo riesgo, amarre, limpieza, nevera, ducha de agua dulce y altavoces Bluetooth de alta calidad.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body font-semibold text-primary tracking-[0.3em] uppercase text-xs mb-5">
              Preguntas Frecuentes
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
              Todo lo que necesitas saber
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-xl border border-border px-6 shadow-card"
              >
                <AccordionTrigger className="font-body font-semibold text-foreground text-left text-sm lg:text-base hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
