
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Settings } from "lucide-react";

interface ProfileFormValues {
  name: string;
}

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);

  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast.error("You need to be logged in to view your settings");
          navigate('/login');
          return;
        }
        
        setUser(user);
        
        // Get user profile data
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        
        if (error) {
          console.error("Error fetching profile:", error);
          toast.error("Error loading profile data");
        } else if (data) {
          setProfileData(data);
          // Set form values
          form.reset({
            name: data.name || '',
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Error loading profile data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [navigate, form]);

  const onSubmit = async (formValues: ProfileFormValues) => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formValues.name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
      
      if (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      } else {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 pt-24 pb-10 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24 pb-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <Settings className="h-6 w-6 text-gray-500" />
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal information and how your profile appears
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={user?.email || ""} 
                      disabled 
                      className="bg-gray-100 cursor-not-allowed"
                    />
                    <p className="text-sm text-muted-foreground mt-1">Email cannot be changed</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="role">Account Type</Label>
                    <Input 
                      id="role" 
                      value={(profileData?.role || "client").charAt(0).toUpperCase() + (profileData?.role || "client").slice(1)} 
                      disabled 
                      className="bg-gray-100 cursor-not-allowed"
                    />
                    <p className="text-sm text-muted-foreground mt-1">Account type cannot be changed</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/profile')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving || !form.formState.isDirty}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileSettings;
