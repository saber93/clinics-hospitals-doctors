
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAppAuth = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cleanupInvalidAuth = async () => {
      try {
        const problematicAuthTokenKey = 'sb-rghakqvaawoopcoeowir-auth-token';
        const authToken = localStorage.getItem(problematicAuthTokenKey);
        
        if (authToken) {
          try {
            const parsed = JSON.parse(authToken);
            if (parsed?.user?.id === '00000000-0000-0000-0000-000000000099') {
              console.log("Found problematic auth token, clearing it");
              localStorage.removeItem(problematicAuthTokenKey);
              sessionStorage.clear();
              await supabase.auth.signOut({ scope: 'local' });
            }
          } catch (e) {
            console.error("Error parsing auth token:", e);
          }
        }
      } catch (e) {
        console.error("Error in auth cleanup:", e);
      }
    };
    
    cleanupInvalidAuth();
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Checking for existing session...");
        
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error checking session:", error);
          localStorage.removeItem('sb-rghakqvaawoopcoeowir-auth-token');
          sessionStorage.clear();
          setSession(null);
          setLoading(false);
          return;
        }
        
        if (!data.session || data.session.user?.id === '00000000-0000-0000-0000-000000000099') {
          if (data.session) {
            console.error("Found problematic user ID, clearing session");
            await supabase.auth.signOut({ scope: 'local' });
            localStorage.removeItem('sb-rghakqvaawoopcoeowir-auth-token');
            sessionStorage.clear();
          }
          
          setSession(null);
        } else {
          setSession(data.session);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error checking session:", error);
        setLoading(false);
        setSession(null);
      }
    };
    
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session ? "Has session" : "No session");
      
      if (event === 'SIGNED_OUT') {
        setSession(null);
        localStorage.removeItem('sb-rghakqvaawoopcoeowir-auth-token');
        sessionStorage.clear();
        return;
      }
      
      if (session && session.user?.id !== '00000000-0000-0000-0000-000000000099') {
        setSession(session);
      } else if (session) {
        console.error("Auth state change detected problematic user ID");
        await supabase.auth.signOut({ scope: 'local' });
        localStorage.removeItem('sb-rghakqvaawoopcoeowir-auth-token');
        sessionStorage.clear();
        setSession(null);
      } else {
        setSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, loading };
};
