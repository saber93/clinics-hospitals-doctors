
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FormActionsProps {
  loading: boolean;
  isEditMode: boolean;
}

const FormActions = ({ loading, isEditMode }: FormActionsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end gap-4 w-full">
      <Button 
        type="button" 
        variant="outline"
        disabled={loading}
        onClick={() => navigate("/products")}
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="animate-spin mr-2">⏳</span>
            {isEditMode ? "Updating..." : "Creating..."}
          </>
        ) : (
          isEditMode ? "Update Product" : "Create Product"
        )}
      </Button>
    </div>
  );
};

export default FormActions;
