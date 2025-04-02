
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import OfferCard from "@/components/offers/OfferCard";
import { mockOffers } from "@/data/offersData";

const SpecialOffers = () => {
  const navigate = useNavigate();
  
  // Get a preview of just the first 3 offers for the dashboard
  const previewOffers = mockOffers.slice(0, 3);
  
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Special Offers</CardTitle>
        <CardDescription>Latest deals and promotions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {previewOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => navigate("/offers")}>
          View All Offers
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SpecialOffers;
