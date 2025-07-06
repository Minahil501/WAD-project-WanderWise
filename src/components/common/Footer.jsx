import React from 'react';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';

import { FaXTwitter } from 'react-icons/fa6';



import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">WanderWise</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted companion for unforgettable travel experiences. We create memories that last a lifetime.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
             <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors">
  <FaXTwitter className="h-5 w-5" />
</a>


              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/tour-planner" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Tours
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Popular Destinations</h3>
            <ul className="space-y-2">
              {['Bali, Indonesia', 'Swiss Alps', 'Tokyo, Japan', 'Maldives', 'Dubai, UAE', 'New York, USA'].map((dest) => (
                <li key={dest} className="text-gray-400 text-sm">
                  {dest}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-sky-400" />
                <a href="mailto:hello@wanderwise.com" className="text-gray-400 text-sm hover:text-white transition-colors">
                  hello@wanderwise.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-sky-400" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 WanderWise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
