"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Define the Alumni type
interface Alumni {
  id: number;
  name: string;
  photo: string;
  company_name: string;
  company_logo: string;
  role: string;
  created_at: string;
}

export default function AlumniCarousel() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await fetch("https://skillacross.com/api/api/alumni/");
        const data = await res.json();
        setAlumni(data);
      } catch (error) {
        console.error("Error fetching alumni:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-20 py-16">
      <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">
        We Are Proud Of
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading alumni...</p>
      ) : (
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-10"
        >
          {alumni.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
                {/* Alumni Photo */}
                <div className="w-28 h-28 mb-4 relative">
                  <Image
                    src={item.photo}
                    alt={item.name}
                    fill
                    className="rounded-full object-cover border-4 border-red-500"
                  />
                </div>

                {/* Alumni Info */}
                <p className="font-semibold text-xl text-red-600">
                  {item.name}
                </p>
                <p className="text-gray-600 italic mt-1">{item.role}</p>

                {/* Company Info */}
                <div className="flex flex-col items-center mt-5">
                  {item.company_logo && (
                    <div className="w-16 h-16 relative mb-3 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center">
                      <Image
                        src={item.company_logo}
                        alt={item.company_name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  )}
                  <p className="font-medium text-gray-900">
                    {item.company_name}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
