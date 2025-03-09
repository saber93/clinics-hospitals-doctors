
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
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the request body
    const { provider, amount, sessionId, patientId, doctorId, commission, returnUrl } = await req.json();
    
    // Basic validation
    if (!provider || !amount || !sessionId || !patientId || !doctorId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Get the payment provider API key
    const apiKey = provider === 'tabby' 
      ? Deno.env.get('TABBY_API_KEY') 
      : Deno.env.get('TAMARA_API_KEY');

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: `${provider} API key not configured` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Get patient details
    const { data: patientData, error: patientError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', patientId)
      .single();

    if (patientError) {
      console.error('Error fetching patient details:', patientError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch patient details' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // In a real implementation, we would call the payment provider's API
    // For now, we'll simulate a successful response
    
    // Create a payment record in the database
    const commissionAmount = (amount * commission) / 100;
    const doctorAmount = amount - commissionAmount;
    
    const { data: paymentData, error: paymentError } = await supabaseClient
      .from('chat_payments')
      .insert({
        session_id: sessionId,
        patient_id: patientId,
        doctor_id: doctorId,
        amount,
        commission_percentage: commission,
        commission_amount: commissionAmount,
        doctor_amount: doctorAmount,
        payment_method: provider === 'tabby' || provider === 'tamara' ? 'installment' : 'direct',
        payment_status: 'pending',
        payment_provider: provider
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Error creating payment record:', paymentError);
      return new Response(
        JSON.stringify({ error: 'Failed to create payment record' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Simulate a payment URL response
    const paymentUrl = provider === 'tabby' || provider === 'tamara'
      ? `${provider === 'tabby' ? 'https://checkout.tabby.ai' : 'https://checkout.tamara.co'}?amount=${amount}&session=${sessionId}&returnUrl=${returnUrl}&paymentId=${paymentData.id}`
      : null;

    // For direct payments, simulate a transaction ID
    const transactionId = provider !== 'tabby' && provider !== 'tamara'
      ? `${provider}_${Date.now()}`
      : null;

    // For direct payments, update the payment status to completed
    if (transactionId) {
      await supabaseClient
        .from('chat_payments')
        .update({
          payment_status: 'completed',
          transaction_id: transactionId
        })
        .eq('id', paymentData.id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        payment_url: paymentUrl,
        payment_id: paymentData.id,
        transaction_id: transactionId,
        is_direct_payment: !(provider === 'tabby' || provider === 'tamara')
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing payment:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
