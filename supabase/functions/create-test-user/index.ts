
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

console.log("Hello from create-test-user!")

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Delay function to give Supabase time between operations
async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Create Supabase admin client
function createSupabaseAdmin() {
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

// Validate the request parameters
function validateRequestParams(email: string, password: string, role: string, name: string) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  const validRoles = ['admin', 'vendor', 'client', 'doctor'];
  if (role && !validRoles.includes(role)) {
    throw new Error(`Invalid role: ${role}. Must be one of: ${validRoles.join(', ')}`);
  }
  
  return true;
}

// Fetch existing users with the same email
async function findExistingUserByEmail(supabase, email: string) {
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
    const existingUser = userData?.users?.find(user => user.email === email);
    console.log(`User search result for ${email}: ${existingUser ? 'Found' : 'Not found'}`);
    
    // Extra check: Ensure this is not the problematic user ID
    if (existingUser && existingUser.id === '00000000-0000-0000-0000-000000000099') {
      console.error(`Found corrupted user ID: ${existingUser.id}`);
      // Return a special flag that indicates we need to force recreation
      return { ...existingUser, forceRecreate: true };
    }
    
    return existingUser;
  } catch (err) {
    console.error(`Error searching for existing user: ${err.message}`);
    throw err;
  }
}

// Check if a profile with the given name and role exists to prevent conflicts
async function checkExistingProfile(supabase, name: string, role: string) {
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
  } catch (err) {
    console.error(`Error in checkExistingProfile: ${err.message}`);
    // Don't throw here, just continue - this is just a check
    return null;
  }
}

// Delete profile data first to avoid foreign key constraints
async function deleteUserProfileData(supabase, userId: string) {
  console.log(`Starting cleanup for user ID: ${userId}`);
  
  try {
    // Skip deletion if it's the problematic UUID - we can't modify this anyway
    if (userId === '00000000-0000-0000-0000-000000000099') {
      console.log(`Skipping deletion of problematic UUID: ${userId}`);
      return true;
    }
    
    // 1. Delete services associated with this user
    console.log(`Deleting services for user ${userId}`);
    await supabase.from('services').delete().eq('vendor_id', userId);
    await delay(300);
    
    // 2. Delete doctor chat settings
    console.log(`Deleting doctor chat settings for user ${userId}`);
    await supabase.from('doctor_chat_settings').delete().eq('doctor_id', userId);
    await delay(300);
    
    // 3. Delete reservations involving this user
    console.log(`Deleting reservations for user ${userId}`);
    await supabase.from('reservations').delete().or(`client_id.eq.${userId},vendor_id.eq.${userId}`);
    await delay(300);
    
    // 4. Delete chat sessions involving this user
    console.log(`Deleting chat sessions for user ${userId}`);
    await supabase.from('chat_sessions').delete().or(`patient_id.eq.${userId},doctor_id.eq.${userId}`);
    await delay(300);
    
    // 5. Delete chat messages sent by this user
    console.log(`Deleting chat messages for user ${userId}`);
    await supabase.from('chat_messages').delete().eq('sender_id', userId);
    await delay(300);
    
    // 6. Delete chat payments involving this user
    console.log(`Deleting chat payments for user ${userId}`);
    await supabase.from('chat_payments').delete().or(`patient_id.eq.${userId},doctor_id.eq.${userId}`);
    await delay(300);
    
    // 7. Finally delete the profile
    console.log(`Deleting profile for user ${userId}`);
    await supabase.from('profiles').delete().eq('id', userId);
    await delay(300);
    
    console.log(`Successfully completed cleanup for user ${userId}`);
    return true;
  } catch (err) {
    console.error(`Error during user data cleanup: ${err.message}`);
    // Continue despite errors - we still want to try to delete the user
    return false;
  }
}

