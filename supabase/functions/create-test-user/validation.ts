
import { validRoles } from './config.ts';

// Validate the request parameters
export function validateRequestParams(email: string, password: string, role: string, name: string) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  if (role && !validRoles.includes(role)) {
    throw new Error(`Invalid role: ${role}. Must be one of: ${validRoles.join(', ')}`);
  }
  
  // Log the validation result for debugging
  console.log(`Validation passed for email: ${email}, role: ${role}`);
  
  return true;
}
