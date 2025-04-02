
import QuickActions from "@/components/client-dashboard/QuickActions";
import UpcomingBookings from "@/components/client-dashboard/UpcomingBookings";
import SpecialOffers from "@/components/client-dashboard/SpecialOffers";

const ClientDashboard = () => {
  return (
    <div className="p-6 pt-20">
      <h2 className="text-2xl font-bold mb-4">Client Dashboard</h2>
      
      <QuickActions />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UpcomingBookings />
        <SpecialOffers />
      </div>
    </div>
  );
};

export default ClientDashboard;
