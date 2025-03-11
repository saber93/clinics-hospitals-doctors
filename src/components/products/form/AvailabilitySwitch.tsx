
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AvailabilitySwitchProps {
  isAvailable: boolean;
  onToggle: (checked: boolean) => void;
}

const AvailabilitySwitch = ({ isAvailable, onToggle }: AvailabilitySwitchProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="is_available">Available</Label>
        <p className="text-xs text-muted-foreground">
          Toggle product availability status
        </p>
      </div>
      <Switch
        id="is_available"
        checked={isAvailable}
        onCheckedChange={onToggle}
      />
    </div>
  );
};

export default AvailabilitySwitch;
