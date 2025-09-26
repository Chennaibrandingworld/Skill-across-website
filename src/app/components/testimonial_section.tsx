"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  designation?: string;
  description: string;
  rating?: number;
  photo?: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>(
    {}
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          "https://skillacross.com/api/api/testimonials/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (err) {
        // Properly handle the unknown error type
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Toggle expanded state for a card
  const toggleExpand = (id: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-20 py-16 bg-gradient-to-r from-violet-600 via-violet-500 to-violet-700 rounded-md shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-12 text-center">
        What Our Learners Are Saying
      </h2>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
          <p>Loading testimonials...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8 bg-violet-800 rounded-lg mb-8">
          <p className="font-semibold">
            Note: Could not load testimonials from server
          </p>
          <p className="mt-2 opacity-90">
            Please check your connection and try again later
          </p>
        </div>
      )}

      {/* Navigation Arrows */}
      {testimonials.length > 0 && (
        <>
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-3 backdrop-blur-sm transition-all hidden md:block"
            aria-label="Scroll left"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-3 backdrop-blur-sm transition-all hidden md:block"
            aria-label="Scroll right"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {testimonials.length > 0
          ? testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-80 mx-4 snap-start bg-violet-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-default flex flex-col h-full transform hover:-translate-y-1"
              >
                {/* Testimonial Header */}
                <div className="flex items-center mb-4">
                  {/* Testimonial Photo */}
                  {testimonial.photo && (
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/30 mr-4 flex-shrink-0">
                      <Image
                        src={testimonial.photo}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="font-semibold text-lg truncate">
                      {testimonial.name}
                    </p>
                    {testimonial.designation && (
                      <p className="text-violet-200 text-sm truncate">
                        {testimonial.designation}
                      </p>
                    )}
                  </div>
                </div>

                {/* Testimonial Rating */}
                {testimonial.rating && (
                  <div className="flex mb-4 text-xl">
                    {renderStars(testimonial.rating)}
                  </div>
                )}

                {/* Testimonial Text with Read More */}
                <div className="flex-grow mb-4 relative">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-l from-violet-700 to-transparent"></div>
                  <p className="italic text-violet-50 relative z-10">
                    {expandedCards[testimonial.id]
                      ? `"${testimonial.description}"`
                      : `"${
                          testimonial.description.length > 120
                            ? testimonial.description.substring(0, 120) + "..."
                            : testimonial.description
                        }"`}
                  </p>

                  {testimonial.description.length > 120 && (
                    <button
                      onClick={() => toggleExpand(testimonial.id)}
                      className="text-blue-300 hover:text-blue-100 text-sm mt-2 font-medium focus:outline-none transition-colors"
                    >
                      {expandedCards[testimonial.id]
                        ? "Read Less"
                        : "Read More"}
                    </button>
                  )}
                </div>

                {/* Decorative Quote Mark */}
                <div className="text-white/10 text-6xl font-serif absolute bottom-2 right-4 pointer-events-none">
                  ”
                </div>
              </div>
            ))
          : !loading &&
            !error && (
              <div className="w-full text-center py-8">
                <p className="text-violet-200">
                  No testimonials available at the moment.
                </p>
              </div>
            )}
      </div>

      {/* Scroll Indicators for Mobile */}
      {testimonials.length > 0 && (
        <div className="flex justify-center mt-6 space-x-2 md:hidden">
          {testimonials.map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-white/30"></div>
          ))}
        </div>
      )}
    </section>
  );
}
