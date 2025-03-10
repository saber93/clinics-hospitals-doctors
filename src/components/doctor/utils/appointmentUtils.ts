
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'confirmed':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const filterAppointmentsByDate = (allAppointments: any[], date: Date | undefined) => {
  if (!date) return [];
  
  const selectedDateStr = date.toISOString().split('T')[0];
  console.log('Filtering appointments for date:', selectedDateStr);
  console.log('All appointments:', allAppointments);
  
  const filtered = allAppointments.filter(a => a.date === selectedDateStr);
  console.log('Filtered appointments:', filtered);
  
  return filtered;
};
