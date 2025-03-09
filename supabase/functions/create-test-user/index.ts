
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
    
    // Force delete any user that might have the same email (to ensure clean setup)
    try {
      console.log(`Attempting to delete existing user with email: ${email}`)
      const { data: userData, error: listError } = await supabaseAdmin.auth.admin.listUsers({
        perPage: 1000 // Large value to ensure getting all users
      });
      
      if (listError) {
        console.error(`Error listing users: ${JSON.stringify(listError)}`);
        throw new Error(`Failed to list users: ${listError.message}`);
      }
      
      const existingUser = userData?.users?.find(user => user.email === email);
      
      if (existingUser) {
        console.log(`Found existing user with email ${email}, deleting...`);
        
        // First delete any related rows in other tables
        const { error: deleteServicesError } = await supabaseAdmin
          .from('services')
          .delete()
          .eq('vendor_id', existingUser.id);
          
        if (deleteServicesError) {
          console.log(`Note: Error deleting services: ${JSON.stringify(deleteServicesError)}`);
          // Continue execution - this is not fatal
        }
        
        const { error: deleteReservationsError } = await supabaseAdmin
          .from('reservations')
          .delete()
          .or(`client_id.eq.${existingUser.id},vendor_id.eq.${existingUser.id}`);
          
        if (deleteReservationsError) {
          console.log(`Note: Error deleting reservations: ${JSON.stringify(deleteReservationsError)}`);
          // Continue execution - this is not fatal
        }
        
        // Delete any doctor chat settings
        const { error: deleteDoctorSettingsError } = await supabaseAdmin
          .from('doctor_chat_settings')
          .delete()
          .eq('doctor_id', existingUser.id);
          
        if (deleteDoctorSettingsError) {
          console.log(`Note: Error deleting doctor chat settings: ${JSON.stringify(deleteDoctorSettingsError)}`);
          // Continue execution - this is not fatal
        }
        
        // Delete any chat messages
        const { error: deleteMessagesError } = await supabaseAdmin
          .from('chat_messages')
          .delete()
          .eq('sender_id', existingUser.id);
          
        if (deleteMessagesError) {
          console.log(`Note: Error deleting chat messages: ${JSON.stringify(deleteMessagesError)}`);
          // Continue execution - this is not fatal
        }
        
        // Delete any chat payments
        const { error: deletePaymentsError } = await supabaseAdmin
          .from('chat_payments')
          .delete()
          .or(`patient_id.eq.${existingUser.id},doctor_id.eq.${existingUser.id}`);
          
        if (deletePaymentsError) {
          console.log(`Note: Error deleting chat payments: ${JSON.stringify(deletePaymentsError)}`);
          // Continue execution - this is not fatal
        }
        
        // Delete any chat sessions
        const { error: deleteSessionsError } = await supabaseAdmin
          .from('chat_sessions')
          .delete()
          .or(`patient_id.eq.${existingUser.id},doctor_id.eq.${existingUser.id}`);
          
        if (deleteSessionsError) {
          console.log(`Note: Error deleting chat sessions: ${JSON.stringify(deleteSessionsError)}`);
          // Continue execution - this is not fatal
        }
        
        // Delete profile before deleting user
        const { error: deleteProfileError } = await supabaseAdmin
          .from('profiles')
          .delete()
          .eq('id', existingUser.id);
          
        if (deleteProfileError) {
          console.log(`Note: Error deleting profile: ${JSON.stringify(deleteProfileError)}`);
          // Continue execution - this is not fatal
        }
        
        // Now delete the user
        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(existingUser.id);
        
        if (deleteError) {
          console.error(`Error deleting user: ${JSON.stringify(deleteError)}`);
          throw new Error(`Failed to delete user: ${deleteError.message}`);
        } else {
          console.log(`Successfully deleted user with email: ${email}`);
        }
      } else {
        console.log(`No existing user found with email: ${email}`);
      }
    } catch (err) {
      console.error(`Error checking/deleting existing user: ${err.message}`);
      throw new Error(`Failed to check/delete existing user: ${err.message}`);
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
    
    // Wait a moment for the user creation trigger to fire
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Manually create or update profile if needed
    console.log(`Ensuring profile exists for user ${userId} with role ${role}`);
    
    // First check if profile already exists
    const { data: existingProfile, error: profileFetchError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
      
    if (profileFetchError) {
      console.error(`Error checking existing profile: ${JSON.stringify(profileFetchError)}`);
      // Don't throw here, we'll try to create it anyway
    }
      
    if (existingProfile) {
      console.log(`Updating existing profile for ${email}`);
      const { error: profileUpdateError } = await supabaseAdmin
        .from('profiles')
        .update({ 
          role,
          name,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
        
      if (profileUpdateError) {
        console.error(`Error updating profile: ${JSON.stringify(profileUpdateError)}`);
        throw new Error(`Failed to update profile: ${profileUpdateError.message}`);
      }
      console.log(`Profile updated successfully for ${email}`);
    } else {
      console.log(`Creating new profile for ${email}`);
      const { error: profileInsertError } = await supabaseAdmin
        .from('profiles')
        .insert({ 
          id: userId, 
          role,
          name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
      if (profileInsertError) {
        console.error(`Error creating profile: ${JSON.stringify(profileInsertError)}`);
        throw new Error(`Failed to create profile: ${profileInsertError.message}`);
      }
      console.log(`Profile created successfully for ${email}`);
    }
    
    // If the user is a doctor, set up doctor chat settings
    if (role === 'doctor' || role === 'vendor') {
      console.log(`Setting up doctor chat settings for ${email}`);
      
      // Check if chat settings already exist
      const { data: existingSettings, error: settingsFetchError } = await supabaseAdmin
        .from('doctor_chat_settings')
        .select('*')
        .eq('doctor_id', userId)
        .maybeSingle();
        
      if (settingsFetchError) {
        console.error(`Error checking existing doctor settings: ${JSON.stringify(settingsFetchError)}`);
        // Don't throw here, we'll try to create it anyway
      }
      
      if (existingSettings) {
        console.log(`Updating existing doctor chat settings for ${email}`);
        const { error: settingsUpdateError } = await supabaseAdmin
          .from('doctor_chat_settings')
          .update({
            offers_free_consultation: true,
            session_price: role === 'doctor' ? 85 : 75,
            updated_at: new Date().toISOString()
          })
          .eq('doctor_id', userId);
          
        if (settingsUpdateError) {
          console.error(`Error updating doctor settings: ${JSON.stringify(settingsUpdateError)}`);
          throw new Error(`Failed to update doctor settings: ${settingsUpdateError.message}`);
        }
        console.log(`Doctor chat settings updated successfully for ${email}`);
      } else {
        console.log(`Creating new doctor chat settings for ${email}`);
        const { error: settingsInsertError } = await supabaseAdmin
          .from('doctor_chat_settings')
          .insert({
            doctor_id: userId,
            offers_free_consultation: true,
            session_price: role === 'doctor' ? 85 : 75,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
        if (settingsInsertError) {
          console.error(`Error creating doctor settings: ${JSON.stringify(settingsInsertError)}`);
          throw new Error(`Failed to create doctor settings: ${settingsInsertError.message}`);
        }
        console.log(`Doctor chat settings created successfully for ${email}`);
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
