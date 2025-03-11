
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import VoucherCodeField from "./VoucherCodeField";
import DiscountField from "./DiscountField";
import ActiveStatusSwitch from "./ActiveStatusSwitch";
import DateField from "./DateField";
import MaxUsesField from "./MaxUsesField";
import FormActions from "./FormActions";

interface VoucherFormData {
  code: string;
  discount_percentage: string;
  is_active: boolean;
  start_date: string;
  end_date: string;
  max_uses: string;
  current_uses: string;
}

interface VoucherDetailsCardProps {
  formData: VoucherFormData;
  handleChange: (name: string, value: string) => void;
  handleSwitchChange: (checked: boolean) => void;
  isEditMode: boolean;
  loading: boolean;
}

const VoucherDetailsCard = ({
  formData,
  handleChange,
  handleSwitchChange,
  isEditMode,
  loading
}: VoucherDetailsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Voucher Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <VoucherCodeField
          code={formData.code}
          onChange={handleChange}
        />
        
        <DiscountField
          discountPercentage={formData.discount_percentage}
          onChange={handleChange}
        />
        
        <ActiveStatusSwitch
          isActive={formData.is_active}
          onToggle={handleSwitchChange}
        />
        
        <DateField
          id="start_date"
          label="Start Date"
          value={formData.start_date}
          onChange={handleChange}
          required={true}
        />
        
        <DateField
          id="end_date"
          label="End Date (Optional)"
          value={formData.end_date}
          onChange={handleChange}
          helpText="Leave blank for no expiration date"
        />
        
        <MaxUsesField
          maxUses={formData.max_uses}
          currentUses={formData.current_uses}
          onChange={handleChange}
          isEditMode={isEditMode}
        />
      </CardContent>
      <CardFooter>
        <FormActions 
          loading={loading} 
          isEditMode={isEditMode} 
        />
      </CardFooter>
    </Card>
  );
};

export default VoucherDetailsCard;
