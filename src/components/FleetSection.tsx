import BoatCard from "@/components/BoatCard";
import nireusImg from "@/assets/nireus-620.jpg";
import barracudaImg from "@/assets/barracuda-545.jpg";
import astiluxImg from "@/assets/astilux-600.jpg";

const boats = [
  {
    name: "Nireus 620",
    image: nireusImg,
    description:
      "Navega con la máxima agilidad a bordo de nuestra Nireus 620, una lancha diseñada para volar sobre las olas de Sitges. Su casco deportivo garantiza una aceleración inmediata y una estabilidad superior.",
    capacity: 10,
    power: "200 CV",
    license: "Licencia de Navegación",
    price: 470,
  },
  {
    name: "Okyboats Barracuda 545",
    image: barracudaImg,
    description:
      "Siente la velocidad pura con la Barracuda 545, la embarcación más ligera y reactiva de nuestra flota en Port Ginesta. Ideal para recorrer grandes distancias en tiempo récord.",
    capacity: 7,
    power: "100 CV",
    license: "Licencia de Navegación",
    price: 370,
  },
  {
    name: "Astilux AX 600 Open",
    image: astiluxImg,
    description:
      "Llega el primero al horizonte con la Astilux AX 600, donde el diseño de vanguardia se fusiona con una velocidad sorprendente. La mezcla perfecta entre una estética impecable y confort premium.",
    capacity: 7,
    power: "100 CV",
    license: "Licencia de Navegación",
    price: 370,
  },
];

const FleetSection = () => {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="fleet" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-body font-semibold text-ocean tracking-[0.2em] uppercase text-sm mb-3">
            Nuestra Flota
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground">
            Nuestras Embarcaciones
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto">
            Elige la embarcación que mejor se adapte a tu aventura y reserva en minutos.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {boats.map((boat) => (
            <BoatCard key={boat.name} {...boat} onBook={scrollToBooking} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
