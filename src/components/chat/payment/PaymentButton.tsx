
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PaymentButtonProps {
  isProcessing: boolean;
  onClick: () => void;
  price: number;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  isProcessing,
  onClick,
  price,
}) => {
  return (
    <Button onClick={onClick} disabled={isProcessing}>
      {isProcessing ? (
        <div className="flex items-center">
          <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
          Processing...
        </div>
      ) : (
        <div className="flex items-center">
          <Check className="mr-2 h-4 w-4" />
          Pay ${price.toFixed(2)}
        </div>
      )}
    </Button>
  );
};

export default PaymentButton;
