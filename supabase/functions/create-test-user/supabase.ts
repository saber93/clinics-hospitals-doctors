
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { delay } from './config.ts';

// Create Supabase admin client
export function createSupabaseAdmin() {
  return createClient(
    // Supabase API URL - env var exposed by default.
    Deno.env.get('SUPABASE_URL') ?? '',
    // Supabase API SERVICE ROLE KEY - env var exposed by default.
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    // Create client with Auth context of the function
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}

// Check if a profile with the given name and role exists to prevent conflicts
export async function checkExistingProfile(supabase: any, name: string, role: string) {
  console.log(`Checking for existing profile with name: ${name} and role: ${role}`);
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('name', name)
      .eq('role', role)
      .maybeSingle();
    
    if (error) {
      console.error(`Error checking for existing profile: ${JSON.stringify(error)}`);
      // Don't throw here, just continue - this is just a check
      return null;
    }
    
    // Extra validation for the problematic UUID
    if (data && data.id === '00000000-0000-0000-0000-000000000099') {
      console.error(`Found problematic profile with invalid UUID: ${data.id}`);
      return null; // Treat as if no profile was found
    }
    
    console.log(`Profile search result: ${data ? 'Found profile with ID ' + data.id : 'No profile found'}`);
    return data;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Error in checkExistingProfile: ${errorMessage}`);
    // Don't throw here, just continue - this is just a check
    return null;
  }
}

// Fetch existing users with the same email
export async function findExistingUserByEmail(supabase: any, email: string) {
  console.log(`Checking for existing user with email: ${email}`);
  try {
    // Use the admin listUsers API to find existing users
    const { data: userData, error: listError } = await supabase.auth.admin.listUsers({
      perPage: 1000 // Large value to ensure getting all users
    });
    
    if (listError) {
      console.error(`Error listing users: ${JSON.stringify(listError)}`);
      throw new Error(`Failed to list users: ${listError.message}`);
    }
    
    // Find user by email
    const existingUser = userData?.users?.find((user: { email: string }) => user.email === email);
    console.log(`User search result for ${email}: ${existingUser ? 'Found' : 'Not found'}`);
    
    // Extra check: Ensure this is not the problematic user ID
    if (existingUser && existingUser.id === '00000000-0000-0000-0000-000000000099') {
      console.error(`Found corrupted user ID: ${existingUser.id}`);
      // Return a special flag that indicates we need to force recreation
      return { ...existingUser, forceRecreate: true };
    }
    
    return existingUser;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Error searching for existing user: ${errorMessage}`);
    throw err;
  }
}
