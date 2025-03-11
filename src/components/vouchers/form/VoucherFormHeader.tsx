
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface VoucherFormHeaderProps {
  isEditMode: boolean;
}

const VoucherFormHeader = ({ isEditMode }: VoucherFormHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center mb-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/seller-vouchers")}
        className="mr-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <h2 className="text-2xl font-bold">
        {isEditMode ? "Edit Voucher" : "Create New Voucher"}
      </h2>
    </div>
  );
};

export default VoucherFormHeader;
