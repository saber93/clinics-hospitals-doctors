
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

const ModernFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/96b7f889-8783-4072-b164-abacb94bc958.png" 
                alt="Zamos Marketing Management" 
                className="h-8 object-contain"
              />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
              Connect with the best skin and body care specialists in your area. We provide the highest quality services for all your skincare needs.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-primary transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-primary transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-primary transition-colors duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Clinics", path: "/clinics" },
                { name: "Services", path: "/services" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Our Services</h3>
            <ul className="space-y-2">
              {[
                "Facial Treatments",
                "Body Treatments",
                "Skin Consultations",
                "Beauty Therapy",
                "Anti-Aging Solutions"
              ].map((service) => (
                <li key={service}>
                  <Link 
                    to="/services"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">
                  123 Beauty Street, Skincare City, SC 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <a href="mailto:info@skinnect.com" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  info@skinnect.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} Skinnect. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