// Delete an existing user
async function deleteExistingUser(supabase, existingUser) {
  if (!existingUser || !existingUser.id) {
    console.log("No existing user to delete");
    return;
  }
  
  // Special handling for the problematic UUID
  if (existingUser.id === '00000000-0000-0000-0000-000000000099' || existingUser.forceRecreate) {
    console.log(`Found problematic UUID ${existingUser.id}. Cannot delete via normal API.`);
    console.log(`Will attempt to create a new user with the same email and update the profile.`);
    return true;
  }
  
  try {
    console.log(`Attempting to delete existing user ${existingUser.id} (${existingUser.email})`);
    
    // First delete all profile data
    await deleteUserProfileData(supabase, existingUser.id);
    
    // Add a delay to ensure all DB operations complete
    await delay(1000);
    
    // Now delete the actual user from auth.users
    console.log(`Deleting user ${existingUser.id} from auth.users`);
    const { error: deleteError } = await supabase.auth.admin.deleteUser(existingUser.id);
    
    if (deleteError) {
      console.error(`Error deleting user: ${JSON.stringify(deleteError)}`);
      throw new Error(`Failed to delete user: ${deleteError.message}`);
    }
    
    console.log(`Successfully deleted user: ${existingUser.email}`);
    
    // Wait after deletion to ensure it's processed
    await delay(1500);
    return true;
  } catch (err) {
    console.error(`Error deleting user: ${err.message}`);
    throw err;
  }
}

// Create a new user
async function createNewUser(supabase, email: string, password: string, role: string, name: string) {
  try {
    console.log(`Creating new user: ${email} with role ${role}`);
    
    const userParams = {
      email,
      password,
      email_confirm: true,
      user_metadata: { role, name }
    };
    
    const { data, error } = await supabase.auth.admin.createUser(userParams);
    
    if (error) {
      console.error(`Error creating user: ${JSON.stringify(error)}`);
      throw new Error(`Failed to create user: ${error.message}`);
    }
    
    if (!data.user || !data.user.id) {
      throw new Error("User created but no user ID returned");
    }
    
    // Extra validation to ensure we don't have the problematic UUID
    if (data.user.id === '00000000-0000-0000-0000-000000000099') {
      throw new Error("User created with invalid UUID: 00000000-0000-0000-0000-000000000099. This account cannot be used.");
    }
    
    const userId = data.user.id;
    console.log(`User created successfully with ID: ${userId}`);
    
    // Wait for user creation to propagate
    await delay(2000);
    
    return userId;
  } catch (err) {
    console.error(`Error creating user: ${err.message}`);
    throw err;
  }
}

