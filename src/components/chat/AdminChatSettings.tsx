
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChatSettings, ChatPayment } from '@/types/chat';
import { getChatSettings } from '@/services/chatService';

const AdminChatSettings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [settings, setSettings] = useState<ChatSettings | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [defaultPrice, setDefaultPrice] = useState<number>(50);
  const [commissionRate, setCommissionRate] = useState<number>(10);
  const [sessionDuration, setSessionDuration] = useState<number>(7);
  const [transactions, setTransactions] = useState<ChatPayment[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setCurrentUser(data.session?.user || null);
        
        if (!data.session?.user) {
          return;
        }
        
        // Check if user is an admin
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.session.user.id)
          .single();
        
        const isUserAdmin = profile?.role === 'admin';
        setIsAdmin(isUserAdmin);
        
        if (!isUserAdmin) {
          return;
        }
        
        // Load settings
        const chatSettings = await getChatSettings();
        setSettings(chatSettings);
        
        if (chatSettings) {
          setDefaultPrice(chatSettings.default_session_price);
          setCommissionRate(chatSettings.default_commission_percentage);
          setSessionDuration(chatSettings.session_duration_days);
        }
        
        // Load recent transactions
        await loadTransactions();
      } catch (error) {
        console.error('Error loading admin settings:', error);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);

  const loadTransactions = async () => {
    setLoadingTransactions(true);
    try {
      const { data, error } = await supabase
        .from('chat_payments')
        .select(`
          *,
          patient:profiles!chat_payments_patient_id_fkey(name),
          doctor:profiles!chat_payments_doctor_id_fkey(name)
        `)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoadingTransactions(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!currentUser || saving || !isAdmin) return;
    
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('chat_settings')
        .update({
          default_session_price: defaultPrice,
          default_commission_percentage: commissionRate,
          session_duration_days: sessionDuration,
          updated_at: new Date().toISOString()
        })
        .eq('id', settings?.id)
        .select()
        .single();
      
      if (error) throw error;
      
      setSettings(data);
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="text-center py-8">
        <p>You don't have permission to access admin settings</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Global Chat Settings</CardTitle>
          <CardDescription>
            Configure system-wide settings for the chat feature
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="default-price" className="text-base font-medium">
              Default Session Price
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                $
              </span>
              <Input
                id="default-price"
                type="number"
                min="0"
                step="0.01"
                className="pl-7"
                value={defaultPrice}
                onChange={(e) => setDefaultPrice(parseFloat(e.target.value) || 0)}
              />
            </div>
            <p className="text-sm text-gray-500">
              Default price for chat sessions if a doctor doesn't set their own price
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="commission-rate" className="text-base font-medium">
              Commission Rate (%)
            </Label>
            <div className="relative">
              <Input
                id="commission-rate"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={commissionRate}
                onChange={(e) => setCommissionRate(parseFloat(e.target.value) || 0)}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                %
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Percentage of each payment that will be taken as commission
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="session-duration" className="text-base font-medium">
              Session Duration (Days)
            </Label>
            <Input
              id="session-duration"
              type="number"
              min="1"
              step="1"
              value={sessionDuration}
              onChange={(e) => setSessionDuration(parseInt(e.target.value) || 1)}
            />
            <p className="text-sm text-gray-500">
              Number of days a chat session remains active before expiring
            </p>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleSaveSettings}
            disabled={saving}
          >
            {saving ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                Saving...
              </div>
            ) : 'Save Settings'}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Last 10 payment transactions in the system
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {loadingTransactions ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : transactions.length === 0 ? (
            <p className="text-center py-4 text-gray-500">No transactions found</p>
          ) : (
            <Table>
              <TableCaption>Recent payment transactions</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.patient?.name || 'Unknown'}</TableCell>
                    <TableCell>{transaction.doctor?.name || 'Unknown'}</TableCell>
                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>${transaction.commission_amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        transaction.payment_status === 'completed' ? 'bg-green-100 text-green-800' :
                        transaction.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.payment_status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={loadTransactions}
            disabled={loadingTransactions}
          >
            Refresh Transactions
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminChatSettings;
