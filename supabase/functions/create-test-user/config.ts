
// Configuration and utility constants
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const validRoles = ['admin', 'vendor', 'client', 'doctor'];

// Delay function to give Supabase time between operations
export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
