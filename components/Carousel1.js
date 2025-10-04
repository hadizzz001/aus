'use client';

import React from 'react';

const MyCarousel = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden mb-20 mt-20">
      {/* Responsive Background Image */}
      <picture>
        {/* Desktop (1920x1080 crop) */}
        <source
          media="(min-width: 768px)"
          srcSet="https://res.cloudinary.com/dgram5txd/image/upload/v1751070242/6195f776d112ead645a94b121fae7e58_fzezzx.webp"
        />
        {/* Mobile (1080x1920 crop) */}
        <img
          src="https://res.cloudinary.com/dgram5txd/image/upload/v1751070242/6195f776d112ead645a94b121fae7e58_fzezzx.webp"
          alt="Sunny-Day Sale Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </picture>

      {/* Overlay Content - CENTERED */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-black  ">
        <h1 className="text-5xl font-bold uppercase animate-slideInLeft text-white"> 
            Splash & Score:  poolside thrills await 
        </h1>
        <p className="text-[14px] mt-4 animate-slideInLeft delay-200 text-white max-w-md">
          Master the poolside with unbeatable aquatic and water-friendly gaming gear!
        </p>
        <a
          href="/shop"
          className="mt-10 px-12 py-4 bg-white font-semibold transition-all duration-300 transform hover:scale-105 text-black"
        >
          Shop Now!
        </a>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default MyCarousel;
