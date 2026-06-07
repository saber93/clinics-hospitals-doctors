
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctorsData } from '@/data/doctorsData';
import { Doctor } from '@/types/doctor';
import { supabase } from '@/integrations/supabase/client';

import DoctorDetailsLoading from '@/components/doctors/details/DoctorDetailsLoading';
import DoctorNotFound from '@/components/doctors/details/DoctorNotFound';
import DoctorHeader from '@/components/doctors/details/DoctorHeader';
import DoctorAbout from '@/components/doctors/details/DoctorAbout';
import DoctorExperience from '@/components/doctors/details/DoctorExperience';
import AppointmentInfo from '@/components/doctors/details/AppointmentInfo';

const DoctorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!id) { setLoading(false); return; }
      setLoading(true);

      const { data } = await supabase
        .from('doctors')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (cancelled) return;

      if (data) {
        setDoctor({
          id: data.id,
          name: data.name,
          description: data.description,
          location: data.location,
          specialty: data.specialty,
          subSpecialty: data.sub_specialty,
          offerPercentage: data.offer_percentage || 0,
          imageUrl: data.image_url || '/placeholder.svg',
          rating: 4.5,
          reviews: 0,
          specialties: [data.specialty],
        } as Doctor);
      } else {
        setDoctor(doctorsData.find(doc => doc.id === id) || null);
      }
      setLoading(false);
    };
    load();
    return () => { cancelled = true; };
  }, [id]);

  const handleBookAppointment = () => {
    if (doctor) {
      navigate('/reservations', { 
        state: { 
          doctorName: doctor.name,
          doctorId: doctor.id
        } 
      });
    }
  };

  if (loading) {
    return <DoctorDetailsLoading />;
  }

  if (!doctor) {
    return <DoctorNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Doctor Header */}
        <DoctorHeader doctor={doctor} handleBookAppointment={handleBookAppointment} />
        
        {/* Doctor Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* About */}
            <DoctorAbout doctor={doctor} />
            
            {/* Education & Experience */}
            <DoctorExperience doctor={doctor} />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Appointment Info */}
            <AppointmentInfo doctor={doctor} onBookAppointment={handleBookAppointment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
