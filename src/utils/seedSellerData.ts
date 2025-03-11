
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { createSellerDemoData } from "./seedServiceData";

export const createDemoSeller = async () => {
  const loadingToast = toast.loading("Creating demo seller account...");
  
  try {
    // Create seller account
    const email = "seller@skinnect.com";
    const password = "Seller123!";
    
    // Check if user already exists
    const { data: existingUser } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    let userId;
    
    if (existingUser.user) {
      userId = existingUser.user.id;
      console.log("Demo seller already exists, using existing account");
    } else {
      // Create new seller account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: "Demo Seller",
            role: "seller"
          }
        }
      });
      
      if (error) throw error;
      if (!data.user) throw new Error("Failed to create seller account");
      
      userId = data.user.id;
      console.log("Created new demo seller account");
    }
    
    // Create demo products for the seller
    await createSellerDemoData(userId);
    
    toast.dismiss(loadingToast);
    toast.success("Demo seller account created with sample products!");
    
    // Return credentials for immediate login
    return {
      email,
      password
    };
  } catch (error: any) {
    console.error("Error creating demo seller:", error);
    toast.dismiss(loadingToast);
    toast.error(`Failed to create demo seller: ${error.message}`);
    throw error;
  }
};
