
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // Use service role key for webhook
      { auth: { persistSession: false } }
    );

    // Get the request body
    const { payment_id, status, transaction_id, provider } = await req.json();
    
    // Basic validation
    if (!payment_id || !status || !provider) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Update the payment status in the database
    const { data, error } = await supabaseClient
      .from('chat_payments')
      .update({
        payment_status: status,
        transaction_id: transaction_id || null
      })
      .eq('id', payment_id)
      .select()
      .single();

    if (error) {
      console.error('Error updating payment status:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to update payment status' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // If payment is completed, update the chat session status
    if (status === 'completed') {
      await supabaseClient
        .from('chat_sessions')
        .update({ status: 'active', last_activity: new Date().toISOString() })
        .eq('id', data.session_id);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
