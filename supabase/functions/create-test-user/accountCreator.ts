
import { delay } from './config.ts';
import { validateRequestParams } from './validation.ts';
import { createSupabaseAdmin, checkExistingProfile, findExistingUserByEmail } from './supabase.ts';
import { 
  deleteUserProfileData, 
  deleteExistingUser, 
  createNewUser, 
  createUserProfile, 
  setupSpecializedSettings 
} from './userManager.ts';

// Main function to process account creation
export async function processAccountCreation(email: string, password: string, role: string, name: string) {
  const supabase = createSupabaseAdmin();
  
  console.log(`=== Starting account creation process for ${email} with role ${role} and name ${name} ===`);
  
  try {
    // 1. Verify parameters
    validateRequestParams(email, password, role, name);
    
    // Check if there's an existing profile with the same name and role (to avoid conflicts)
    const existingProfileWithName = await checkExistingProfile(supabase, name, role);
    if (existingProfileWithName) {
      // Skip if the profile has the problematic UUID
      if (existingProfileWithName.id === '00000000-0000-0000-0000-000000000099') {
        console.log(`Found existing profile with problematic UUID: ${existingProfileWithName.id}`);
        // Continue to recreate this user properly
      } else {
        console.log(`Found existing profile with name ${name} and role ${role}, will use this ID: ${existingProfileWithName.id}`);
        return {
          success: true,
          message: `User with name ${name} and role ${role} already exists`,
          userId: existingProfileWithName.id
        };
      }
    }
    
    // 2. Check for & delete existing user with the same email
    const existingUser = await findExistingUserByEmail(supabase, email);
    if (existingUser) {
      // Special handling for the problematic UUID
      if (existingUser.id === '00000000-0000-0000-0000-000000000099' || existingUser.forceRecreate) {
        console.log(`Found existing user with email ${email} and problematic UUID ${existingUser.id}`);
        console.log(`Will attempt to force delete and recreate this user.`);
        
        // For the problematic user, we need to try to clean up as much as possible
        await deleteUserProfileData(supabase, existingUser.id);
        
        // Note: We can't actually delete the auth user with this UUID, so we'll
        // just try to create a new user with the same email which will likely fail
        // unless we delete and recreate via the Supabase dashboard
        console.log(`Warning: Cannot delete user with ID ${existingUser.id} via API.`);
        console.log(`Manual intervention may be required in the Supabase dashboard.`);
      } else {
        console.log(`Found existing user with email ${email}, will delete first`);
        await deleteExistingUser(supabase, existingUser);
        await delay(2000);
      }
    }
    
    // 3. Create new user
    let userId;
    try {
      userId = await createNewUser(supabase, email, password, role, name);
    } catch (error: any) {
      if (error.message && error.message.includes("duplicate key value")) {
        console.error(`User already exists with email ${email}. Cannot create duplicate.`);
        throw new Error(`Cannot create duplicate user with email ${email}. Manual cleanup may be required.`);
      }
      throw error;
    }
    
    // 4. Wait a bit after user creation
    await delay(1500);
    
    // 5. Create or update profile
    await createUserProfile(supabase, userId, role, name);
    
    // 6. Set up specialized settings if needed
    await setupSpecializedSettings(supabase, userId, role);
    
    console.log(`=== Account creation completed successfully for ${email} ===`);
    
    return {
      success: true,
      message: `User ${email} created with role ${role}`,
      userId
    };
  } catch (error: any) {
    console.error(`Account creation failed: ${error.message}`);
    throw error;
  }
}
