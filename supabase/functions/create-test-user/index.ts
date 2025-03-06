
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
    
    // Check if user already exists
    const { data: existingUser, error: userError } = await supabaseClient.auth
      .admin.getUserByEmail(email)
    
    if (userError && userError.status !== 400) {
      throw userError
    }
    
    if (existingUser) {
      // Update existing user - first update auth metadata
      const { error: updateUserError } = await supabaseClient.auth.admin.updateUserById(
        existingUser.id,
        { email_confirm: true, user_metadata: { role, name } }
      )
      
      if (updateUserError) throw updateUserError
      
      // Then update profile
      const { error: updateProfileError } = await supabaseClient
        .from('profiles')
        .update({ role, name })
        .eq('id', existingUser.id)
      
      if (updateProfileError) throw updateProfileError
      
      return new Response(
        JSON.stringify({ message: `User ${email} updated with role ${role}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }
    
    // Create new user
    const { data: newUser, error: createError } = await supabaseClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role, name }
    })
    
    if (createError) throw createError
    
    // Ensure profile exists (the trigger might have created it, but let's be sure)
    const { error: upsertError } = await supabaseClient
      .from('profiles')
      .upsert({ 
        id: newUser.user.id, 
        role,
        name 
      })
    
    if (upsertError) throw upsertError
    
    return new Response(
      JSON.stringify({ message: `User ${email} created with role ${role}` }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 201 }
    )
  } catch (error) {
    console.error("Error:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
