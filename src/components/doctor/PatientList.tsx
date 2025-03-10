
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import PatientCard from "./PatientCard";
import PatientSearch from "./PatientSearch";
import { usePatients } from "./utils/usePatients";

interface PatientListProps {
  doctorId: string;
}

const PatientList = ({ doctorId }: PatientListProps) => {
  const { patients, loading } = usePatients(doctorId);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Patients</CardTitle>
        <CardDescription>
          Total of {patients.length} patients under your care
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PatientSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        {filteredPatients.length > 0 ? (
          <div className="space-y-4">
            {filteredPatients.map(patient => (
              <PatientCard 
                key={patient.id}
                id={patient.id}
                name={patient.name}
                last_activity={patient.last_activity}
                has_upcoming_appointment={patient.has_upcoming_appointment}
                session_id={patient.session_id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No patients found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientList;
