
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import DoctorChatSettings from "@/components/chat/DoctorChatSettings";
import AdminChatSettings from "@/components/chat/AdminChatSettings";

const ChatSettings = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.session.user.id)
            .single();
          
          setIsAdmin(profile?.role === 'admin');
          setIsDoctor(profile?.role === 'vendor');
        }
      } catch (error) {
        console.error('Error checking user role:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUserRole();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Chat Settings</h1>

        {isAdmin ? (
          <Tabs defaultValue="doctor" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="doctor">Doctor Settings</TabsTrigger>
              <TabsTrigger value="admin">Admin Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="doctor">
              <DoctorChatSettings />
            </TabsContent>
            
            <TabsContent value="admin">
              <AdminChatSettings />
            </TabsContent>
          </Tabs>
        ) : isDoctor ? (
          <DoctorChatSettings />
        ) : (
          <div className="text-center py-8">
            <p>You don't have permission to access chat settings</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSettings;
