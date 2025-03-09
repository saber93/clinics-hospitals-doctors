
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Create a Supabase client with the Auth context of the function
  const supabaseAdmin = createClient(
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
  )

  // Now we can use supabase_admin to create users, etc
  try {
    const { email, password, role, name } = await req.json()
    
    // Validate role
    const validRoles = ['admin', 'vendor', 'client', 'doctor'];
    if (role && !validRoles.includes(role)) {
      throw new Error(`Invalid role: ${role}. Must be one of: ${validRoles.join(', ')}`);
    }
    
    console.log(`Processing user creation for ${email} with role ${role}`)
    
    // Try to delete existing user first to ensure a clean setup
    try {
      console.log(`Checking for existing user with email: ${email}`)
      const { data: userData, error: listError } = await supabaseAdmin.auth.admin.listUsers({
        perPage: 1000 // Large value to ensure getting all users
      });
      
      if (listError) {
        console.error(`Error listing users: ${JSON.stringify(listError)}`);
        throw new Error(`Failed to list users: ${listError.message}`);
      }
      
      const existingUser = userData?.users?.find(user => user.email === email);
      
      if (existingUser) {
        console.log(`Found existing user with email ${email}, ID ${existingUser.id}, cleaning up related data...`);
        
        // DELETE ALL RELATED DATA IN PROPER ORDER TO AVOID CONSTRAINT ERRORS
        
        // 1. First delete any related data in other tables
        console.log(`Deleting related services for user ${existingUser.id}`);
        const { error: deleteServicesError } = await supabaseAdmin
          .from('services')
          .delete()
          .eq('vendor_id', existingUser.id);
          
        if (deleteServicesError) {
          console.log(`Note: Error deleting services: ${JSON.stringify(deleteServicesError)}`);
        }
        
        console.log(`Deleting related reservations for user ${existingUser.id}`);
        const { error: deleteReservationsError } = await supabaseAdmin
          .from('reservations')
          .delete()
          .or(`client_id.eq.${existingUser.id},vendor_id.eq.${existingUser.id}`);
          
        if (deleteReservationsError) {
          console.log(`Note: Error deleting reservations: ${JSON.stringify(deleteReservationsError)}`);
        }
        
        console.log(`Deleting related doctor chat settings for user ${existingUser.id}`);
        const { error: deleteDoctorSettingsError } = await supabaseAdmin
          .from('doctor_chat_settings')
          .delete()
          .eq('doctor_id', existingUser.id);
          
        if (deleteDoctorSettingsError) {
          console.log(`Note: Error deleting doctor chat settings: ${JSON.stringify(deleteDoctorSettingsError)}`);
        }
        
        console.log(`Deleting related chat messages for user ${existingUser.id}`);
        const { error: deleteMessagesError } = await supabaseAdmin
          .from('chat_messages')
          .delete()
          .eq('sender_id', existingUser.id);
          
        if (deleteMessagesError) {
          console.log(`Note: Error deleting chat messages: ${JSON.stringify(deleteMessagesError)}`);
        }
        
        console.log(`Deleting related chat payments for user ${existingUser.id}`);
        const { error: deletePaymentsError } = await supabaseAdmin
          .from('chat_payments')
          .delete()
          .or(`patient_id.eq.${existingUser.id},doctor_id.eq.${existingUser.id}`);
          
        if (deletePaymentsError) {
          console.log(`Note: Error deleting chat payments: ${JSON.stringify(deletePaymentsError)}`);
        }
        
        console.log(`Deleting related chat sessions for user ${existingUser.id}`);
        const { error: deleteSessionsError } = await supabaseAdmin
          .from('chat_sessions')
          .delete()
          .or(`patient_id.eq.${existingUser.id},doctor_id.eq.${existingUser.id}`);
          
        if (deleteSessionsError) {
          console.log(`Note: Error deleting chat sessions: ${JSON.stringify(deleteSessionsError)}`);
        }
        
        // 2. Delete profile record BEFORE deleting the user
        console.log(`Deleting profile for user ${existingUser.id}`);
        const { error: deleteProfileError } = await supabaseAdmin
          .from('profiles')
          .delete()
          .eq('id', existingUser.id);
          
        if (deleteProfileError) {
          console.log(`Note: Error deleting profile: ${JSON.stringify(deleteProfileError)}`);
        }
        
        // 3. Wait a bit to ensure all database operations have completed
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 4. Now delete the auth user
        console.log(`Deleting user ${existingUser.id} from auth.users`);
        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(existingUser.id);
        
        if (deleteError) {
          console.error(`Error deleting user: ${JSON.stringify(deleteError)}`);
          throw new Error(`Failed to delete user: ${deleteError.message}`);
        } else {
          console.log(`Successfully deleted user with email: ${email} and ID: ${existingUser.id}`);
          
          // Wait after user deletion to ensure it's fully processed
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } else {
        console.log(`No existing user found with email: ${email}`);
      }
    } catch (err) {
      console.error(`Error checking/deleting existing user: ${err.message}`);
      // Don't throw here, we'll try to create the user anyway
      console.log(`Continuing with user creation despite deletion error`);
    }
    
    // Create new user
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
    
    // Manually create or update profile since we can't rely on the trigger
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
      console.log(`Profile created/updated successfully for ${email}`);
    }
    
    // If the user is a doctor or vendor, set up doctor chat settings
    if (role === 'doctor' || role === 'vendor') {
      console.log(`Setting up doctor chat settings for ${email}`);
      
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
        console.log(`Doctor chat settings created/updated successfully for ${email}`);
      }
    }
    
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
    )
  } catch (error) {
    console.error("Error:", error.message)
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
    )
  }
})
