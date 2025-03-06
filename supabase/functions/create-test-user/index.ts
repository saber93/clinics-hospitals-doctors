
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
    console.log(`Processing user creation/update for ${email} with role ${role}`)
    
    // Check if user already exists
    let existingUser = null
    try {
      const { data, error } = await supabaseClient.auth.admin.getUserByEmail(email)
      if (!error && data) {
        existingUser = data
        console.log(`Found existing user: ${email}`)
      }
    } catch (err) {
      console.log(`Error checking for existing user: ${err.message}`)
      // Continue as if user doesn't exist
    }
    
    let userId
    
    if (existingUser) {
      // Update existing user
      console.log(`Updating existing user: ${email}`)
      const { data, error } = await supabaseClient.auth.admin.updateUserById(
        existingUser.id,
        { 
          email,
          password,
          email_confirm: true,
          user_metadata: { role, name } 
        }
      )
      
      if (error) throw error
      
      userId = existingUser.id
      console.log(`Updated user ${email} successfully`)
    } else {
      // Create new user
      console.log(`Creating new user: ${email}`)
      const { data, error } = await supabaseClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { role, name }
      })
      
      if (error) {
        console.log(`Error creating user: ${JSON.stringify(error)}`)
        throw error
      }
      
      userId = data.user.id
      console.log(`Created user ${email} with ID ${userId} successfully`)
    }
    
    // Ensure profile exists with correct role
    if (userId) {
      console.log(`Updating profile for user ${userId} with role ${role}`)
      const { error } = await supabaseClient
        .from('profiles')
        .upsert({ 
          id: userId, 
          role,
          name 
        })
      
      if (error) {
        console.log(`Error updating profile: ${JSON.stringify(error)}`)
        throw error
      }
      
      console.log(`Profile updated successfully for ${email}`)
    }
    
    return new Response(
      JSON.stringify({ 
        success: true,
        message: existingUser 
          ? `User ${email} updated with role ${role}` 
          : `User ${email} created with role ${role}`,
        userId
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }, 
        status: existingUser ? 200 : 201 
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
