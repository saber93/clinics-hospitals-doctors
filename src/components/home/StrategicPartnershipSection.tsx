
import React from 'react';

const StrategicPartnershipSection = () => {
  const partnershipStats = [
    { value: '40', label: 'Hospitals' },
    { value: '197', label: 'Clinics' },
    { value: '136', label: 'Doctors' },
    { value: '24', label: 'Pharmacies' }
  ];
  
  const clientStats = [
    { value: '160k', label: 'Clients' },
    { value: '4', label: 'Logistics' },
    { value: '18', label: 'Supplier BHC' },
    { value: '9', label: 'Supplier NDS' }
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Strategic Partnerships</h2>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-20">
          {partnershipStats.map((stat, index) => (
            <div key={index} className="text-center relative">
              <span className="text-8xl md:text-9xl font-bold text-gray-200">{stat.value}</span>
              <h3 className="text-xl md:text-2xl font-semibold absolute inset-0 flex items-center justify-center">
                {stat.label}
              </h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-6">
          {clientStats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-5xl md:text-6xl font-bold mb-2">{stat.value}</h3>
              <p className="text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategicPartnershipSection;
