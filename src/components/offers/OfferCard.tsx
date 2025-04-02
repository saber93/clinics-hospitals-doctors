
import { toast } from "sonner";

export interface Offer {
  id: number;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  vendor: string;
  imageUrl: string;
}

interface OfferCardProps {
  offer: Offer;
}

const OfferCard = ({ offer }: OfferCardProps) => {
  const handleRedeemOffer = () => {
    toast.success(`Offer redeemed: ${offer.title}`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover-lift card-with-image">
      <div className="card-image-hover h-48">
        <img 
          src={offer.imageUrl} 
          alt={offer.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{offer.title}</h3>
          <span className="bg-primary/20 text-primary px-2 py-1 rounded text-sm font-medium">{offer.discount}</span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3 h-[4.5rem]">{offer.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Valid until: {new Date(offer.validUntil).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Provider: {offer.vendor}</p>
          </div>
          <button 
            className="skinnect-button-primary button-hover-slide"
            onClick={handleRedeemOffer}
          >
            Redeem
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
