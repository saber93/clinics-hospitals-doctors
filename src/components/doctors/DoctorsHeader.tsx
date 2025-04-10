
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const DoctorsHeader = () => {
  const { t } = useTranslation();
  
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">{t('doctors.ourMedicalSpecialists')}</h1>
      <p className="text-gray-600">
        {t('doctors.findAndBook')}
      </p>
    </div>
  );
};

export default DoctorsHeader;
