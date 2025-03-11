
import { Button } from "@/components/ui/button";
import { Plus, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Plus size={18} />
          Add New Product
        </h3>
        <p className="text-gray-600 mb-4">Create and list a new product for sale</p>
        <Button variant="default" onClick={() => navigate("/add-product")}>Add Product</Button>
      </div>
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Tag size={18} />
          Create Voucher
        </h3>
        <p className="text-gray-600 mb-4">Generate discount vouchers for your products</p>
        <Button variant="outline" onClick={() => navigate("/add-voucher")}>Create Voucher</Button>
      </div>
    </div>
  );
};

export default QuickActions;
