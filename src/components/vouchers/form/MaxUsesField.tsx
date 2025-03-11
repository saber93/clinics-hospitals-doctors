
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface MaxUsesFieldProps {
  maxUses: string;
  onChange: (name: string, value: string) => void;
  currentUses?: string;
  isEditMode?: boolean;
}

const MaxUsesField = ({ 
  maxUses, 
  onChange, 
  currentUses,
  isEditMode = false 
}: MaxUsesFieldProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="max_uses">Maximum Uses (Optional)</Label>
        <Input
          id="max_uses"
          name="max_uses"
          type="number"
          min="1"
          placeholder="No limit"
          value={maxUses}
          onChange={(e) => onChange("max_uses", e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Leave blank for unlimited uses
        </p>
      </div>
      
      {isEditMode && (
        <div className="space-y-2">
          <Label htmlFor="current_uses">Current Uses</Label>
          <Input
            id="current_uses"
            name="current_uses"
            type="number"
            min="0"
            value={currentUses}
            onChange={(e) => onChange("current_uses", e.target.value)}
            disabled
          />
        </div>
      )}
    </>
  );
};

export default MaxUsesField;
