
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Skinnect</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Connect with the best skin and body care specialists in your area.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  Facial Treatments
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  Body Treatments
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  Massages
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  Skincare Consultations
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  Special Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary">
                  For Vendors
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-muted-foreground">
                <Mail size={18} className="mr-2" />
                <span>info@skinnect.com</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone size={18} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="mt-4">
                <Link to="/contact" className="text-primary hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-primary hover:underline">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Skinnect. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
