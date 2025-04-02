
import React from 'react';
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/26800541-dedb-4ee8-b47c-4788a924d1d6.png" 
        alt="Zamos Marketing Management" 
        className="h-10 md:h-12 object-contain"
      />
    </Link>
  );
};

export default NavLogo;
