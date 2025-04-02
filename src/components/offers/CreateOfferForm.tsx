
import { useState } from "react";
import { toast } from "sonner";

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

export default CreateOfferForm;
