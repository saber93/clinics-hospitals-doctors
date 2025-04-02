
import { Offer } from "./OfferCard";

interface VendorOffersPanelProps {
  offers: Offer[];
}

const VendorOffersPanel = ({ offers }: VendorOffersPanelProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Your Active Offers</h2>
      <div className="space-y-4">
        {offers.map(offer => (
          <div key={offer.id} className="border rounded-lg p-4">
            <div className="flex justify-between">
              <h3 className="font-medium">{offer.title}</h3>
              <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
                {offer.discount}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-gray-500">Valid until: {new Date(offer.validUntil).toLocaleDateString()}</span>
              <div className="space-x-2">
                <button className="text-primary hover:underline">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorOffersPanel;
