
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";

interface DateFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  required?: boolean;
  helpText?: string;
}

const DateField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  required = false, 
  helpText 
}: DateFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}{required && " *"}</Label>
      <div className="relative">
        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          id={id}
          name={id}
          type="date"
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          className="pl-10"
          required={required}
        />
        {helpText && (
          <p className="text-xs text-muted-foreground">
            {helpText}
          </p>
        )}
      </div>
    </div>
  );
};

export default DateField;
