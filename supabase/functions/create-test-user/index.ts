
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
    console.log(`Processing user creation for ${email} with role ${role}`)
    
    // Force delete any user that might have the same email (to ensure clean setup)
    try {
      console.log(`Attempting to delete existing user with email: ${email}`)
      const { data: userData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
      
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
    
    // Create or update profile
    console.log(`Ensuring profile exists for user ${userId} with role ${role}`);
    
    // First check if profile already exists
    const { data: existingProfile, error: profileFetchError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
      
    if (profileFetchError) {
      console.error(`Error checking existing profile: ${JSON.stringify(profileFetchError)}`);
      throw new Error(`Failed to check existing profile: ${profileFetchError.message}`);
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
