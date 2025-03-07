
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Mail, MapPin, Phone, Store } from "lucide-react";

interface VendorProfile {
  id: string;
  name: string;
  email?: string;
  created_at: string;
  location?: string;
  phone?: string;
}

const TotalVendors = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState<VendorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        // Get all profiles with 'vendor' role
        const { data, error } = await supabase
          .from('profiles')
          .select('id, name, created_at')
          .eq('role', 'vendor');

        if (error) throw error;

        // Get email from auth.users (via client-side join since we can't directly query auth schema)
        const vendorsWithEmail = await Promise.all(
          data.map(async (vendor) => {
            // For production, you would use server-side joins or edge functions
            // This is a simplified approach for demonstration
            return {
              ...vendor,
              email: `vendor${vendor.id.substring(0, 4)}@example.com`, // Mock email for demo
              location: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle'][
                Math.floor(Math.random() * 5)
              ], // Mock location for demo
              phone: `+1${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}` // Mock phone for demo
            };
          })
        );

        setVendors(vendorsWithEmail);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        toast.error("Failed to load vendors");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/admin-dashboard')}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <h2 className="text-2xl font-bold">Total Vendors ({vendors.length})</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="ml-2 text-gray-600">Loading vendors...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vendors.map((vendor) => (
            <Card key={vendor.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Store className="w-5 h-5 mr-2 text-primary" />
                  {vendor.name || 'Unnamed Vendor'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="w-4 h-4 mr-2" />
                    {vendor.email || 'No email provided'}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="w-4 h-4 mr-2" />
                    {vendor.phone || 'No phone provided'}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {vendor.location || 'No location provided'}
                  </div>
                  <div className="text-muted-foreground pt-2">
                    Joined: {formatDate(vendor.created_at)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TotalVendors;
