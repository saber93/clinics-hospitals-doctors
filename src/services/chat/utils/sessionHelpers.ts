
import { toast } from "sonner";
import { ChatSession } from "@/types/chat";

// Helper to safely extract name from profiles object
export const extractName = (
  profileObject: unknown
): string | null => {
  if (
    typeof profileObject === "object" &&
    profileObject !== null &&
    !("error" in profileObject) &&
    "name" in profileObject &&
    profileObject.name !== null
  ) {
    return profileObject.name as string;
  }
  return null;
};

// Helper to format session data from Supabase
export const formatSessionData = (session: any): ChatSession => {
  // Handle profiles property which might be null
  let patientName = null;
  if (session.profiles) {
    patientName = extractName(session.profiles);
  }
  
  // Handle doctor property which might be null
  let doctorName = null;
  if (session.doctor) {
    doctorName = extractName(session.doctor);
  }
    
  return {
    ...session,
    status: session.status as "active" | "expired" | "completed",
    patient: patientName !== null ? { name: patientName } : null,
    doctor: doctorName !== null ? { name: doctorName } : null
  };
};

// Standard error handler for chat session operations
export const handleSessionError = (error: any, errorMessage: string): null => {
  console.error(`Error: ${errorMessage}`, error);
  toast.error(errorMessage);
  return null;
};
