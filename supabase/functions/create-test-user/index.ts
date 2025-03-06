
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
  const supabaseClient = createClient(
    // Supabase API URL - env var exposed by default.
    Deno.env.get('SUPABASE_URL') ?? '',
    // Supabase API ANON KEY - env var exposed by default.
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    // Create client with Auth context of the function
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  )

  // Now we can use supabase_admin to create users, etc
  try {
    const { email, password, role, name } = await req.json()
    console.log(`Processing user creation for ${email} with role ${role}`)
    
    // Force delete any user that might have the same email (to ensure clean setup)
    try {
      console.log(`Attempting to delete existing user with email: ${email}`)
      const { data: userData } = await supabaseClient.auth.admin.listUsers();
      
      const existingUser = userData?.users?.find(user => user.email === email);
      
      if (existingUser) {
        console.log(`Found existing user with email ${email}, deleting...`);
        const { error: deleteError } = await supabaseClient.auth.admin.deleteUser(existingUser.id);
        
        if (deleteError) {
          console.log(`Error deleting user: ${JSON.stringify(deleteError)}`);
        } else {
          console.log(`Successfully deleted user with email: ${email}`);
        }
      } else {
        console.log(`No existing user found with email: ${email}`);
      }
    } catch (err) {
      console.log(`Error checking/deleting existing user: ${err.message}`);
    }
    
    // Create new user
    console.log(`Creating new user: ${email}`);
    const { data, error } = await supabaseClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role, name }
    });
    
    if (error) {
      console.log(`Error creating user: ${JSON.stringify(error)}`);
      throw error;
    }
    
    const userId = data.user.id;
    console.log(`Created user ${email} with ID ${userId} successfully`);
    
    // Create or update profile
    console.log(`Ensuring profile exists for user ${userId} with role ${role}`);
    
    // First check if profile already exists
    const { data: existingProfile } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
      
    if (existingProfile) {
      console.log(`Updating existing profile for ${email}`);
      const { error: profileUpdateError } = await supabaseClient
        .from('profiles')
        .update({ 
          role,
          name,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
        
      if (profileUpdateError) {
        console.log(`Error updating profile: ${JSON.stringify(profileUpdateError)}`);
        throw profileUpdateError;
      }
      console.log(`Profile updated successfully for ${email}`);
    } else {
      console.log(`Creating new profile for ${email}`);
      const { error: profileInsertError } = await supabaseClient
        .from('profiles')
        .insert({ 
          id: userId, 
          role,
          name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
      if (profileInsertError) {
        console.log(`Error creating profile: ${JSON.stringify(profileInsertError)}`);
        throw profileInsertError;
      }
      console.log(`Profile created successfully for ${email}`);
    }
    
    // Test login to verify credentials are working
    console.log(`Testing login credentials for ${email}`);
    const { data: loginTest, error: loginError } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });
    
    if (loginError) {
      console.log(`WARNING: Test login failed for ${email}: ${JSON.stringify(loginError)}`);
      return new Response(
        JSON.stringify({ 
          success: true,
          message: `User ${email} created with role ${role}, but test login failed!`,
          userId,
          warning: `Test login failed: ${loginError.message}`
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          }, 
          status: 200
        }
      );
    }
    
    console.log(`Test login succeeded for ${email}`);
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
    console.error("Error:", error)
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
