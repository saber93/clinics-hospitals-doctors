
import { supabase } from "@/integrations/supabase/client";

/**
 * Create a test user account via edge function
 */
export const createTestUser = async (email: string, password: string, role: string, name: string) => {
  console.log(`Creating ${role} account...`);
  
  try {
    // First check if the user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('name', name)
      .eq('role', role)
      .maybeSingle();
      
    if (checkError) {
      console.error(`Error checking for existing ${role} account:`, checkError);
    }
    
    if (existingUser) {
      console.log(`${role} account with name ${name} already exists, returning existing account`);
      return { userId: existingUser.id, email, role, name };
    }
    
    // Create the user if they don't exist
    console.log(`Calling edge function to create ${role} account with email: ${email}`);
    
    // Add retry logic for edge function calls
    let attempts = 0;
    const maxAttempts = 3;
    let lastError = null;
    
    while (attempts < maxAttempts) {
      try {
        const { data, error } = await supabase.functions.invoke('create-test-user', {
          body: { email, password, role, name }
        });
        
        if (error) {
          console.error(`Error calling create-test-user function for ${role} (attempt ${attempts + 1}):`, error);
          lastError = error;
          attempts++;
          
          if (attempts < maxAttempts) {
            console.log(`Retrying in ${attempts * 500}ms...`);
            await new Promise(resolve => setTimeout(resolve, attempts * 500));
            continue;
          }
          break;
        } 
        
        if (!data?.success) {
          console.error(`Error creating ${role} account (attempt ${attempts + 1}):`, data?.error || 'Unknown error');
          lastError = new Error(data?.error || `Unknown error creating ${role}`);
          attempts++;
          
          if (attempts < maxAttempts) {
            console.log(`Retrying in ${attempts * 500}ms...`);
            await new Promise(resolve => setTimeout(resolve, attempts * 500));
            continue;
          }
          break;
        }
        
        console.log(`${role} account created successfully with ID: ${data.userId}`);
        return { userId: data.userId, email, role, name };
      } catch (attemptError) {
        console.error(`Exception in createTestUser for ${role} (attempt ${attempts + 1}):`, attemptError);
        lastError = attemptError;
        attempts++;
        
        if (attempts < maxAttempts) {
          console.log(`Retrying in ${attempts * 500}ms...`);
          await new Promise(resolve => setTimeout(resolve, attempts * 500));
        }
      }
    }
    
    // If we reach here, all attempts failed
    console.error(`All ${maxAttempts} attempts to create ${role} account failed`);
    throw lastError || new Error(`Failed to create ${role} account after ${maxAttempts} attempts`);
  } catch (error) {
    console.error(`Error in createTestUser for ${role}:`, error);
    throw error;
  }
};
