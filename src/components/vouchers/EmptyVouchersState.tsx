
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tag } from "lucide-react";

interface EmptyVouchersStateProps {
  searchTerm: string;
}

const EmptyVouchersState = ({ searchTerm }: EmptyVouchersStateProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-12">
      <Tag className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
      <h3 className="text-lg font-medium">No vouchers found</h3>
      <p className="text-muted-foreground mb-4">
        {searchTerm 
          ? "No vouchers match your search" 
          : "You haven't created any vouchers yet"
        }
      </p>
      <Button onClick={() => navigate("/seller-vouchers/new")}>
        Create your first voucher
      </Button>
    </div>
  );
};

export default EmptyVouchersState;
