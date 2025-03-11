
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ActiveStatusSwitchProps {
  isActive: boolean;
  onToggle: (checked: boolean) => void;
}

const ActiveStatusSwitch = ({ isActive, onToggle }: ActiveStatusSwitchProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="is_active">Active</Label>
        <p className="text-xs text-muted-foreground">
          Customers can only redeem active vouchers
        </p>
      </div>
      <Switch
        id="is_active"
        checked={isActive}
        onCheckedChange={onToggle}
      />
    </div>
  );
};

export default ActiveStatusSwitch;
