
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  Tag, Plus, Search, Edit, Trash2, AlertTriangle,
  CheckCircle, XCircle, Calendar
} from "lucide-react";
import { format } from "date-fns";

type Voucher = {
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

const VoucherManagement = () => {
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
      
      // Update local state
      setVouchers(vouchers.map(v => 
        v.id === voucherId ? { ...v, is_active: !isCurrentlyActive } : v
      ));
      
      toast.success(`Voucher ${isCurrentlyActive ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      console.error("Error updating voucher status:", error);
      toast.error("Failed to update voucher status");
    }
  };
  
  const handleDeleteVoucher = async (voucherId: string) => {
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
  
  // Check if voucher is expired
  const isVoucherExpired = (voucher: Voucher) => {
    if (!voucher.end_date) return false;
    return new Date(voucher.end_date) < new Date();
  };
  
  // Get voucher status text
  const getVoucherStatus = (voucher: Voucher) => {
    if (!voucher.is_active) return "Inactive";
    if (isVoucherExpired(voucher)) return "Expired";
    if (voucher.max_uses && voucher.current_uses >= voucher.max_uses) return "Fully Redeemed";
    return "Active";
  };
  
  // Get color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-green-500";
      case "Inactive": return "text-gray-500";
      case "Expired": return "text-red-500";
      case "Fully Redeemed": return "text-amber-500";
      default: return "text-gray-500";
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Voucher Management</h2>
        <Button onClick={() => navigate("/seller-vouchers/new")}>
          <Plus className="mr-2 h-4 w-4" /> Create New Voucher
        </Button>
      </div>
      
      <div className="mb-6 flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search vouchers by code..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : filteredVouchers.length === 0 ? (
        <div className="text-center py-12">
          <Tag className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
          <h3 className="text-lg font-medium">No vouchers found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm 
              ? "No vouchers match your search" 
              : "You haven't created any vouchers yet"
            }
          </p>
          <Button onClick={() => navigate("/seller-vouchers/new")}>
            Create your first voucher
          </Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border shadow">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Code</th>
                <th className="px-4 py-3 text-left font-medium">Discount</th>
                <th className="px-4 py-3 text-left font-medium">Validity</th>
                <th className="px-4 py-3 text-left font-medium">Usage</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.map(voucher => {
                const status = getVoucherStatus(voucher);
                const statusColor = getStatusColor(status);
                
                return (
                  <tr key={voucher.id} className="border-t hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div className="font-medium">{voucher.code}</div>
                      <div className="text-xs text-muted-foreground">
                        Created {format(new Date(voucher.created_at), 'MMM d, yyyy')}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-primary">{voucher.discount_percentage}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span>
                          {format(new Date(voucher.start_date), 'MMM d, yyyy')}
                          {voucher.end_date && (
                            <> - {format(new Date(voucher.end_date), 'MMM d, yyyy')}</>
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {voucher.max_uses ? (
                        <span>
                          {voucher.current_uses} / {voucher.max_uses}
                        </span>
                      ) : (
                        <span>
                          {voucher.current_uses} uses (unlimited)
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className={`flex items-center ${statusColor}`}>
                        {status === "Active" && <CheckCircle className="h-3.5 w-3.5 mr-1" />}
                        {status === "Inactive" && <XCircle className="h-3.5 w-3.5 mr-1" />}
                        {status === "Expired" && <AlertTriangle className="h-3.5 w-3.5 mr-1" />}
                        {status === "Fully Redeemed" && <AlertTriangle className="h-3.5 w-3.5 mr-1" />}
                        {status}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleVoucherStatus(voucher.id, voucher.is_active)}
                          title={voucher.is_active ? "Deactivate voucher" : "Activate voucher"}
                        >
                          {voucher.is_active ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/seller-vouchers/edit/${voucher.id}`)}
                          title="Edit voucher"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteVoucher(voucher.id)}
                          title="Delete voucher"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VoucherManagement;
