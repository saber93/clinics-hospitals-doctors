
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/96b7f889-8783-4072-b164-abacb94bc958.png" 
        alt="Zamos Marketing Management" 
        className="h-10 md:h-12 object-contain"
      />
    </Link>
  );
};

export default Logo;
