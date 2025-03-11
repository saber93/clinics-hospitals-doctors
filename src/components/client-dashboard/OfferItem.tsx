
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface Offer {
  id: number;
  title: string;
  provider: string;
  validUntil: string;
}

interface OfferItemProps {
  offer: Offer;
  formatDate: (dateString: string) => string;
}

const OfferItem = ({ offer, formatDate }: OfferItemProps) => {
  const handleClaim = () => {
    toast.success(`Offer claimed: ${offer.title}`);
  };

  return (
    <div className="border-b pb-3 last:border-0">
      <p className="font-medium">{offer.title}</p>
      <p className="text-sm text-gray-600">From: {offer.provider}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Valid until: {formatDate(offer.validUntil)}
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary"
          onClick={handleClaim}
        >
          Claim
        </Button>
      </div>
    </div>
  );
};

export default OfferItem;
