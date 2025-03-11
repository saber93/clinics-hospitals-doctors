
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from './config.ts';
import { processAccountCreation } from './accountCreator.ts';

console.log("Hello from create-test-user!")

serve(async (req) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log("Received request to create test user");
    
    // Parse JSON body with better error handling
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (e) {
      console.error("Failed to parse request body:", e);
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Invalid JSON in request body"
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          }, 
          status: 400
        }
      );
    }
    
    const { email, password, role, name } = requestBody;
    
    // Validate required fields
    if (!email || !password || !role || !name) {
      console.error("Missing required parameters");
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Missing required parameters: email, password, role, and name are all required"
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          }, 
          status: 400
        }
      );
    }
    
    console.log(`Processing request for email: ${email}, role: ${role}, name: ${name}`);
    const result = await processAccountCreation(email, password, role, name);
    
    return new Response(
      JSON.stringify(result),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    );
  } catch (error: any) {
    console.error(`Error processing request: ${error.message}`);
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
        status: 500
      }
    );
  }
})
