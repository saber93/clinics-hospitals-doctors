
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

console.log("Hello from create-test-services!")

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
    const { services } = await req.json()
    console.log(`Processing service creation for ${services.length} services`)
    
    if (!Array.isArray(services) || services.length === 0) {
      throw new Error('Services array is required and must contain at least one service');
    }
    
    // Insert services using the service role (bypasses RLS)
    const { data: servicesData, error: servicesError } = await supabaseAdmin
      .from('services')
      .upsert(services, { onConflict: 'vendor_id, name' })
      .select();
      
    if (servicesError) {
      console.error(`Error inserting services: ${JSON.stringify(servicesError)}`);
      throw new Error(`Failed to create services: ${servicesError.message}`);
    }
    
    console.log(`Successfully created ${servicesData.length} services`);
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Created ${servicesData.length} services successfully`,
        services: servicesData
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
