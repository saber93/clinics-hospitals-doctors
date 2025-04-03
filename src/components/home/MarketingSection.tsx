
import React from 'react';
import { GoogleAdsIcon, InstagramIcon, TiktokIcon, SnapchatIcon, Facebook } from 'lucide-react';

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
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <GoogleAdsIcon className="w-full h-full" />
            </div>
            <span className="text-sm text-gray-600">Google Ads</span>
          </div>
          
          {/* SEO */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <div className="text-3xl md:text-4xl font-bold">
                <span className="text-blue-500">S</span>
                <span className="text-red-500">E</span>
                <span className="text-yellow-500">O</span>
              </div>
            </div>
            <span className="text-sm text-gray-600">SEO</span>
          </div>
          
          {/* Instagram */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <InstagramIcon className="w-full h-full text-pink-600" />
            </div>
            <span className="text-sm text-gray-600">Instagram</span>
          </div>
          
          {/* TikTok */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <TiktokIcon className="w-full h-full" />
            </div>
            <span className="text-sm text-gray-600">TikTok</span>
          </div>
          
          {/* Snapchat */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-yellow-300 rounded-lg">
              <SnapchatIcon className="w-3/4 h-3/4 text-white" />
            </div>
            <span className="text-sm text-gray-600">Snapchat</span>
          </div>
          
          {/* Facebook */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-blue-600 rounded-lg">
              <Facebook className="w-3/4 h-3/4 text-white" />
            </div>
            <span className="text-sm text-gray-600">Facebook</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingSection;
