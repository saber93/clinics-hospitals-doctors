
import React, { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const StrategicPartnershipSection = () => {
  const partnershipStats = [
    { value: 40, label: 'Hospitals' },
    { value: 197, label: 'Clinics' },
    { value: 136, label: 'Doctors' },
    { value: 24, label: 'Pharmacies' }
  ];
  
  const clientStats = [
    { value: 160, suffix: 'k', label: 'Clients' },
    { value: 4, label: 'Logistics' },
    { value: 18, label: 'Supplier BHC' },
    { value: 9, label: 'Supplier NDS' }
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Strategic Partnerships</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {partnershipStats.map((stat, index) => (
            <div key={index} className="text-center relative">
              <span className="text-8xl md:text-9xl font-bold text-gray-200">
                <CountUp 
                  end={stat.value} 
                  start={0} 
                  duration={2.5} 
                  delay={0.3 * index} 
                  triggerOnce={true}
                  isVisible={isVisible}
                />
              </span>
              <h3 className="text-xl md:text-2xl font-semibold absolute inset-0 flex items-center justify-center">
                {stat.label}
              </h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientStats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-5xl md:text-6xl font-bold mb-2">
                <CountUp 
                  end={stat.value} 
                  start={0} 
                  duration={2} 
                  delay={0.5 * index} 
                  triggerOnce={true}
                  isVisible={isVisible}
                  suffix={stat.suffix || ''}
                />
              </h3>
              <p className="text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CountUp component for number animation
const CountUp = ({ 
  end, 
  start = 0, 
  duration = 2.5, 
  delay = 0, 
  isVisible = true, 
  triggerOnce = true,
  suffix = ''
}) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    // Only start animation when element is visible and hasn't animated yet (if triggerOnce is true)
    if (isVisible && (!triggerOnce || !hasAnimated)) {
      let startTime: number;
      let animationFrame: number;
      
      // Delay the animation by the specified amount
      const timer = setTimeout(() => {
        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = (timestamp - startTime) / (duration * 1000);
          
          if (progress < 1) {
            setCount(Math.floor(start + progress * (end - start)));
            animationFrame = requestAnimationFrame(animate);
          } else {
            setCount(end);
            setHasAnimated(true);
            cancelAnimationFrame(animationFrame);
          }
        };
        
        animationFrame = requestAnimationFrame(animate);
      }, delay * 1000);
      
      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [isVisible, end, start, duration, delay, triggerOnce, hasAnimated]);
  
  return <>{count}{suffix}</>;
};

export default StrategicPartnershipSection;
