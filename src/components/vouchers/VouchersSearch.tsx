
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface VouchersSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const VouchersSearch = ({ searchTerm, onSearchChange }: VouchersSearchProps) => {
  return (
    <div className="mb-6 flex gap-4 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search vouchers by code..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default VouchersSearch;
