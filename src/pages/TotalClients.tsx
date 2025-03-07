
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Mail, Phone, User } from "lucide-react";

interface ClientProfile {
  id: string;
  name: string;
  email?: string;
  created_at: string;
  phone?: string;
}

const TotalClients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        // Get all profiles with 'client' role
        const { data, error } = await supabase
          .from('profiles')
          .select('id, name, created_at')
          .eq('role', 'client');

        if (error) throw error;

        // Get email from auth.users (via client-side join since we can't directly query auth schema)
        const clientsWithEmail = await Promise.all(
          data.map(async (client) => {
            // For production, you would use server-side joins or edge functions
            // This is a simplified approach for demonstration
            return {
              ...client,
              email: `client${client.id.substring(0, 4)}@example.com`, // Mock email for demo
              phone: `+1${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}` // Mock phone for demo
            };
          })
        );

        setClients(clientsWithEmail);
      } catch (error) {
        console.error("Error fetching clients:", error);
        toast.error("Failed to load clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
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
        <h2 className="text-2xl font-bold">Total Clients ({clients.length})</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="ml-2 text-gray-600">Loading clients...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <Card key={client.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  {client.name || 'Unnamed Client'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="w-4 h-4 mr-2" />
                    {client.email || 'No email provided'}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="w-4 h-4 mr-2" />
                    {client.phone || 'No phone provided'}
                  </div>
                  <div className="text-muted-foreground pt-2">
                    Joined: {formatDate(client.created_at)}
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

export default TotalClients;
