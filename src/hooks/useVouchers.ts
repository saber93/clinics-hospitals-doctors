
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type Voucher = {
  id: string;
  code: string;
  discount_percentage: number;
  is_active: boolean;
  start_date: string;
  end_date: string | null;
  max_uses: number | null;
  current_uses: number;
  created_at: string;
};

export const useVouchers = () => {
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please login to manage vouchers");
        navigate("/auth?mode=login");
        return;
      }
      
      setUser(session.user);
      fetchVouchers(session.user.id);
    };
    
    checkUser();
  }, [navigate]);
  
  const fetchVouchers = async (userId: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('vouchers')
        .select('*')
        .eq('seller_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setVouchers(data || []);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      toast.error("Failed to load vouchers");
    } finally {
      setLoading(false);
    }
  };
  
  const toggleVoucherStatus = async (voucherId: string, isCurrentlyActive: boolean) => {
    try {
      const { error } = await supabase
        .from('vouchers')
        .update({ is_active: !isCurrentlyActive })
        .eq('id', voucherId);
      
      if (error) throw error;
      
      setVouchers(vouchers.map(v => 
        v.id === voucherId ? { ...v, is_active: !isCurrentlyActive } : v
      ));
      
      toast.success(`Voucher ${isCurrentlyActive ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      console.error("Error updating voucher status:", error);
      toast.error("Failed to update voucher status");
    }
  };
  
  const deleteVoucher = async (voucherId: string) => {
    if (!confirm("Are you sure you want to delete this voucher?")) return;
    
    try {
      const { error } = await supabase
        .from('vouchers')
        .delete()
        .eq('id', voucherId);
      
      if (error) throw error;
      
      setVouchers(vouchers.filter(v => v.id !== voucherId));
      toast.success("Voucher deleted successfully");
    } catch (error) {
      console.error("Error deleting voucher:", error);
      toast.error("Failed to delete voucher");
    }
  };
  
  // Filter vouchers based on search
  const filteredVouchers = vouchers.filter(voucher => 
    voucher.code.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return {
    vouchers: filteredVouchers,
    loading,
    searchTerm,
    setSearchTerm,
    toggleVoucherStatus,
    deleteVoucher,
    user
  };
};
