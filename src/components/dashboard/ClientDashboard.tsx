
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Reservation, Service, Vendor } from '@/types';

const ClientDashboard: React.FC = () => {
  const { getUserReservations, getServiceById, getVendorById } = useApp();
  const navigate = useNavigate();
  const reservations = getUserReservations();

  // Separate reservations by status
  const upcomingReservations = reservations.filter(
    res => res.status === 'confirmed' && new Date(res.startTime) > new Date()
  );
  
  const pendingReservations = reservations.filter(
    res => res.status === 'pending'
  );
  
  const pastReservations = reservations.filter(
    res => res.status === 'completed' || new Date(res.startTime) < new Date()
  );

  const getReservationDetails = (reservation: Reservation) => {
    const service = getServiceById(reservation.serviceId);
    const vendor = getVendorById(reservation.vendorId);
    
    return { service, vendor };
  };

  const renderReservationCard = (reservation: Reservation) => {
    const { service, vendor } = getReservationDetails(reservation);
    
    if (!service || !vendor) return null;
    
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };

    return (
      <Card key={reservation.id} className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{service.name}</CardTitle>
              <CardDescription className="mt-1">{vendor.businessName}</CardDescription>
            </div>
            <span 
              className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[reservation.status]}`}
            >
              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 pb-4">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{format(new Date(reservation.startTime), 'EEEE, MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{format(new Date(reservation.startTime), 'h:mm a')} - {format(new Date(reservation.endTime), 'h:mm a')}</span>
          </div>
          <div className="text-sm mt-2">
            <span className="font-medium">Price:</span> ${reservation.totalPrice.toFixed(2)}
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/30 px-6 py-3">
          <div className="flex justify-between items-center w-full">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/reservations/${reservation.id}`)}
            >
              View Details
            </Button>
            
            {reservation.status === 'pending' || reservation.status === 'confirmed' ? (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => navigate(`/reservations/${reservation.id}/cancel`)}
              >
                Cancel
              </Button>
            ) : null}
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Dashboard</h2>
          <p className="text-muted-foreground">Manage your appointments and discover treatments</p>
        </div>
        <Button 
          className="mt-4 md:mt-0" 
          onClick={() => navigate('/vendors')}
        >
          Book New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center mb-4">
            <Calendar className="h-6 w-6 mr-2 text-primary" />
            <h3 className="font-semibold text-lg">Upcoming</h3>
          </div>
          <div className="text-3xl font-bold">{upcomingReservations.length}</div>
          <p className="text-muted-foreground text-sm">Confirmed appointments</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center mb-4">
            <Clock className="h-6 w-6 mr-2 text-yellow-500" />
            <h3 className="font-semibold text-lg">Pending</h3>
          </div>
          <div className="text-3xl font-bold">{pendingReservations.length}</div>
          <p className="text-muted-foreground text-sm">Awaiting confirmation</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-6 w-6 mr-2 text-green-500" />
            <h3 className="font-semibold text-lg">Completed</h3>
          </div>
          <div className="text-3xl font-bold">{pastReservations.length}</div>
          <p className="text-muted-foreground text-sm">Past appointments</p>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Upcoming Appointments</h3>
        {upcomingReservations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingReservations.map(renderReservationCard)}
          </div>
        ) : (
          <div className="text-center p-8 bg-white rounded-lg border">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No upcoming appointments</h3>
            <p className="mt-1 text-muted-foreground">
              Browse our vendors and book your first appointment
            </p>
            <Button 
              className="mt-4" 
              onClick={() => navigate('/vendors')}
            >
              Book Now
            </Button>
          </div>
        )}
      </div>

      {/* Pending Appointments */}
      {pendingReservations.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Pending Appointments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingReservations.map(renderReservationCard)}
          </div>
        </div>
      )}

      {/* Recent Appointments */}
      {pastReservations.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Recent Appointments</h3>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/reservations/history')}
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastReservations.slice(0, 3).map(renderReservationCard)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
