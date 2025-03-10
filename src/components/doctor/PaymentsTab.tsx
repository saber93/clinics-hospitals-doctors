
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";

interface Payment {
  id: string;
  amount: number;
  doctor_amount: number;
  payment_status: string;
  created_at: string;
  patient_id: string;
  patientName: string;
}

interface PaymentsTabProps {
  recentPayments: Payment[];
}

const PaymentsTab: React.FC<PaymentsTabProps> = ({ recentPayments }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Payments</CardTitle>
        <CardDescription>
          Latest payments received for your consultations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recentPayments.length > 0 ? (
          <div className="space-y-4">
            {recentPayments.map(payment => (
              <div key={payment.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium">{payment.patientName}</p>
                      <Badge className="ml-2" variant={payment.payment_status === 'completed' ? 'default' : 'outline'}>
                        {payment.payment_status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(payment.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-lg text-green-600">${payment.doctor_amount}</span>
                    <span className="text-xs text-muted-foreground">Total: ${payment.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <DollarSign className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No payments yet</h3>
            <p className="text-sm text-muted-foreground mt-1">
              You haven't received any payments yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentsTab;
