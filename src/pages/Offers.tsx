
import { useSearchParams } from "react-router-dom";
import OffersLayout from "@/components/offers/OffersLayout";
import ClientOffersGrid from "@/components/offers/ClientOffersGrid";
import CreateOfferForm from "@/components/offers/CreateOfferForm";
import VendorOffersPanel from "@/components/offers/VendorOffersPanel";
import { mockOffers } from "@/data/offersData";
import { useTranslation } from "@/hooks/useTranslation";

const Offers = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("userType") || "client";
  const { t } = useTranslation();
  
  return (
    <OffersLayout title={userType === "client" ? t('offers.specialOffers') : t('offers.manageSpecialOffers')}>
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
