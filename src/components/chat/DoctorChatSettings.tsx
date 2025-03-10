import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { SaveIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getDoctorChatSettings, updateDoctorChatSettings, getGlobalChatSettings } from '@/services/chat/settingsService';

const DoctorChatSettingsComponent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<DoctorChatSettings | null>(null);
  const [globalSettings, setGlobalSettings] = useState<ChatSettings | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [offersFreeConsultation, setOffersFreeConsultation] = useState(false);
  const [sessionPrice, setSessionPrice] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setCurrentUser(data.session?.user || null);
        
        if (!data.session?.user) {
          toast.error('Please log in to access settings');
          return;
        }
        
        // Check if user is a doctor
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.session.user.id)
          .single();
        
        if (profile?.role !== 'vendor') {
          toast.error('Only doctors can access these settings');
          return;
        }
        
        // Load settings
        const doctorSettings = await getDoctorChatSettings(data.session.user.id);
        const chatSettings = await getGlobalChatSettings();
        
        setSettings(doctorSettings);
        setGlobalSettings(chatSettings);
        
        if (doctorSettings) {
          setOffersFreeConsultation(doctorSettings.offers_free_consultation);
          setSessionPrice(doctorSettings.session_price);
        } else if (chatSettings) {
          setSessionPrice(chatSettings.default_session_price);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);

  const handleSaveSettings = async () => {
    if (!currentUser || saving) return;
    
    setSaving(true);
    try {
      const updated = await updateDoctorChatSettings(
        currentUser.id,
        offersFreeConsultation,
        sessionPrice
      );
      
      if (updated) {
        setSettings(updated);
        toast.success('Settings saved successfully');
      }
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

  if (!currentUser) {
    return (
      <div className="text-center py-8">
        <p>Please log in to access settings</p>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Chat Settings</CardTitle>
        <CardDescription>
          Configure your chat preferences for patient consultations
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="free-consultation" className="text-base font-medium">
              Offer Free First Consultation
            </Label>
            <Switch
              id="free-consultation"
              checked={offersFreeConsultation}
              onCheckedChange={setOffersFreeConsultation}
            />
          </div>
          <p className="text-sm text-gray-500">
            When enabled, patients can start their first chat session with you without payment
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="session-price" className="text-base font-medium">
            Session Price
          </Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              $
            </span>
            <Input
              id="session-price"
              type="number"
              min="0"
              step="0.01"
              className="pl-7"
              value={sessionPrice !== null ? sessionPrice : ''}
              onChange={(e) => setSessionPrice(e.target.value ? parseFloat(e.target.value) : null)}
              placeholder={`Default: $${globalSettings?.default_session_price || 50}`}
            />
          </div>
          <p className="text-sm text-gray-500">
            Price for each paid chat session. Commission rate: {globalSettings?.default_commission_percentage || 10}%
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
  );
};

export default DoctorChatSettingsComponent;
