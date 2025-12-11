export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blogs: {
        Row: {
          category: string
          content: string
          created_at: string
          excerpt: string
          id: string
          image_url: string | null
          is_published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          excerpt: string
          id?: string
          image_url?: string | null
          is_published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string | null
          is_published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
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
          custom_domain: string | null
          description: string
          id: string
          image_url: string | null
          location: string
          name: string
          offer_percentage: number
          products_voucher: Json[] | null
          sub_category: string
          theme: Json | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          custom_domain?: string | null
          description: string
          id?: string
          image_url?: string | null
          location: string
          name: string
          offer_percentage?: number
          products_voucher?: Json[] | null
          sub_category: string
          theme?: Json | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          custom_domain?: string | null
          description?: string
          id?: string
          image_url?: string | null
          location?: string
          name?: string
          offer_percentage?: number
          products_voucher?: Json[] | null
          sub_category?: string
          theme?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string
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
      doctors: {
        Row: {
          created_at: string | null
          custom_domain: string | null
          description: string
          id: string
          image_url: string | null
          location: string
          name: string
          offer_percentage: number | null
          specialty: string
          sub_specialty: string
          theme: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          custom_domain?: string | null
          description: string
          id?: string
          image_url?: string | null
          location: string
          name: string
          offer_percentage?: number | null
          specialty: string
          sub_specialty: string
          theme?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          custom_domain?: string | null
          description?: string
          id?: string
          image_url?: string | null
          location?: string
          name?: string
          offer_percentage?: number | null
          specialty?: string
          sub_specialty?: string
          theme?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      hospitals: {
        Row: {
          category: string
          created_at: string | null
          custom_domain: string | null
          description: string
          id: string
          image_url: string | null
          location: string
          name: string
          offer_percentage: number | null
          theme: Json | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          custom_domain?: string | null
          description: string
          id?: string
          image_url?: string | null
          location: string
          name: string
          offer_percentage?: number | null
          theme?: Json | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          custom_domain?: string | null
          description?: string
          id?: string
          image_url?: string | null
          location?: string
          name?: string
          offer_percentage?: number | null
          theme?: Json | null
          updated_at?: string | null
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
          display_order: number | null
          duration: number
          icon_name: string | null
          id: string
          is_active: boolean | null
          name: string
          price: number
          updated_at: string | null
          vendor_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          duration: number
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          price: number
          updated_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          duration?: number
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
