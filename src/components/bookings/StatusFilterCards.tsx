
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, CheckCircle, FileText } from 'lucide-react';

interface StatusFilterCardsProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  totalCount: number;
  getStatusCount: (status: string) => number;
}

const StatusFilterCards: React.FC<StatusFilterCardsProps> = ({
  activeFilter,
  setActiveFilter,
  totalCount,
  getStatusCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card 
        className={`cursor-pointer ${activeFilter === 'all' ? 'bg-primary/10 border-primary' : ''}`} 
        onClick={() => setActiveFilter('all')}
      >
        <CardContent className="p-4 text-center">
          <Calendar className="h-6 w-6 mx-auto mb-2" />
          <p className="font-semibold">All Bookings</p>
          <p className="text-2xl font-bold">{totalCount}</p>
        </CardContent>
      </Card>
      
      <Card 
        className={`cursor-pointer ${activeFilter === 'pending' ? 'bg-yellow-50 border-yellow-400' : ''}`} 
        onClick={() => setActiveFilter('pending')}
      >
        <CardContent className="p-4 text-center">
          <Clock className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
          <p className="font-semibold">Pending</p>
          <p className="text-2xl font-bold">{getStatusCount('pending')}</p>
        </CardContent>
      </Card>
      
      <Card 
        className={`cursor-pointer ${activeFilter === 'confirmed' ? 'bg-green-50 border-green-400' : ''}`} 
        onClick={() => setActiveFilter('confirmed')}
      >
        <CardContent className="p-4 text-center">
          <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
          <p className="font-semibold">Confirmed</p>
          <p className="text-2xl font-bold">{getStatusCount('confirmed')}</p>
        </CardContent>
      </Card>
      
      <Card 
        className={`cursor-pointer ${activeFilter === 'completed' ? 'bg-blue-50 border-blue-400' : ''}`} 
        onClick={() => setActiveFilter('completed')}
      >
        <CardContent className="p-4 text-center">
          <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
          <p className="font-semibold">Completed</p>
          <p className="text-2xl font-bold">{getStatusCount('completed')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusFilterCards;
