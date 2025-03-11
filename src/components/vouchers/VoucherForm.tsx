
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import LoadingSpinner from "@/components/ui/loading-spinner";
import VoucherFormHeader from "./form/VoucherFormHeader";
import VoucherDetailsCard from "./form/VoucherDetailsCard";

type VoucherFormProps = {
  mode: "create" | "edit";
};

const VoucherForm = ({ mode }: VoucherFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    code: "",
    discount_percentage: "10",
    is_active: true,
    start_date: new Date().toISOString().slice(0, 10),
    end_date: "",
    max_uses: "",
    current_uses: "0"
  });
  
  const isEditMode = mode === "edit";
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please login to manage vouchers");
        navigate("/auth?mode=login");
        return;
      }
      
      setUser(session.user);
      
      if (isEditMode && id) {
        fetchVoucher(id);
      }
    };
    
    checkUser();
  }, [navigate, isEditMode, id]);
  
  const fetchVoucher = async (voucherId: string) => {
    try {
      setLoading(true);
      
      const { data: voucher, error } = await supabase
        .from('vouchers')
        .select('*')
        .eq('id', voucherId)
        .single();
      
      if (error) throw error;
      
      setFormData({
        code: voucher.code,
        discount_percentage: voucher.discount_percentage.toString(),
        is_active: voucher.is_active,
        start_date: new Date(voucher.start_date).toISOString().slice(0, 10),
        end_date: voucher.end_date ? new Date(voucher.end_date).toISOString().slice(0, 10) : "",
        max_uses: voucher.max_uses ? voucher.max_uses.toString() : "",
        current_uses: voucher.current_uses.toString()
      });
    } catch (error) {
      console.error("Error fetching voucher:", error);
      toast.error("Failed to load voucher details");
      navigate("/seller-vouchers");
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      is_active: checked
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (!formData.code.trim() || !formData.discount_percentage.trim()) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      const voucherData: any = {
        code: formData.code.trim().toUpperCase(),
        discount_percentage: parseInt(formData.discount_percentage),
        is_active: formData.is_active,
        start_date: formData.start_date,
        seller_id: user.id
      };
      
      if (formData.end_date) {
        voucherData.end_date = formData.end_date;
      }
      
      if (formData.max_uses) {
        voucherData.max_uses = parseInt(formData.max_uses);
      }
      
      if (isEditMode) {
        const { error } = await supabase
          .from('vouchers')
          .update(voucherData)
          .eq('id', id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('vouchers')
          .insert(voucherData);
        
        if (error) throw error;
      }
      
      toast.success(`Voucher ${isEditMode ? 'updated' : 'created'} successfully`);
      navigate("/seller-vouchers");
    } catch (error) {
      console.error("Error saving voucher:", error);
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} voucher`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <VoucherFormHeader isEditMode={isEditMode} />
      
      {loading && isEditMode ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <VoucherDetailsCard
            formData={formData}
            handleChange={handleChange}
            handleSwitchChange={handleSwitchChange}
            isEditMode={isEditMode}
            loading={loading}
          />
        </form>
      )}
    </div>
  );
};

export default VoucherForm;
