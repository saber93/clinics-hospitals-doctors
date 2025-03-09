
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

console.log("Hello from create-test-user!")

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Create Supabase admin client
const createSupabaseAdmin = () => {
  return createClient(
    // Supabase API URL - env var exposed by default.
    Deno.env.get('SUPABASE_URL') ?? '',
    // Supabase API ANON KEY - env var exposed by default.
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

// Validate the request role
const validateRole = (role: string) => {
  const validRoles = ['admin', 'vendor', 'client', 'doctor'];
  if (role && !validRoles.includes(role)) {
    throw new Error(`Invalid role: ${role}. Must be one of: ${validRoles.join(', ')}`);
  }
  return true;
}

// Find existing user by email
const findExistingUser = async (supabaseAdmin, email: string) => {
  console.log(`Checking for existing user with email: ${email}`);
  const { data: userData, error: listError } = await supabaseAdmin.auth.admin.listUsers({
    perPage: 1000 // Large value to ensure getting all users
  });
  
  if (listError) {
    console.error(`Error listing users: ${JSON.stringify(listError)}`);
    throw new Error(`Failed to list users: ${listError.message}`);
  }
  
  return userData?.users?.find(user => user.email === email);
}

// Clean up related data in proper order before deleting a user
const cleanupUserRelatedData = async (supabaseAdmin, userId: string) => {
  console.log(`Cleaning up related data for user ${userId} before deletion...`);
  
  // 1. Delete services
  console.log(`Deleting related services for user ${userId}`);
  const { error: deleteServicesError } = await supabaseAdmin
    .from('services')
    .delete()
    .eq('vendor_id', userId);
    
  if (deleteServicesError) {
    console.log(`Note: Error deleting services: ${JSON.stringify(deleteServicesError)}`);
  }
  
  // 2. Delete reservations
  console.log(`Deleting related reservations for user ${userId}`);
  const { error: deleteReservationsError } = await supabaseAdmin
    .from('reservations')
    .delete()
    .or(`client_id.eq.${userId},vendor_id.eq.${userId}`);
    
  if (deleteReservationsError) {
    console.log(`Note: Error deleting reservations: ${JSON.stringify(deleteReservationsError)}`);
  }
  
  // 3. Delete doctor chat settings
  console.log(`Deleting related doctor chat settings for user ${userId}`);
  const { error: deleteDoctorSettingsError } = await supabaseAdmin
    .from('doctor_chat_settings')
    .delete()
    .eq('doctor_id', userId);
    
  if (deleteDoctorSettingsError) {
    console.log(`Note: Error deleting doctor chat settings: ${JSON.stringify(deleteDoctorSettingsError)}`);
  }
  
  // 4. Delete chat messages
  console.log(`Deleting related chat messages for user ${userId}`);
  const { error: deleteMessagesError } = await supabaseAdmin
    .from('chat_messages')
    .delete()
    .eq('sender_id', userId);
    
  if (deleteMessagesError) {
    console.log(`Note: Error deleting chat messages: ${JSON.stringify(deleteMessagesError)}`);
  }
  
  // 5. Delete chat payments
  console.log(`Deleting related chat payments for user ${userId}`);
  const { error: deletePaymentsError } = await supabaseAdmin
    .from('chat_payments')
    .delete()
    .or(`patient_id.eq.${userId},doctor_id.eq.${userId}`);
    
  if (deletePaymentsError) {
    console.log(`Note: Error deleting chat payments: ${JSON.stringify(deletePaymentsError)}`);
  }
  
  // 6. Delete chat sessions
  console.log(`Deleting related chat sessions for user ${userId}`);
  const { error: deleteSessionsError } = await supabaseAdmin
    .from('chat_sessions')
    .delete()
    .or(`patient_id.eq.${userId},doctor_id.eq.${userId}`);
    
  if (deleteSessionsError) {
    console.log(`Note: Error deleting chat sessions: ${JSON.stringify(deleteSessionsError)}`);
  }
  
  // 7. Delete profile record
  console.log(`Deleting profile for user ${userId}`);
  const { error: deleteProfileError } = await supabaseAdmin
    .from('profiles')
    .delete()
    .eq('id', userId);
    
  if (deleteProfileError) {
    console.log(`Note: Error deleting profile: ${JSON.stringify(deleteProfileError)}`);
  }
}

// Delete existing user
const deleteExistingUser = async (supabaseAdmin, existingUser) => {
  try {
    // Clean up all related data first
    await cleanupUserRelatedData(supabaseAdmin, existingUser.id);
    
    // Wait to ensure all database operations have completed
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Now delete the auth user
    console.log(`Deleting user ${existingUser.id} from auth.users`);
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(existingUser.id);
    
    if (deleteError) {
      console.error(`Error deleting user: ${JSON.stringify(deleteError)}`);
      throw new Error(`Failed to delete user: ${deleteError.message}`);
    } else {
      console.log(`Successfully deleted user with email: ${existingUser.email} and ID: ${existingUser.id}`);
      
      // Wait after user deletion to ensure it's fully processed
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    }
  } catch (err) {
    console.error(`Error during user deletion process: ${err.message}`);
    throw err;
  }
}

// Create a new user
const createNewUser = async (supabaseAdmin, email: string, password: string, role: string, name: string) => {
  console.log(`Creating new user: ${email}`);
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role, name }
  });
  
  if (error) {
    console.error(`Error creating user: ${JSON.stringify(error)}`);
    throw new Error(`Failed to create user: ${error.message}`);
  }
  
  const userId = data.user.id;
  console.log(`Created user ${email} with ID ${userId} successfully`);
  
  // Wait for the user creation to propagate
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return userId;
}

