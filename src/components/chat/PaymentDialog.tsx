
import React, { useState } from 'react';
import { ChatSettings, DoctorChatSettings } from '@/types/chat';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import PaymentMethodSelector, { PaymentMethod } from './payment/PaymentMethodSelector';
import CreditCardForm from './payment/CreditCardForm';
import PaymentButton from './payment/PaymentButton';

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
          <PaymentMethodSelector 
            paymentMethods={paymentMethods}
            selectedMethod={selectedMethod}
            onMethodChange={setSelectedMethod}
          />

          {selectedMethod === 'credit_card' && (
            <CreditCardForm 
              cardName={cardName}
              setCardName={setCardName}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              cardExpiry={cardExpiry}
              setCardExpiry={setCardExpiry}
              cardCvv={cardCvv}
              setCardCvv={setCvv}
            />
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <PaymentButton 
            isProcessing={isProcessing}
            onClick={handlePayment}
            price={sessionPrice}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
