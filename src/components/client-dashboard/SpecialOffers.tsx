
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import OfferItem, { Offer } from "./OfferItem";
import { formatDate } from "./utils/formatting";

const SpecialOffers = () => {
  const navigate = useNavigate();
  
  const specialOffers: Offer[] = [
    { id: 1, title: "30% Off First Massage", provider: "Wellness Spa", validUntil: "2023-12-31" },
    { id: 2, title: "Buy 3 Sessions, Get 1 Free", provider: "Fitness Studio", validUntil: "2023-11-30" },
    { id: 3, title: "Free Consultation", provider: "Beauty Clinic", validUntil: "2023-12-15" },
    { id: 4, title: "Holiday Package Discount", provider: "Health Center", validUntil: "2023-12-25" },
    { id: 5, title: "Refer a Friend - 20% Off", provider: "Yoga Studio", validUntil: "2023-11-20" },
  ];
  
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Special Offers</CardTitle>
        <CardDescription>Latest deals and promotions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {specialOffers.map((offer) => (
            <OfferItem 
              key={offer.id} 
              offer={offer} 
              formatDate={formatDate} 
            />
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
