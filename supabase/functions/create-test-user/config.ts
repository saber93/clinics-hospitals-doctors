
// Configuration and utility constants
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Ensure center is included in the valid roles
export const validRoles = ['admin', 'vendor', 'client', 'doctor', 'center'];

// Delay function to give Supabase time between operations
export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
