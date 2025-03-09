
export interface ChatSession {
  id: string;
  patient_id: string;
  doctor_id: string;
  started_at: string;
  is_free: boolean;
  status: "active" | "expired" | "completed";
  last_activity: string;
  created_at: string;
  // Update the optional properties for joined data to accept null or error objects
  patient?: { name: string | null } | null;
  doctor?: { name: string | null } | null;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  sender_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ChatPayment {
  id: string;
  session_id: string;
  patient_id: string;
  doctor_id: string;
  amount: number;
  commission_percentage: number;
  commission_amount: number;
  doctor_amount: number;
  payment_method: string;
  payment_status: "pending" | "completed" | "failed";
  transaction_id?: string;
  payment_provider: string;
  created_at: string;
  // Update the optional properties for joined data to accept null or error objects
  patient?: { name: string | null } | null;
  doctor?: { name: string | null } | null;
}

export interface ChatSettings {
  id: string;
  default_session_price: number;
  default_commission_percentage: number;
  session_duration_days: number;
  created_at: string;
  updated_at: string;
}

export interface DoctorChatSettings {
  id: string;
  doctor_id: string;
  offers_free_consultation: boolean;
  session_price: number | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string | null;
  role: 'admin' | 'doctor' | 'vendor' | 'client' | null;
}

export interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
  supports_installments: boolean;
}
