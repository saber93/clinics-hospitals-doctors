
import React from 'react';
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="text-primary text-xl font-bold">Zams</span>
    </Link>
  );
};

export default NavLogo;
