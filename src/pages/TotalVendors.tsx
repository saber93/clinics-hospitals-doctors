
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Mail, MapPin, Phone, Store, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
  const [filteredVendors, setFilteredVendors] = useState<VendorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

        // If no data is returned, create mock data for demo
        const vendorData = data && data.length > 0 ? data : generateMockVendors();

        // Add mock email, location, and phone for demonstration
        const vendorsWithDetails = vendorData.map(vendor => ({
          ...vendor,
          email: `vendor${vendor.id.substring(0, 4)}@example.com`,
          location: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle'][
            Math.floor(Math.random() * 5)
          ],
          phone: `+1${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`
        }));

        setVendors(vendorsWithDetails);
        setFilteredVendors(vendorsWithDetails);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        toast.error("Failed to load vendors");
        
        // If error, still show mock data
        const mockData = generateMockVendors();
        setVendors(mockData);
        setFilteredVendors(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  // Generate mock vendor data
  const generateMockVendors = (): VendorProfile[] => {
    const mockBusinessNames = [
      "Wellness Spa", "Beauty Salon", "Fitness Studio", "Yoga Center", 
      "Massage Therapy", "Hair Styling", "Nail Art Studio", "Skin Care Clinic", 
      "Makeup Artist", "Barber Shop", "Personal Training", "Meditation Center", 
      "Nutrition Counseling", "Physical Therapy", "Acupuncture Clinic", "Chiropractic Care"
    ];
    
    const locations = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle'];
    
    return mockBusinessNames.map((name, index) => {
      const id = `mock-${index}-${Date.now()}`;
      const created = new Date();
      created.setDate(created.getDate() - Math.floor(Math.random() * 60));
      
      return {
        id,
        name,
        created_at: created.toISOString(),
        email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
        location: locations[Math.floor(Math.random() * locations.length)],
        phone: `+1${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`
      };
    });
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredVendors(vendors);
    } else {
      const filtered = vendors.filter(
        (vendor) =>
          vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.phone?.includes(searchTerm)
      );
      setFilteredVendors(filtered);
    }
  }, [searchTerm, vendors]);

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
        <h2 className="text-2xl font-bold">Total Vendors ({filteredVendors.length})</h2>
      </div>

      <div className="mb-6 relative max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search vendors by name, email, location or phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="ml-2 text-gray-600">Loading vendors...</p>
        </div>
      ) : filteredVendors.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Store className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No vendors found</h3>
          <p className="text-gray-500">
            {searchTerm ? "Try a different search term" : "No vendors have been added yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVendors.map((vendor) => (
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
