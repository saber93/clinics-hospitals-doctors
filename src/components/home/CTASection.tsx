
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto bg-primary/90 rounded-2xl p-8 md:p-12 text-white shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to transform your skincare journey?</h2>
          <p className="mt-4 text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of happy clients who have found their perfect skincare match through Skinnect.
            Your journey to healthier skin is just a click away.
          </p>
          <div className="mt-8">
            <Button 
              variant="secondary" 
              size="lg" 
              className="font-semibold shadow-lg"
              onClick={() => navigate('/register')}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
