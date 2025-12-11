
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
    
    // First, check for existing services to avoid duplicates
    console.log("Checking for existing services with the same vendor ID and name")
    for (const service of services) {
      const { data: existingServices, error: checkError } = await supabaseAdmin
        .from('services')
        .select('id')
        .eq('vendor_id', service.vendor_id)
        .eq('name', service.name);
        
      if (checkError) {
        console.error(`Error checking for existing services: ${JSON.stringify(checkError)}`);
        throw new Error(`Failed to check for existing services: ${checkError.message}`);
      }
      
      if (existingServices && existingServices.length > 0) {
        console.log(`Service with name "${service.name}" already exists for this vendor, skipping`);
        // Remove the service from the array to avoid insertion
        const index = services.findIndex(s => s.vendor_id === service.vendor_id && s.name === service.name);
        if (index > -1) {
          services.splice(index, 1);
        }
      }
    }
    
    let servicesData = [];
    
    // Only insert if we have services left after deduplication
    if (services.length > 0) {
      // Insert services using the service role (bypasses RLS)
      const { data, error: servicesError } = await supabaseAdmin
        .from('services')
        .insert(services)
        .select();
        
      if (servicesError) {
        console.error(`Error inserting services: ${JSON.stringify(servicesError)}`);
        throw new Error(`Failed to create services: ${servicesError.message}`);
      }
      
      servicesData = data || [];
      console.log(`Successfully created ${servicesData.length} services`);
    } else {
      console.log("No new services to create after checking for duplicates");
    }
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Created or found ${servicesData.length} services successfully`,
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
