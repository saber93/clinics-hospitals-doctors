
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

console.log("Hello from create-test-reservations!")

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

  try {
    const { reservations } = await req.json()
    console.log(`Processing reservation creation for ${reservations.length} reservations`)
    
    if (!Array.isArray(reservations) || reservations.length === 0) {
      throw new Error('Reservations array is required and must contain at least one reservation');
    }
    
    // Insert reservations using the service role (bypasses RLS)
    const { data: reservationsData, error: reservationsError } = await supabaseAdmin
      .from('reservations')
      .upsert(reservations)
      .select();
      
    if (reservationsError) {
      console.error(`Error inserting reservations: ${JSON.stringify(reservationsError)}`);
      throw new Error(`Failed to create reservations: ${reservationsError.message}`);
    }
    
    console.log(`Successfully created ${reservationsData.length} reservations`);
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Created ${reservationsData.length} reservations successfully`,
        reservations: reservationsData
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }, 
        status: 200
      }
    )
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Error:", errorMessage)
    return new Response(
      JSON.stringify({ 
        success: false,
        error: errorMessage 
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
