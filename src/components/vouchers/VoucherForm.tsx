import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Percent, Calendar, RefreshCw } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading-spinner";

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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      is_active: checked
    }));
  };
  
  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, code }));
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
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/seller-vouchers")}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h2 className="text-2xl font-bold">
          {isEditMode ? "Edit Voucher" : "Create New Voucher"}
        </h2>
      </div>
      
      {loading && isEditMode ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Voucher Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Voucher Code *</Label>
                <div className="flex gap-2">
                  <Input
                    id="code"
                    name="code"
                    placeholder="Enter voucher code (e.g., SUMMER25)"
                    value={formData.code}
                    onChange={handleChange}
                    className="uppercase"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateRandomCode}
                    title="Generate random code"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  This is the code that customers will enter to redeem the voucher.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discount_percentage">Discount Percentage *</Label>
                <div className="relative">
                  <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="discount_percentage"
                    name="discount_percentage"
                    type="number"
                    min="1"
                    max="100"
                    placeholder="10"
                    value={formData.discount_percentage}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="is_active">Active</Label>
                  <p className="text-xs text-muted-foreground">
                    Customers can only redeem active vouchers
                  </p>
                </div>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date (Optional)</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="end_date"
                    name="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={handleChange}
                    className="pl-10"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave blank for no expiration date
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max_uses">Maximum Uses (Optional)</Label>
                <Input
                  id="max_uses"
                  name="max_uses"
                  type="number"
                  min="1"
                  placeholder="No limit"
                  value={formData.max_uses}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">
                  Leave blank for unlimited uses
                </p>
              </div>
              
              {isEditMode && (
                <div className="space-y-2">
                  <Label htmlFor="current_uses">Current Uses</Label>
                  <Input
                    id="current_uses"
                    name="current_uses"
                    type="number"
                    min="0"
                    value={formData.current_uses}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline"
                disabled={loading}
                onClick={() => navigate("/seller-vouchers")}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  isEditMode ? "Update Voucher" : "Create Voucher"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}
    </div>
  );
};

export default VoucherForm;
