
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Product } from "@/types";

interface ReservationModalProps {
  product: Product;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const ReservationModal = ({ product, isOpen, onOpenChange }: ReservationModalProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReservation = async () => {
    if (!date || !timeSlot) {
      toast.error("Please select a date and time slot");
      return;
    }

    setLoading(true);
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please login to make a reservation");
        return;
      }

      // Create the reservation
      const { data, error } = await supabase
        .from('reservations')
        .insert({
          client_id: user.id,
          vendor_id: product.seller_id,
          service_id: product.id, // Using product ID as service ID
          date: format(date, 'yyyy-MM-dd'),
          time: timeSlot,
          status: 'pending'
        });

      if (error) {
        throw error;
      }

      toast.success("Reservation successful! Please check your bookings for details.");
      onOpenChange(false);
      
      // Reset form
      setDate(undefined);
      setTimeSlot(null);
      
    } catch (error) {
      console.error("Error making reservation:", error);
      toast.error("Failed to make reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDate(undefined);
    setTimeSlot(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) resetForm();
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reserve {product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Select Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {date && (
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Select Time</label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    type="button"
                    variant={timeSlot === slot ? "default" : "outline"}
                    className="flex items-center justify-center"
                    onClick={() => setTimeSlot(slot)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {date && timeSlot && (
            <div className="space-y-2 rounded-md border p-4">
              <h4 className="font-medium">Reservation Summary</h4>
              <div className="text-sm">
                <p><span className="font-medium">Product:</span> {product.name}</p>
                <p><span className="font-medium">Date:</span> {format(date, "PPP")}</p>
                <p><span className="font-medium">Time:</span> {timeSlot}</p>
                <p className="font-medium">Total: ${product.price.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleReservation} 
            disabled={!date || !timeSlot || loading}
            className="w-full"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {loading ? "Processing..." : "Confirm Reservation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;
