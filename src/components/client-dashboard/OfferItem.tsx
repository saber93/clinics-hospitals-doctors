
import { Button } from "@/components/ui/button";

interface OfferItemProps {
  offer: {
    id: number;
    title: string;
    provider: string;
    validUntil: string;
  };
  formatDate: (dateString: string) => string;
}

const OfferItem = ({ offer, formatDate }: OfferItemProps) => {
  return (
    <div className="border-b pb-3 last:border-0">
      <p className="font-medium">{offer.title}</p>
      <p className="text-sm text-gray-600">From: {offer.provider}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Valid until: {formatDate(offer.validUntil)}
        </span>
        <Button variant="ghost" size="sm" className="text-primary">
          Claim
        </Button>
      </div>
    </div>
  );
};

export default OfferItem;