// Create or update the user's profile
async function createUserProfile(supabase, userId: string, role: string, name: string) {
  try {
    console.log(`Creating profile for user ${userId} with role ${role}`);
    
    // Special case for problematic UUID - we can't create or update this profile
    if (userId === '00000000-0000-0000-0000-000000000099') {
      console.error(`Cannot create profile for invalid UUID: ${userId}`);
      throw new Error("Unable to create profile for invalid UUID: 00000000-0000-0000-0000-000000000099");
    }
    
    const profileData = {
      id: userId,
      role,
      name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from('profiles')
      .upsert(profileData, { onConflict: 'id' });
      
    if (error) {
      console.error(`Error creating profile: ${JSON.stringify(error)}`);
      throw new Error(`Failed to create profile: ${error.message}`);
    }
    
    console.log(`Profile created successfully for user ${userId}`);
    await delay(500);
    return true;
  } catch (err) {
    console.error(`Error creating profile: ${err.message}`);
    throw err;
  }
}

// Set up doctor chat settings if needed
async function setupSpecializedSettings(supabase, userId: string, role: string) {
  if (role !== 'doctor' && role !== 'vendor') {
    return true;
  }
  
  // Skip for problematic UUID
  if (userId === '00000000-0000-0000-0000-000000000099') {
    console.error(`Cannot set up doctor settings for invalid UUID: ${userId}`);
    return false;
  }
  
  try {
    console.log(`Setting up doctor chat settings for ${role} user ${userId}`);
    
    const settingsData = {
      doctor_id: userId,
      offers_free_consultation: true,
      session_price: role === 'doctor' ? 85 : 75,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from('doctor_chat_settings')
      .upsert(settingsData, { onConflict: 'doctor_id' });
      
    if (error) {
      console.error(`Error creating doctor settings: ${JSON.stringify(error)}`);
      throw new Error(`Failed to create doctor settings: ${error.message}`);
    }
    
    console.log(`Doctor chat settings created successfully for user ${userId}`);
    return true;
  } catch (err) {
    console.error(`Error setting up doctor chat settings: ${err.message}`);
    throw err;
  }
}

// Main function to process account creation
async function processAccountCreation(email: string, password: string, role: string, name: string) {
  const supabase = createSupabaseAdmin();
  
  console.log(`=== Starting account creation process for ${email} with role ${role} and name ${name} ===`);
  
  try {
    // 1. Verify parameters
    validateRequestParams(email, password, role, name);
    
    // Check if there's an existing profile with the same name and role (to avoid conflicts)
    const existingProfileWithName = await checkExistingProfile(supabase, name, role);
    if (existingProfileWithName) {
      // Skip if the profile has the problematic UUID
      if (existingProfileWithName.id === '00000000-0000-0000-0000-000000000099') {
        console.log(`Found existing profile with problematic UUID: ${existingProfileWithName.id}`);
        // Continue to recreate this user properly
      } else {
        console.log(`Found existing profile with name ${name} and role ${role}, will use this ID: ${existingProfileWithName.id}`);
        return {
          success: true,
          message: `User with name ${name} and role ${role} already exists`,
          userId: existingProfileWithName.id
        };
      }
    }
    
    // 2. Check for & delete existing user with the same email
    const existingUser = await findExistingUserByEmail(supabase, email);
    if (existingUser) {
      // Special handling for the problematic UUID
      if (existingUser.id === '00000000-0000-0000-0000-000000000099' || existingUser.forceRecreate) {
        console.log(`Found existing user with email ${email} and problematic UUID ${existingUser.id}`);
        console.log(`Will attempt to force delete and recreate this user.`);
        
        // For the problematic user, we need to try to clean up as much as possible
        await deleteUserProfileData(supabase, existingUser.id);
        
        // Note: We can't actually delete the auth user with this UUID, so we'll
        // just try to create a new user with the same email which will likely fail
        // unless we delete and recreate via the Supabase dashboard
        console.log(`Warning: Cannot delete user with ID ${existingUser.id} via API.`);
        console.log(`Manual intervention may be required in the Supabase dashboard.`);
      } else {
        console.log(`Found existing user with email ${email}, will delete first`);
        await deleteExistingUser(supabase, existingUser);
        await delay(2000);
      }
    }
    
    // 3. Create new user
    let userId;
    try {
      userId = await createNewUser(supabase, email, password, role, name);
    } catch (error) {
      if (error.message && error.message.includes("duplicate key value")) {
        console.error(`User already exists with email ${email}. Cannot create duplicate.`);
        throw new Error(`Cannot create duplicate user with email ${email}. Manual cleanup may be required.`);
      }
      throw error;
    }
    
    // 4. Wait a bit after user creation
    await delay(1500);
    
    // 5. Create or update profile
    await createUserProfile(supabase, userId, role, name);
    
    // 6. Set up specialized settings if needed
    await setupSpecializedSettings(supabase, userId, role);
    
    console.log(`=== Account creation completed successfully for ${email} ===`);
    
    return {
      success: true,
      message: `User ${email} created with role ${role}`,
      userId
    };
  } catch (error) {
    console.error(`Account creation failed: ${error.message}`);
    throw error;
  }
}

// Main server handler
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received request to create test user");
    
    // Parse JSON body with better error handling
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (e) {
      console.error("Failed to parse request body:", e);
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Invalid JSON in request body"
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          }, 
          status: 400
        }
      );
    }
    
    const { email, password, role, name } = requestBody;
    
    // Validate required fields
    if (!email || !password || !role || !name) {
      console.error("Missing required parameters");
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Missing required parameters: email, password, role, and name are all required"
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          }, 
          status: 400
        }
      );
    }
    
    console.log(`Processing request for email: ${email}, role: ${role}, name: ${name}`);
    const result = await processAccountCreation(email, password, role, name);
    
    return new Response(
      JSON.stringify(result),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }, 
        status: 200
      }
    );
  } catch (error) {
    console.error(`Error processing request: ${error.message}`);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }, 
        status: 400
      }
    );
  }
})
