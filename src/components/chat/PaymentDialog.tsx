
import React, { useState, useEffect } from 'react';
import { ChatSettings, DoctorChatSettings } from '@/types/chat';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { CreditCard, Check } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentMethod {
  id: string;
  name: string;
  logo?: string;
  supports_installments: boolean;
}

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: (success: boolean, transactionId?: string) => void;
  chatSettings: ChatSettings | null;
  doctorSettings: DoctorChatSettings | null;
  sessionId: string;
  patientId: string;
  doctorId: string;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  isOpen,
  onClose,
  onPaymentComplete,
  chatSettings,
  doctorSettings,
  sessionId,
  patientId,
  doctorId
}) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'tabby',
      name: 'Tabby',
      supports_installments: true
    },
    {
      id: 'tamara',
      name: 'Tamara',
      supports_installments: true
    },
    {
      id: 'credit_card',
      name: 'Credit Card',
      supports_installments: false
    }
  ]);
  const [selectedMethod, setSelectedMethod] = useState<string>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCvv] = useState('');

  const sessionPrice = doctorSettings?.session_price || chatSettings?.default_session_price || 50;
  const commissionPercentage = chatSettings?.default_commission_percentage || 10;

  const handlePayment = async () => {
    if (!sessionId || !patientId || !doctorId) {
      toast.error('Missing required information for payment');
      return;
    }

    setIsProcessing(true);

    try {
      if (selectedMethod === 'credit_card') {
        // Validate card details
        if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
          toast.error('Please complete all card details');
          setIsProcessing(false);
          return;
        }

        // Simulate credit card payment
        setTimeout(() => {
          const transactionId = `cc_${Date.now()}`;
          toast.success('Payment successful');
          onPaymentComplete(true, transactionId);
          onClose();
          setIsProcessing(false);
        }, 2000);
      } else {
        // For Tabby or Tamara, redirect to their checkout page
        // This is simulated for now
        toast.info(`Redirecting to ${selectedMethod} checkout...`);
        setTimeout(() => {
          toast.success('Payment completed with installment provider');
          onPaymentComplete(true, `${selectedMethod}_${Date.now()}`);
          onClose();
          setIsProcessing(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment to Continue Chat</DialogTitle>
          <DialogDescription>
            Pay ${sessionPrice.toFixed(2)} to continue chatting with the doctor.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <RadioGroup 
            defaultValue={selectedMethod} 
            onValueChange={setSelectedMethod}
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

          {selectedMethod === 'credit_card' && (
            <div className="space-y-3 mt-4">
              <div className="space-y-1">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="4111 1111 1111 1111"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardCvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                Pay ${sessionPrice.toFixed(2)}
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
