
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Clinic } from '@/types/clinic';

export function useClinicDetails(id?: string) {
  const [clinic, setClinic] = useState<Clinic | null>(null);

  const fetchClinicDetails = async () => {
    if (!id) return null;

    const { data, error } = await supabase
      .from('clinics')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;

    // Transform the data to match the Clinic type
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      category: data.category,
      subCategory: data.sub_category, // Map to match Clinic type
      location: data.location,
      imageUrl: data.image_url || '',
      offerPercentage: data.offer_percentage, // Map to match Clinic type
      theme: data.theme,
      productsVoucher: data.products_voucher,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      hasReservation: false,
    } as Clinic;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['clinic', id],
    queryFn: fetchClinicDetails,
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setClinic(data);
    }
  }, [data]);

  return { clinic, isLoading, error };
}
