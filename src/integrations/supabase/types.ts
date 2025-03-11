export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          image_url: string
          name: string
        }
        Insert: {
          id: string
          image_url: string
          name: string
        }
        Update: {
          id?: string
          image_url?: string
          name?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          sender_id: string
          session_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          sender_id: string
          session_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          sender_id?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_payments: {
        Row: {
          amount: number
          commission_amount: number
          commission_percentage: number
          created_at: string
          doctor_amount: number
          doctor_id: string
          id: string
          patient_id: string
          payment_method: string
          payment_provider: string
          payment_status: string
          session_id: string
          transaction_id: string | null
        }
        Insert: {
          amount: number
          commission_amount: number
          commission_percentage: number
          created_at?: string
          doctor_amount: number
          doctor_id: string
          id?: string
          patient_id: string
          payment_method: string
          payment_provider: string
          payment_status?: string
          session_id: string
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          commission_amount?: number
          commission_percentage?: number
          created_at?: string
          doctor_amount?: number
          doctor_id?: string
          id?: string
          patient_id?: string
          payment_method?: string
          payment_provider?: string
          payment_status?: string
          session_id?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_payments_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string
          doctor_id: string
          id: string
          is_free: boolean
          last_activity: string
          patient_id: string
          started_at: string
          status: string
        }
        Insert: {
          created_at?: string
          doctor_id: string
          id?: string
          is_free?: boolean
          last_activity?: string
          patient_id: string
          started_at?: string
          status?: string
        }
        Update: {
          created_at?: string
          doctor_id?: string
          id?: string
          is_free?: boolean
          last_activity?: string
          patient_id?: string
          started_at?: string
          status?: string
        }
        Relationships: []
      }
      chat_settings: {
        Row: {
          created_at: string
          default_commission_percentage: number
          default_session_price: number
          id: string
          session_duration_days: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_commission_percentage: number
          default_session_price: number
          id?: string
          session_duration_days?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_commission_percentage?: number
          default_session_price?: number
          id?: string
          session_duration_days?: number
          updated_at?: string
        }
        Relationships: []
      }
      clinics: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          location: string
          name: string
          offer_percentage: number
          sub_category: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          location: string
          name: string
          offer_percentage?: number
          sub_category: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          location?: string
          name?: string
          offer_percentage?: number
          sub_category?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      doctor_chat_settings: {
        Row: {
          created_at: string
          doctor_id: string
          id: string
          offers_free_consultation: boolean
          session_price: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          doctor_id: string
          id?: string
          offers_free_consultation?: boolean
          session_price?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          doctor_id?: string
          id?: string
          offers_free_consultation?: boolean
          session_price?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          image_url: string
          is_primary: boolean | null
          product_id: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
          is_primary?: boolean | null
          product_id: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
          is_primary?: boolean | null
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          discount_percentage: number | null
          id: string
          image_url: string | null
          is_available: boolean | null
          low_stock_threshold: number | null
          name: string
          price: number
          seller_id: string
          stock_quantity: number
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          discount_percentage?: number | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          low_stock_threshold?: number | null
          name: string
          price: number
          seller_id: string
          stock_quantity: number
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          discount_percentage?: number | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          low_stock_threshold?: number | null
          name?: string
          price?: number
          seller_id?: string
          stock_quantity?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reservations: {
        Row: {
          client_id: string | null
          created_at: string | null
          date: string
          id: string
          service_id: string | null
          status: string
          time: string
          updated_at: string | null
          vendor_id: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          date: string
          id?: string
          service_id?: string | null
          status?: string
          time: string
          updated_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          date?: string
          id?: string
          service_id?: string | null
          status?: string
          time?: string
          updated_at?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservations_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          duration: number
          id: string
          name: string
          price: number
          updated_at: string | null
          vendor_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration: number
          id?: string
          name: string
          price: number
          updated_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: number
          id?: string
          name?: string
          price?: number
          updated_at?: string | null
          vendor_id?: string | null
        }
        Relationships: []
      }
      sub_categories: {
        Row: {
          category_id: string
          id: string
          name: string
        }
        Insert: {
          category_id: string
          id: string
          name: string
        }
        Update: {
          category_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "sub_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      vouchers: {
        Row: {
          code: string
          created_at: string
          current_uses: number | null
          discount_percentage: number
          end_date: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          seller_id: string
          start_date: string
        }
        Insert: {
          code: string
          created_at?: string
          current_uses?: number | null
          discount_percentage: number
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          seller_id: string
          start_date?: string
        }
        Update: {
          code?: string
          created_at?: string
          current_uses?: number | null
          discount_percentage?: number
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          seller_id?: string
          start_date?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
