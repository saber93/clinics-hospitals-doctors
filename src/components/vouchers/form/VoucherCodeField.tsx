
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface VoucherCodeFieldProps {
  code: string;
  onChange: (name: string, value: string) => void;
}

const VoucherCodeField = ({ code, onChange }: VoucherCodeFieldProps) => {
  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let generatedCode = '';
    for (let i = 0; i < 8; i++) {
      generatedCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    onChange("code", generatedCode);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="code">Voucher Code *</Label>
      <div className="flex gap-2">
        <Input
          id="code"
          name="code"
          placeholder="Enter voucher code (e.g., SUMMER25)"
          value={code}
          onChange={(e) => onChange("code", e.target.value)}
          className="uppercase"
          required
        />
        <Button
          type="button"
          variant="outline"
          onClick={generateRandomCode}
          title="Generate random code"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        This is the code that customers will enter to redeem the voucher.
      </p>
    </div>
  );
};

export default VoucherCodeField;
