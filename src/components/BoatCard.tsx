import { Users, Zap, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BoatCardProps {
  name: string;
  image: string;
  description: string;
  capacity: number;
  power: string;
  license: string;
  price: number;
  onBook: () => void;
}

const BoatCard = ({ name, image, description, capacity, power, license, price, onBook }: BoatCardProps) => {
  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={`Embarcación ${name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-gold text-gold-foreground font-body font-bold px-3 py-1 rounded-md text-sm">
          Desde {price}€
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl font-bold text-foreground mb-3">{name}</h3>
        <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
          {description}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-5 mb-5 text-sm text-muted-foreground font-body">
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-ocean" />
            {capacity}
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-ocean" />
            {power}
          </span>
          <span className="flex items-center gap-1.5">
            <Anchor className="h-4 w-4 text-ocean" />
            {license}
          </span>
        </div>

        {/* CTA */}
        <Button
          onClick={onBook}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold"
        >
          Reservar · Desde {price}€
        </Button>
      </div>
    </div>
  );
};

export default BoatCard;
