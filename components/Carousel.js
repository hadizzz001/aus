'use client';
import React, { useState, useEffect } from "react";

const MyCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/banner");
        const data = await res.json();
        setBanners(data);
      } catch (err) {
        console.error("Failed to load banners:", err);
      }
    };
    fetchBanners();
  }, []);

  // Slide change every 4 seconds
  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        {banners.map((item, index) => (
          <img
            key={item._id}
            src={`${item.img?.[0]}?q=20`}
            alt={`Slide ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Overlay Content (title + subtitle from HTML) */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full p-6 text-left text-black bg-black/30  ">
        <div
          className="text-white max-w-xl animate-slideInLeft"
          dangerouslySetInnerHTML={{ __html: banners[currentIndex].name }}
        />
        <a
          href="/shop"
          className="mt-8 px-10 py-4 bg-white text-black font-semibold  transition-all duration-300 transform hover:scale-105"
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
      `}</style>
    </div>
  );
};

export default MyCarousel;
