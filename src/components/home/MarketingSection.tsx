
import React from 'react';
import { Instagram, Facebook, Search, ArrowBigUp, MessageCircle } from 'lucide-react';

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
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white rounded-full shadow-md p-2">
              <Search className="w-3/4 h-3/4" />
              <ArrowBigUp className="w-1/3 h-1/3 absolute -top-1 -right-1 text-green-500" />
            </div>
            <span className="text-sm text-gray-600">SEO</span>
          </div>
          
          {/* Instagram */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 rounded-lg">
              <Instagram className="w-3/4 h-3/4 text-white" />
            </div>
            <span className="text-sm text-gray-600">Instagram</span>
          </div>
          
          {/* TikTok */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-black rounded-lg relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 md:w-10 md:h-10 relative">
                  <div className="absolute inset-0 bg-cyan-400 rounded-full transform -translate-x-2"></div>
                  <div className="absolute inset-0 bg-pink-500 rounded-full mix-blend-darken transform translate-x-2"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                    T
                  </div>
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-600">TikTok</span>
          </div>
          
          {/* Snapchat */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-yellow-300 rounded-lg">
              <div className="w-3/4 h-3/4 bg-white rounded-full flex items-center justify-center">
                <div className="ghost-shape bg-white"></div>
              </div>
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

          {/* Message */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-green-500 rounded-lg">
              <MessageCircle className="w-3/4 h-3/4 text-white" />
            </div>
            <span className="text-sm text-gray-600">Live Chat</span>
          </div>
        </div>
      </div>
      
      <style jsx>{`
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
      `}</style>
    </section>
  );
};

export default MarketingSection;
