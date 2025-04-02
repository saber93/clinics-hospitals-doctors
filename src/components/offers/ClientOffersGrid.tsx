
import OfferCard, { Offer } from "./OfferCard";

interface ClientOffersGridProps {
  offers: Offer[];
}

const ClientOffersGrid = ({ offers }: ClientOffersGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.map(offer => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
};

export default ClientOffersGrid;
