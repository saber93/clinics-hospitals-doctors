import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { MapPin, Star, ArrowLeft } from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  image_url?: string;
  offer_percentage?: number;
}

const HospitalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!id) { setLoading(false); return; }
      const { data } = await supabase
        .from('hospitals')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (cancelled) return;
      setHospital((data as Hospital) || null);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [id]);

  const handleBook = () => {
    if (!hospital) return;
    navigate('/reservations', {
      state: { hospitalName: hospital.name, hospitalId: hospital.id }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hospital not found</h1>
        <Button onClick={() => navigate('/hospitals')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hospitals
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-64 w-full object-cover md:w-64"
                src={hospital.image_url || '/placeholder.svg'}
                alt={hospital.name}
              />
            </div>
            <div className="p-8 w-full">
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div>
                  <h1 className="text-3xl font-bold">{hospital.name}</h1>
                  <p className="mt-2 text-lg text-primary">{hospital.category}</p>
                  <div className="flex items-center mt-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{hospital.location}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-2 text-sm text-muted-foreground">4.5 rating</span>
                  </div>
                </div>
                <Button size="lg" onClick={handleBook}>Book Appointment</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-muted-foreground leading-relaxed">{hospital.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;
