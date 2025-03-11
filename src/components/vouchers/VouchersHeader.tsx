
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VouchersHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-wrap justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Voucher Management</h2>
      <Button onClick={() => navigate("/seller-vouchers/new")}>
        <Plus className="mr-2 h-4 w-4" /> Create New Voucher
      </Button>
    </div>
  );
};

export default VouchersHeader;
