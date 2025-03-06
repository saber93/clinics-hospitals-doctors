
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

console.log("Hello from create-test-user!")

serve(async (req) => {
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
    const { data: existingUsers, error: searchError } = await supabaseClient
      .from('profiles')
      .select('id')
      .eq('email', email)
      .limit(1)
    
    if (searchError) {
      throw searchError
    }
    
    if (existingUsers && existingUsers.length > 0) {
      // Update existing user
      const { error: updateError } = await supabaseClient
        .from('profiles')
        .update({ role })
        .eq('email', email)
      
      if (updateError) throw updateError
      
      return new Response(
        JSON.stringify({ message: `User ${email} role updated to ${role}` }),
        { headers: { 'Content-Type': 'application/json' }, status: 200 }
      )
    }
    
    // Create new user
    const { data, error: createError } = await supabaseClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role, name }
    })
    
    if (createError) throw createError
    
    return new Response(
      JSON.stringify({ message: `User ${email} created with role ${role}` }),
      { headers: { 'Content-Type': 'application/json' }, status: 201 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
