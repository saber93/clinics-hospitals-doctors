
// Utility functions for handling test credentials

/**
 * Returns the test credentials for a given role
 */
export const getTestCredentialsForRole = (role: string): { email: string; password: string } => {
  let email = "";
  let password = "";
  
  switch(role) {
    case "admin":
      email = "admin@skinnect.com";
      password = "Admin123!";
      break;
    case "vendor":
      email = "vendor@skinnect.com";
      password = "Vendor123!";
      break;
    case "doctor":
      email = "dr-mix@skinnect.com";
      password = "Doctor123!";
      break;
    case "client":
      email = "client@skinnect.com";
      password = "Client123!";
      break;
    default:
      // Return empty credentials for unknown roles
      break;
  }
  
  return { email, password };
};

/**
 * Helper function to capitalize first letter of a string
 */
export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
