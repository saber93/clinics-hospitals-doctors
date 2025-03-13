
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard } from 'lucide-react';

export interface PaymentMethod {
  id: string;
  name: string;
  logo?: string;
  supports_installments: boolean;
}

interface PaymentMethodSelectorProps {
  paymentMethods: PaymentMethod[];
  selectedMethod: string;
  onMethodChange: (value: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethods,
  selectedMethod,
  onMethodChange,
}) => {
  return (
    <RadioGroup 
      defaultValue={selectedMethod} 
      onValueChange={onMethodChange}
      className="space-y-2"
    >
      <div className="grid grid-cols-1 gap-2">
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex items-center">
            <RadioGroupItem value={method.id} id={method.id} />
            <Label 
              htmlFor={method.id} 
              className="flex items-center gap-2 rounded-md border p-2 ml-2 w-full cursor-pointer"
            >
              {method.id === 'credit_card' ? (
                <CreditCard className="h-5 w-5" />
              ) : (
                <span className="font-medium">{method.name}</span>
              )}
              {method.id === 'credit_card' ? 'Credit Card' : 
                method.supports_installments ? `${method.name} (Pay in installments)` : method.name}
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
};

export default PaymentMethodSelector;
