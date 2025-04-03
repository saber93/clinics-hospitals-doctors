
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctorsData } from '@/data/doctorsData';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Phone, Mail, Globe, Clock, Award, Languages } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Doctor } from '@/types/doctor';
import { toast } from 'sonner';

const DoctorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the doctor with the matching id
    const foundDoctor = doctorsData.find(doc => doc.id === id);
    setDoctor(foundDoctor || null);
    setLoading(false);
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Doctor Not Found</h1>
        <p className="text-gray-600 mb-8">The doctor you are looking for does not exist or has been removed.</p>
        <Button onClick={() => navigate('/doctors')}>
          View All Doctors
        </Button>
      </div>
    );
  }

  const handleContactDoctor = () => {
    toast.success("Contact request sent to the doctor");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Doctor Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img 
                className="h-56 w-full object-cover md:w-56" 
                src={doctor.imageUrl || 'https://via.placeholder.com/300'} 
                alt={doctor.name} 
              />
            </div>
            <div className="p-8 w-full">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{doctor.name}</h1>
                  <p className="mt-2 text-xl text-primary">{doctor.specialty} • {doctor.subSpecialty}</p>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center text-yellow-400">
                      {Array(5).fill(0).map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(doctor.rating || 0) ? 'fill-current' : 'fill-gray-300'}`} 
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">{doctor.rating} ({doctor.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center mt-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span className="ml-2 text-gray-600">{doctor.location}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button 
                    className="px-6" 
                    onClick={handleBookAppointment}
                  >
                    Book Appointment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="px-6"
                    onClick={handleContactDoctor}
                  >
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Doctor Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* About */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-700">{doctor.description}</p>
              
              {/* Specialties */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.specialties?.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Education & Experience */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Education & Experience</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Award className="h-5 w-5 text-primary mt-1" />
                  <div className="ml-3">
                    <h3 className="font-medium">Education</h3>
                    <p className="text-gray-700">{doctor.education}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div className="ml-3">
                    <h3 className="font-medium">Experience</h3>
                    <p className="text-gray-700">{doctor.experience} years</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Languages className="h-5 w-5 text-primary mt-1" />
                  <div className="ml-3">
                    <h3 className="font-medium">Languages</h3>
                    <p className="text-gray-700">{doctor.languages?.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Appointment Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Appointment Info</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="ml-3 text-gray-700">Available Mon-Fri</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="ml-3 text-gray-700">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="ml-3 text-gray-700">(555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="ml-3 text-gray-700">contact@example.com</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="ml-3 text-gray-700">www.example.com</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Consultation Fee</span>
                  <span className="font-bold">${doctor.consultationFee}</span>
                </div>
                
                {doctor.offerPercentage > 0 && (
                  <div className="flex justify-between">
                    <span className="font-medium text-primary">Discount</span>
                    <span className="font-bold text-primary">{doctor.offerPercentage}% OFF</span>
                  </div>
                )}
                
                <Button 
                  className="w-full mt-4" 
                  onClick={handleBookAppointment}
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
