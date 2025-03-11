
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Percent } from "lucide-react";

interface DiscountFieldProps {
  discountPercentage: string;
  onChange: (name: string, value: string) => void;
}

const DiscountField = ({ discountPercentage, onChange }: DiscountFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="discount_percentage">Discount Percentage *</Label>
      <div className="relative">
        <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          id="discount_percentage"
          name="discount_percentage"
          type="number"
          min="1"
          max="100"
          placeholder="10"
          value={discountPercentage}
          onChange={(e) => onChange("discount_percentage", e.target.value)}
          className="pl-10"
          required
        />
      </div>
    </div>
  );
};

export default DiscountField;
