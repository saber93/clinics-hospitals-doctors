
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

// Mock offers data
const mockOffers = [
  {
    id: 1,
    title: "Summer Special: 25% Off All Facials",
    description: "Enjoy a refreshing facial treatment at a special discount for the summer season.",
    discount: "25%",
    validUntil: "2023-08-31",
    vendor: "Glow Skin Clinic",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
  },
  {
    id: 2,
    title: "Buy One Get One Free: Massage Therapy",
    description: "Book a full-body massage and get a second session free within 30 days.",
    discount: "BOGO",
    validUntil: "2023-09-15",
    vendor: "Relax & Rejuvenate Spa",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
  },
  {
    id: 3,
    title: "New Client Special: $50 Off First Treatment",
    description: "First-time clients can enjoy a special discount on any treatment of their choice.",
    discount: "$50 off",
    validUntil: "2023-12-31",
    vendor: "Beauty & Beyond",
    imageUrl: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
  }
];

const OfferCard = ({ offer }: { offer: typeof mockOffers[0] }) => {
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

const CreateOfferForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: "",
    validUntil: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Special offer created successfully!");
    setFormData({
      title: "",
      description: "",
      discount: "",
      validUntil: "",
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Create Special Offer</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Offer Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="skinnect-input"
            placeholder="e.g., Summer Special: 25% Off All Facials"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="skinnect-input"
            placeholder="Describe your special offer..."
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
            Discount Amount/Percentage
          </label>
          <input
            id="discount"
            name="discount"
            type="text"
            className="skinnect-input"
            placeholder="e.g., 25%, $50 off, BOGO"
            value={formData.discount}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="validUntil" className="block text-sm font-medium text-gray-700 mb-1">
            Valid Until
          </label>
          <input
            id="validUntil"
            name="validUntil"
            type="date"
            className="skinnect-input"
            value={formData.validUntil}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="skinnect-button-primary w-full">
          Create Offer
        </button>
      </div>
    </form>
  );
};

const Offers = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("userType") || "client";
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">
          {userType === "client" ? "Special Offers" : "Manage Special Offers"}
        </h1>
        
        {userType === "client" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockOffers.map(offer => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <CreateOfferForm />
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Your Active Offers</h2>
                <div className="space-y-4">
                  {mockOffers.slice(0, 2).map(offer => (
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
