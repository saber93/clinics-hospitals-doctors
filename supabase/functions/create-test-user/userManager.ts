
import { delay } from './config.ts';

// Delete profile data first to avoid foreign key constraints
export async function deleteUserProfileData(supabase: any, userId: string) {
  console.log(`Starting cleanup for user ID: ${userId}`);
  
  try {
    // Skip deletion if it's the problematic UUID - we can't modify this anyway
    if (userId === '00000000-0000-0000-0000-000000000099') {
      console.log(`Skipping deletion of problematic UUID: ${userId}`);
      return true;
    }
    
    // 1. Delete services associated with this user
    console.log(`Deleting services for user ${userId}`);
    await supabase.from('services').delete().eq('vendor_id', userId);
    await delay(300);
    
    // 2. Delete doctor chat settings
    console.log(`Deleting doctor chat settings for user ${userId}`);
    await supabase.from('doctor_chat_settings').delete().eq('doctor_id', userId);
    await delay(300);
    
    // 3. Delete reservations involving this user
    console.log(`Deleting reservations for user ${userId}`);
    await supabase.from('reservations').delete().or(`client_id.eq.${userId},vendor_id.eq.${userId}`);
    await delay(300);
    
    // 4. Delete chat sessions involving this user
    console.log(`Deleting chat sessions for user ${userId}`);
    await supabase.from('chat_sessions').delete().or(`patient_id.eq.${userId},doctor_id.eq.${userId}`);
    await delay(300);
    
    // 5. Delete chat messages sent by this user
    console.log(`Deleting chat messages for user ${userId}`);
    await supabase.from('chat_messages').delete().eq('sender_id', userId);
    await delay(300);
    
    // 6. Delete chat payments involving this user
    console.log(`Deleting chat payments for user ${userId}`);
    await supabase.from('chat_payments').delete().or(`patient_id.eq.${userId},doctor_id.eq.${userId}`);
    await delay(300);
    
    // 7. Finally delete the profile
    console.log(`Deleting profile for user ${userId}`);
    await supabase.from('profiles').delete().eq('id', userId);
    await delay(300);
    
    console.log(`Successfully completed cleanup for user ${userId}`);
    return true;
  } catch (err) {
    console.error(`Error during user data cleanup: ${err.message}`);
    // Continue despite errors - we still want to try to delete the user
    return false;
  }
}

// Delete an existing user
export async function deleteExistingUser(supabase: any, existingUser: any) {
  if (!existingUser || !existingUser.id) {
    console.log("No existing user to delete");
    return;
  }
  
  // Special handling for the problematic UUID
  if (existingUser.id === '00000000-0000-0000-0000-000000000099' || existingUser.forceRecreate) {
    console.log(`Found problematic UUID ${existingUser.id}. Cannot delete via normal API.`);
    console.log(`Will attempt to create a new user with the same email and update the profile.`);
    return true;
  }
  
  try {
    console.log(`Attempting to delete existing user ${existingUser.id} (${existingUser.email})`);
    
    // First delete all profile data
    await deleteUserProfileData(supabase, existingUser.id);
    
    // Add a delay to ensure all DB operations complete
    await delay(1000);
    
    // Now delete the actual user from auth.users
    console.log(`Deleting user ${existingUser.id} from auth.users`);
    const { error: deleteError } = await supabase.auth.admin.deleteUser(existingUser.id);
    
    if (deleteError) {
      console.error(`Error deleting user: ${JSON.stringify(deleteError)}`);
      throw new Error(`Failed to delete user: ${deleteError.message}`);
    }
    
    console.log(`Successfully deleted user: ${existingUser.email}`);
    
    // Wait after deletion to ensure it's processed
    await delay(1500);
    return true;
  } catch (err) {
    console.error(`Error deleting user: ${err.message}`);
    throw err;
  }
}

// Create a new user
export async function createNewUser(supabase: any, email: string, password: string, role: string, name: string) {
  try {
    console.log(`Creating new user: ${email} with role ${role}`);
    
    const userParams = {
      email,
      password,
      email_confirm: true,
      user_metadata: { role, name }
    };
    
    const { data, error } = await supabase.auth.admin.createUser(userParams);
    
    if (error) {
      console.error(`Error creating user: ${JSON.stringify(error)}`);
      throw new Error(`Failed to create user: ${error.message}`);
    }
    
    if (!data.user || !data.user.id) {
      throw new Error("User created but no user ID returned");
    }
    
    // Extra validation to ensure we don't have the problematic UUID
    if (data.user.id === '00000000-0000-0000-0000-000000000099') {
      throw new Error("User created with invalid UUID: 00000000-0000-0000-0000-000000000099. This account cannot be used.");
    }
    
    const userId = data.user.id;
    console.log(`User created successfully with ID: ${userId}`);
    
    // Wait for user creation to propagate
    await delay(1500);
    
    return userId;
  } catch (err) {
    console.error(`Error creating user: ${err.message}`);
    throw err;
  }
}

// Create or update the user's profile
export async function createUserProfile(supabase: any, userId: string, role: string, name: string) {
  try {
    console.log(`Creating profile for user ${userId} with role ${role}`);
    
    // Special case for problematic UUID - we can't create or update this profile
    if (userId === '00000000-0000-0000-0000-000000000099') {
      console.error(`Cannot create profile for invalid UUID: ${userId}`);
      throw new Error("Unable to create profile for invalid UUID: 00000000-0000-0000-0000-000000000099");
    }
    
    const profileData = {
      id: userId,
      role,
      name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from('profiles')
      .upsert(profileData, { onConflict: 'id' });
      
    if (error) {
      console.error(`Error creating profile: ${JSON.stringify(error)}`);
      throw new Error(`Failed to create profile: ${error.message}`);
    }
    
    console.log(`Profile created successfully for user ${userId}`);
    await delay(500);
    return true;
  } catch (err) {
    console.error(`Error creating profile: ${err.message}`);
    throw err;
  }
}

// Set up doctor chat settings if needed
export async function setupSpecializedSettings(supabase: any, userId: string, role: string) {
  if (role !== 'doctor' && role !== 'vendor') {
    return true;
  }
  
  // Skip for problematic UUID
  if (userId === '00000000-0000-0000-0000-000000000099') {
    console.error(`Cannot set up doctor settings for invalid UUID: ${userId}`);
    return false;
  }
  
  try {
    console.log(`Setting up doctor chat settings for ${role} user ${userId}`);
    
    const settingsData = {
      doctor_id: userId,
      offers_free_consultation: true,
      session_price: role === 'doctor' ? 85 : 75,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from('doctor_chat_settings')
      .upsert(settingsData, { onConflict: 'doctor_id' });
      
    if (error) {
      console.error(`Error creating doctor settings: ${JSON.stringify(error)}`);
      throw new Error(`Failed to create doctor settings: ${error.message}`);
    }
    
    console.log(`Doctor chat settings created successfully for user ${userId}`);
    return true;
  } catch (err) {
    console.error(`Error setting up doctor chat settings: ${err.message}`);
    throw err;
  }
}
