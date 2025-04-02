
import { useSearchParams } from "react-router-dom";
import OffersLayout from "@/components/offers/OffersLayout";
import ClientOffersGrid from "@/components/offers/ClientOffersGrid";
import CreateOfferForm from "@/components/offers/CreateOfferForm";
import VendorOffersPanel from "@/components/offers/VendorOffersPanel";
import { mockOffers } from "@/data/offersData";

const Offers = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("userType") || "client";
  
  return (
    <OffersLayout title={userType === "client" ? "Special Offers" : "Manage Special Offers"}>
      {userType === "client" ? (
        <ClientOffersGrid offers={mockOffers} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CreateOfferForm />
          </div>
          <div className="lg:col-span-2">
            <VendorOffersPanel offers={mockOffers.slice(0, 2)} />
          </div>
        </div>
      )}
    </OffersLayout>
  );
};

export default Offers;
