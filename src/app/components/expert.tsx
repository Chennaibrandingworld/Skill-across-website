"use client";
import React from "react";
import { useRouter } from "next/navigation";

export const Expert = () => {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window !== "undefined") {
      // Check if device is mobile
      const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      if (isMobile) {
        // 📱 On mobile → call the number
        window.location.href = "tel:+919962471249";
      } else {
        // 💻 On desktop → go to contact page
        router.push("/contact-us");
      }
    }
  };

  return (
    <section className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 py-16 px-6 md:px-20 text-white max-w-7xl mx-auto rounded-md shadow-md mt-16 mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Join Over 1 Million Learners In India
      </h2>
      <p className="text-center max-w-3xl mx-auto mb-10 text-lg">
        Effective learning starts with assessment. Learning a new skill is hard
        work. SkillAcross makes it easier.
      </p>
      <div className="flex justify-center">
        <button
          onClick={handleClick}
          className="bg-white text-red-600 font-semibold px-8 py-3 rounded-md shadow hover:bg-gray-100 transition"
        >
          Call Our Experts
        </button>
      </div>
    </section>
  );
};
