
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { SaveIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getGlobalChatSettings, updateGlobalChatSettings } from '@/services/chat/settingsService';

const AdminChatSettings = () => {
  const [defaultSessionPrice, setDefaultSessionPrice] = useState<number>(0);
  const [defaultCommissionPercentage, setDefaultCommissionPercentage] = useState<number>(0);
  const [sessionDurationDays, setSessionDurationDays] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      try {
        const settings = await getGlobalChatSettings();
        if (settings) {
          setDefaultSessionPrice(settings.default_session_price);
          setDefaultCommissionPercentage(settings.default_commission_percentage);
          setSessionDurationDays(settings.session_duration_days);
        }
      } catch (error) {
        console.error("Error loading global chat settings:", error);
        toast({
          title: "Error",
          description: "Failed to load global chat settings.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [toast]);

  const handleSaveSettings = async () => {
    try {
      setLoading(true);
      await updateGlobalChatSettings({
        default_session_price: defaultSessionPrice,
        default_commission_percentage: defaultCommissionPercentage,
        session_duration_days: sessionDurationDays,
      });

      toast({
        title: "Success",
        description: "Global chat settings updated successfully.",
      });
    } catch (error) {
      console.error("Error updating global chat settings:", error);
      toast({
        title: "Error",
        description: "Failed to update global chat settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Admin Chat Settings</CardTitle>
            <CardDescription>
              Configure global settings for chat sessions.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="sessionPrice">Default Session Price</Label>
              <Input
                type="number"
                id="sessionPrice"
                value={defaultSessionPrice}
                onChange={(e) => setDefaultSessionPrice(Number(e.target.value))}
                placeholder="Enter default session price"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="commissionPercentage">Default Commission Percentage</Label>
              <Input
                type="number"
                id="commissionPercentage"
                value={defaultCommissionPercentage}
                onChange={(e) => setDefaultCommissionPercentage(Number(e.target.value))}
                placeholder="Enter default commission percentage"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sessionDuration">Session Duration (Days)</Label>
              <Input
                type="number"
                id="sessionDuration"
                value={sessionDurationDays}
                onChange={(e) => setSessionDurationDays(Number(e.target.value))}
                placeholder="Enter session duration in days"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSaveSettings} disabled={loading}>
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminChatSettings;
