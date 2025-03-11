
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface StockFieldProps {
  stockQuantity: string;
  lowStockThreshold: string;
  onChange: (name: string, value: string) => void;
}

const StockField = ({ stockQuantity, lowStockThreshold, onChange }: StockFieldProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="stock_quantity">Stock Quantity *</Label>
        <Input
          id="stock_quantity"
          name="stock_quantity"
          type="number"
          min="0"
          value={stockQuantity}
          onChange={(e) => onChange("stock_quantity", e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="low_stock_threshold">Low Stock Alert Threshold</Label>
        <Input
          id="low_stock_threshold"
          name="low_stock_threshold"
          type="number"
          min="0"
          value={lowStockThreshold}
          onChange={(e) => onChange("low_stock_threshold", e.target.value)}
          placeholder="Default: 10"
        />
      </div>
    </div>
  );
};

export default StockField;
