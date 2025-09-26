"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const companies = [
  { id: 1, name: "Google", logo: "/assets/img/4.webp" },
  { id: 2, name: "Microsoft", logo: "/assets/img/5.webp" },
  { id: 3, name: "Amazon", logo: "/assets/img/7.webp" },
  { id: 4, name: "Facebook", logo: "/assets/img/13.webp" },
  { id: 5, name: "Apple", logo: "/assets/img/15.webp" },
  { id: 6, name: "IBM", logo: "/assets/img/17.webp" },
  { id: 7, name: "Intel", logo: "/assets/img/19.webp" },
  { id: 8, name: "Cisco", logo: "/assets/img/4.webp" },
];

const LogoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 5; // Number of logos visible at once

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % companies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const visibleLogos = [];
  for (let i = 0; i < visibleCount; i++) {
    visibleLogos.push(companies[(currentIndex + i) % companies.length]);
  }

  return (
    <section className="bg-gradient-to-r from-rose-100 via-rose-50 to-rose-100 py-12 px-6 md:px-20">
      <h3 className="text-center text-3xl font-bold mb-8 text-gray-800">
        Our Learners Working At
      </h3>
      <div className="flex justify-center items-center space-x-8 overflow-hidden relative">
        {/* Previous Button */}
        <button
          onClick={() =>
            setCurrentIndex(
              currentIndex === 0 ? companies.length - 1 : currentIndex - 1
            )
          }
          aria-label="Previous Logos"
          className="absolute left-0 z-20 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md"
        >
          &#10094;
        </button>

        {/* Logos container */}
        <div className="flex space-x-10 overflow-hidden max-w-5xl">
          {visibleLogos.map((company) => (
            <div
              key={company.id}
              className="flex-shrink-0 w-32 h-20 flex items-center justify-center cursor-pointer transform transition-transform duration-300 hover:scale-110"
              title={company.name}
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={128}
                height={64}
                className="object-contain"
                loading="lazy"
                priority={false}
                unoptimized={false}
              />
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => setCurrentIndex((currentIndex + 1) % companies.length)}
          aria-label="Next Logos"
          className="absolute right-0 z-20 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md"
        >
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default LogoSlider;
