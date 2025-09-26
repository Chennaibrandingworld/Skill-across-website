"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Offer {
  id: number;
  offer_type: string;
  validity: string;
  title: string;
  hint: string;
  description: string;
}

const OffersSection = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [currentOffer, setCurrentOffer] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch offers dynamically
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch("https://skillacross.com/api/api/offers/");
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Auto-scroll functionality with transition effect
  useEffect(() => {
    if (offers.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentOffer((prev) => (prev + 1) % offers.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [offers.length]);

  const handlePrev = () => {
    if (offers.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentOffer((currentOffer - 1 + offers.length) % offers.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = () => {
    if (offers.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentOffer((currentOffer + 1) % offers.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handleNavigation = (offerId: number) => {
    router.push(`/offerdetails/${offerId}`);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">Loading offers...</p>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">No offers available right now.</p>
      </div>
    );
  }

  const offer = offers[currentOffer];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Special Course Offers
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Limited-time opportunities to advance your skills at incredible prices
        </p>
      </div>

      {/* Offer card */}
      <div
        className={`relative bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl shadow-xl overflow-hidden mb-10 transition-all duration-500 ${
          isTransitioning
            ? "opacity-0 transform scale-95"
            : "opacity-100 transform scale-100"
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10"></div>

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center">
          <div className="flex-1 text-white">
            <div className="flex flex-wrap justify-between items-start mb-4">
              <span className="bg-white text-red-700 px-4 py-2 rounded-full text-sm font-bold shadow-md mb-3">
                {offer.offer_type}
              </span>
              <span className="text-sm bg-black bg-opacity-20 px-3 py-1 rounded-full">
                {offer.validity}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              {offer.title}
            </h3>

            {/* Hint field */}
            <p className="text-sm text-red-100 italic mb-4">{offer.hint}</p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleNavigation(offer.id)}
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                Enroll Now
              </button>
              {/* <button 
                onClick={() => handleNavigation(offer.id)}
                className="border-2 border-white border-opacity-50 text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Learn More
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center space-x-8">
        <button
          onClick={handlePrev}
          className="p-3 bg-red-100 rounded-full text-red-700 hover:bg-red-200 transition-all duration-300 shadow-sm hover:shadow-md"
          aria-label="Previous offer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex space-x-3">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentOffer(index);
                  setIsTransitioning(false);
                }, 300);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentOffer === index
                  ? "bg-red-600 scale-125"
                  : "bg-red-300 hover:bg-red-400"
              }`}
              aria-label={`Go to offer ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-3 bg-red-100 rounded-full text-red-700 hover:bg-red-200 transition-all duration-300 shadow-sm hover:shadow-md"
          aria-label="Next offer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Background decorative elements */}
      <div className="absolute left-0 right-0 -z-10 top-0 h-96 bg-gradient-to-br from-red-50 to-pink-50 opacity-70"></div>
      <div className="absolute -z-10 top-20 left-10 w-20 h-20 bg-red-200 rounded-full blur-xl opacity-30"></div>
      <div className="absolute -z-10 bottom-10 right-10 w-24 h-24 bg-rose-300 rounded-full blur-xl opacity-40"></div>
    </div>
  );
};

export default OffersSection;