// Create or update profile for a user
const createOrUpdateProfile = async (supabaseAdmin, userId: string, role: string, name: string) => {
  console.log(`Creating profile for user ${userId} with role ${role}`);
  
  // Create the profile record
  const { error: profileInsertError } = await supabaseAdmin
    .from('profiles')
    .upsert({ 
      id: userId, 
      role,
      name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    
  if (profileInsertError) {
    console.error(`Error creating profile: ${JSON.stringify(profileInsertError)}`);
    console.log(`Will continue despite profile creation error`);
    // Don't throw here, continue with the rest
  } else {
    console.log(`Profile created/updated successfully for user ${userId}`);
  }
  
  return userId;
}

// Set up doctor or vendor chat settings
const setupDoctorChatSettings = async (supabaseAdmin, userId: string, role: string) => {
  if (role === 'doctor' || role === 'vendor') {
    console.log(`Setting up doctor chat settings for user ${userId}`);
    
    const { error: settingsUpsertError } = await supabaseAdmin
      .from('doctor_chat_settings')
      .upsert({
        doctor_id: userId,
        offers_free_consultation: true,
        session_price: role === 'doctor' ? 85 : 75,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
    if (settingsUpsertError) {
      console.error(`Error creating doctor settings: ${JSON.stringify(settingsUpsertError)}`);
      console.log(`Will continue despite doctor settings error`);
      // Don't throw, continue with the response
    } else {
      console.log(`Doctor chat settings created/updated successfully for user ${userId}`);
    }
  }
  
  return userId;
}

// Main handler for processing user creation requests
const processUserCreation = async (req) => {
  try {
    const { email, password, role, name } = await req.json();
    
    // Validate role
    validateRole(role);
    
    console.log(`Processing user creation for ${email} with role ${role}`);
    
    const supabaseAdmin = createSupabaseAdmin();
    
    // Try to delete existing user first to ensure a clean setup
    try {
      const existingUser = await findExistingUser(supabaseAdmin, email);
      
      if (existingUser) {
        console.log(`Found existing user with email ${email}, ID ${existingUser.id}, cleaning up related data...`);
        await deleteExistingUser(supabaseAdmin, existingUser);
      } else {
        console.log(`No existing user found with email: ${email}`);
      }
    } catch (err) {
      console.error(`Error checking/deleting existing user: ${err.message}`);
      // Don't throw here, we'll try to create the user anyway
      console.log(`Continuing with user creation despite deletion error`);
    }
    
    // Create new user
    const userId = await createNewUser(supabaseAdmin, email, password, role, name);
    
    // Manually create or update profile
    await createOrUpdateProfile(supabaseAdmin, userId, role, name);
    
    // Set up doctor chat settings if needed
    await setupDoctorChatSettings(supabaseAdmin, userId, role);
    
    // Return success response
    console.log(`Test account created successfully for ${email} with role ${role}`);
    return new Response(
      JSON.stringify({ 
        success: true,
        message: `User ${email} created with role ${role}`,
        userId
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }, 
        status: 200
      }
    );
  } catch (error) {
    console.error("Error:", error.message);
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
}

// Main server function
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Process the request
  return processUserCreation(req);
})
