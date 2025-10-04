"use client";

import React, { useState, useEffect } from "react";

const MyCarousel = () => {
  const images = [
    "https://res.cloudinary.com/dwzizbcht/image/upload/v1759588218/1_wg9tif.webp",
    "https://res.cloudinary.com/dwzizbcht/image/upload/v1759576326/2_cgvm7a.webp",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // change every 4s
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full p-4 text-left text-black">
        <h1 className="text-5xl font-bold uppercase animate-slideInLeft myWhite">
          Pety Sale
        </h1>
        <p className="text-[14px] mt-2 animate-slideInLeft delay-200 myWhite">
          Offer with up to 50% off on our categories!
        </p>
        <a
          href="/shop"
          style={{ padding: "1em" }}
          className="mt-10 px-12 py-6 bg-white font-semibold transition-all duration-300 transform hover:scale-105 myGray"
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
