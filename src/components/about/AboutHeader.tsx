
import React from 'react';

interface AboutHeaderProps {
  ref: (el: HTMLElement | null) => void;
}

const AboutHeader: React.FC<AboutHeaderProps> = ({ ref }) => {
  return (
    <header className="text-center mb-16">
      <div 
        className="fade-in-up" 
        ref={ref}
      >
        <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Learn about Zams Marketing Management Company and our innovative approach to strategic partnerships
        </p>
      </div>
    </header>
  );
};

export default AboutHeader;
