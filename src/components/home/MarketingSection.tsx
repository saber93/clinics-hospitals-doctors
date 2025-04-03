
import React from 'react';
import { Instagram, Facebook, Search, ArrowUp } from 'lucide-react';

const TikTokLogo = () => {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3/4 h-3/4">
      <path d="M16.708 8.083C16.673 8.083 16.641 8.083 16.607 8.084V8.074C16.607 8.074 16.607 8.074 16.607 8.073C16.641 8.073 16.673 8.077 16.708 8.083Z" fill="white"/>
      <path d="M16.707 8.084C16.74 8.088 16.773 8.095 16.805 8.102V8.044C16.772 8.056 16.739 8.067 16.707 8.073V8.084Z" fill="white"/>
      <path d="M16.605 8.084C16.471 8.088 16.336 8.094 16.203 8.083C16.336 8.103 16.47 8.102 16.605 8.084Z" fill="white"/>
      <path d="M16.203 8.084C16.184 8.082 16.166 8.08 16.147 8.077C16.166 8.08 16.184 8.082 16.203 8.084Z" fill="white"/>
      <path d="M25 10.829C24.439 10.829 23.902 10.733 23.398 10.556V17.198C23.398 21.744 19.708 25.434 15.161 25.434C13.565 25.434 12.079 24.957 10.848 24.13C12.252 25.622 14.248 26.564 16.464 26.564C21.01 26.564 24.701 22.874 24.701 18.327V11.686C24.203 11.862 23.668 11.959 23.108 11.959H22.938C23.55 11.677 24.057 11.193 24.38 10.58C24.379 10.58 24.379 10.58 24.38 10.58C24.588 10.663 24.79 10.757 24.983 10.867L25 10.829Z" fill="#69C9D0"/>
      <path d="M10.866 19.475C10.866 21.36 12.398 22.892 14.282 22.892C14.811 22.892 15.312 22.764 15.759 22.534V19.322C15.334 19.478 14.874 19.561 14.4 19.556C12.313 19.556 10.621 17.865 10.621 15.777C10.621 13.689 12.313 11.998 14.4 11.998C14.871 11.998 15.326 12.082 15.747 12.236V9.03C15.303 8.803 14.802 8.675 14.278 8.675C12.393 8.675 10.863 10.205 10.863 12.09C10.863 13.973 10.866 17.59 10.866 19.475Z" fill="#EE1D52"/>
      <path d="M23.398 10.556C22.924 10.388 22.506 10.106 22.174 9.744C21.484 9.015 21.065 8.02 21.062 6.925H18.962C18.966 7.037 18.976 7.146 18.992 7.254V16.827C18.992 18.016 18.023 18.985 16.834 18.985C15.644 18.985 14.675 18.015 14.675 16.827C14.675 15.638 15.644 14.669 16.834 14.669C17.068 14.669 17.294 14.712 17.506 14.789V12.338C17.258 12.284 17 12.251 16.733 12.251C14.16 12.251 12.073 14.337 12.073 16.91C12.073 19.486 14.16 21.571 16.733 21.571C19.307 21.571 21.394 19.486 21.394 16.91V11.474C22.229 12.058 23.214 12.396 24.259 12.396H24.701V10.867C24.267 10.721 23.812 10.614 23.398 10.556Z" fill="white"/>
    </svg>
  );
};

const MarketingSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-lg uppercase tracking-wider text-gray-700 mb-4">MARKET LEADERS IN STRATEGIC GROWTH</p>
          <h2 className="text-5xl md:text-6xl font-bold mb-16">
            Boost Your Brand Presence With Our<br />
            Expertise, Smart Vision
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {/* Google Ads */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white rounded-full shadow-md p-2">
              <div className="flex items-center justify-center w-full h-full">
                <span className="text-blue-500 text-2xl font-bold">G</span>
                <span className="text-red-500 text-2xl font-bold">Ads</span>
              </div>
            </div>
            <span className="text-sm text-gray-600">Google Ads</span>
          </div>
          
          {/* SEO */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white rounded-full shadow-md p-2 relative">
              <Search className="w-3/4 h-3/4" />
              <ArrowUp className="w-1/3 h-1/3 absolute -top-1 -right-1 text-green-500" />
            </div>
            <span className="text-sm text-gray-600">SEO</span>
          </div>
          
          {/* Instagram */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 rounded-full shadow-md">
              <Instagram className="w-3/4 h-3/4 text-white" />
            </div>
            <span className="text-sm text-gray-600">Instagram</span>
          </div>
          
          {/* TikTok */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-black rounded-full shadow-md">
              <TikTokLogo />
            </div>
            <span className="text-sm text-gray-600">TikTok</span>
          </div>
          
          {/* Snapchat */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-yellow-300 rounded-full shadow-md">
              <div className="w-3/4 h-3/4 bg-white rounded-full flex items-center justify-center">
                <div className="ghost-shape bg-white"></div>
              </div>
            </div>
            <span className="text-sm text-gray-600">Snapchat</span>
          </div>
          
          {/* Facebook */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-blue-600 rounded-full shadow-md">
              <Facebook className="w-3/4 h-3/4 text-white" />
            </div>
            <span className="text-sm text-gray-600">Facebook</span>
          </div>
        </div>
      </div>
      
      <style>
        {`
          .ghost-shape {
            width: 60%;
            height: 60%;
            border-radius: 40% 40% 0 0;
            position: relative;
          }
          .ghost-shape:before {
            content: '';
            position: absolute;
            width: 30%;
            height: 30%;
            background: black;
            border-radius: 50%;
            top: 25%;
            left: 25%;
          }
        `}
      </style>
    </section>
  );
};

export default MarketingSection;
