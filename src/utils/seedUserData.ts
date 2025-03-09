
import { supabase } from "@/integrations/supabase/client";

/**
 * Create a test user account via edge function
 */
export const createTestUser = async (email: string, password: string, role: string, name: string) => {
  console.log(`Creating ${role} account...`);
  const { data, error } = await supabase.functions.invoke('create-test-user', {
    body: { email, password, role, name }
  });
  
  if (error) {
    console.error(`Error calling create-test-user function for ${role}:`, error);
    throw new Error(error.message || `Unknown error creating ${role}`);
  } 
  
  if (!data?.success) {
    console.error(`Error creating ${role} account:`, data?.error);
    throw new Error(data?.error || `Unknown error creating ${role}`);
  }
  
  console.log(`${role} account created or updated successfully`, data);
  return data;
};
