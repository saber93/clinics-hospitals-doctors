
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PatientSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const PatientSearch: React.FC<PatientSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-4 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search patients..."
        className="pl-9"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default PatientSearch;
