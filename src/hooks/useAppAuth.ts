
import { useState, useEffect } from "react";
import { cleanupInvalidAuth } from "@/utils/authCleanup";
import { checkSession, setupAuthStateChangeListener } from "./authSession";

export const useAppAuth = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cleanupInvalidAuth();
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const validSession = await checkSession();
        setSession(validSession);
        setLoading(false);
      } catch (error) {
        console.error("Error initializing auth:", error);
        setLoading(false);
        setSession(null);
      }
    };
    
    initializeAuth();

    const subscription = setupAuthStateChangeListener(setSession);

    return () => subscription.unsubscribe();
  }, []);

  return { session, loading };
};
