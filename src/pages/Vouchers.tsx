
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

// Mock vouchers data
const mockVouchers = [
  {
    id: "VC-1234",
    code: "SUMMER25",
    description: "25% off any treatment",
    discount: "25%",
    validUntil: "2023-08-31",
    minSpend: 50,
    isRedeemed: false,
    vendor: "Glow Skin Clinic"
  },
  {
    id: "VC-5678",
    code: "BDAY50",
    description: "$50 off for your birthday month",
    discount: "$50",
    validUntil: "2023-12-31",
    minSpend: 100,
    isRedeemed: false,
    vendor: "Relax & Rejuvenate Spa"
  },
  {
    id: "VC-9012",
    code: "WELCOME15",
    description: "15% off your first visit",
    discount: "15%",
    validUntil: "2023-10-15",
    minSpend: 0,
    isRedeemed: true,
    vendor: "Beauty & Beyond"
  }
];

const VoucherCard = ({ voucher }: { voucher: typeof mockVouchers[0] }) => {
  const isExpired = new Date(voucher.validUntil) < new Date();
  
  const handleRedeemVoucher = () => {
    if (isExpired) {
      toast.error("This voucher has expired");
      return;
    }
    
    if (voucher.isRedeemed) {
      toast.error("This voucher has already been redeemed");
      return;
    }
    
    toast.success(`Voucher redeemed: ${voucher.code}`);
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 hover-lift ${
      voucher.isRedeemed ? 'border-gray-300' : isExpired ? 'border-red-500' : 'border-primary'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{voucher.description}</h3>
          <div className="mt-1 flex items-center">
            <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">{voucher.code}</span>
            {voucher.isRedeemed && (
              <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Redeemed</span>
            )}
            {!voucher.isRedeemed && isExpired && (
              <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Expired</span>
            )}
          </div>
        </div>
        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
          {voucher.discount}
        </span>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Valid until: {new Date(voucher.validUntil).toLocaleDateString()}</p>
        {voucher.minSpend > 0 && <p>Minimum spend: ${voucher.minSpend}</p>}
        <p>Provider: {voucher.vendor}</p>
      </div>
      
      {!voucher.isRedeemed && (
        <div className="mt-4">
          <button
            className={`skinnect-button w-full ${isExpired ? 'bg-gray-300 text-gray-600' : 'skinnect-button-primary button-hover-slide'}`}
            onClick={handleRedeemVoucher}
            disabled={isExpired}
          >
            {isExpired ? "Expired" : "Redeem Now"}
          </button>
        </div>
      )}
    </div>
  );
};

const CreateVoucherForm = () => {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discount: "",
    validUntil: "",
    minSpend: "0",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Voucher created successfully!");
    setFormData({
      code: "",
      description: "",
      discount: "",
      validUntil: "",
      minSpend: "0",
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Voucher</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
            Voucher Code
          </label>
          <input
            id="code"
            name="code"
            type="text"
            className="skinnect-input"
            placeholder="e.g., SUMMER25"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            className="skinnect-input"
            placeholder="e.g., 25% off any treatment"
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
            placeholder="e.g., 25%, $50"
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
        
        <div>
          <label htmlFor="minSpend" className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Spend ($)
          </label>
          <input
            id="minSpend"
            name="minSpend"
            type="number"
            min="0"
            className="skinnect-input"
            value={formData.minSpend}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="skinnect-button-primary w-full">
          Create Voucher
        </button>
      </div>
    </form>
  );
};

const Vouchers = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("userType") || "client";
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">
          {userType === "client" ? "My Vouchers" : "Voucher Management"}
        </h1>
        
        {userType === "client" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVouchers.map(voucher => (
              <VoucherCard key={voucher.id} voucher={voucher} />
            ))}
            <div className="bg-white rounded-lg shadow-md p-6 border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Add a Voucher</h3>
              <p className="text-gray-500 mb-4">Enter a voucher code to redeem it</p>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter voucher code"
                  className="skinnect-input mb-2 w-full"
                />
                <button className="skinnect-button-outline w-full">
                  Redeem Code
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <CreateVoucherForm />
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Your Vouchers</h2>
                <div className="space-y-4">
                  {mockVouchers.map(voucher => (
                    <div key={voucher.id} className="border rounded-lg p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{voucher.description}</h3>
                          <div className="flex items-center mt-1">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{voucher.code}</span>
                            {voucher.isRedeemed && (
                              <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Redeemed</span>
                            )}
                          </div>
                        </div>
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
                          {voucher.discount}
                        </span>
                      </div>
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-gray-500">Valid until: {new Date(voucher.validUntil).toLocaleDateString()}</span>
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

export default Vouchers;
