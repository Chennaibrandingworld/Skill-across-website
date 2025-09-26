"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Expert } from "./components/expert";
import TestimonialsSection from "./components/testimonial_section";
import { QuickEnquiry } from "./components/QuickEnquiry";
import { motion } from "framer-motion";
import BannerCarousel from "./components/BannerCarousel";
import { AbroadStudy } from "./components/AbroadStudy";
import { Domains } from "./components/Domains";
import OffersSection from "./components/OffersSection";
import { Section } from "lucide-react";

const HomePage = () => {
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          "https://skillacross.com/api/api/testimonials/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        await response.json();
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };

    fetchTestimonials();
  }, []);

  const nextSlide = useCallback(() => {
    // This function is kept for the useEffect dependency but not used elsewhere
  }, []);

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Auto slide logic would go here if needed
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="bg-white">
      <Header />

      <BannerCarousel />
      {/* <OffersSection/> */}

      <Domains />

{/* About Section */}
<div className="bg-gradient-to-tr from-red-600 via-red-500 to-red-700 max-w-7xl mx-auto px-6 md:px-20 py-16 flex flex-col md:flex-row gap-12 mt-16 rounded-xl shadow-lg">
  {/* About Left */}
  <div className="md:w-2/3 flex flex-col justify-center">
    <h2 className="text-4xl font-bold mb-6 text-white">About Us</h2>
    <h3 className="text-2xl font-semibold mb-4 text-white">
      PCS Private Limited &amp; SkillAcross
    </h3>

    <p className="text-red-100 leading-relaxed">
      For over 25 years, PCS Private Limited has been a trusted leader in
      training and placements, running successful franchise partnerships in CAD,
      software training, abroad studies, and language learning.
    </p>

    <p className="text-red-100 leading-relaxed mt-4">
      Building on this strong foundation, we are proud to launch our own brand –{" "}
      <span className="font-semibold">SkillAcross</span> – dedicated to
      empowering learners with future-ready skills.
    </p>

    <p className="text-red-100 leading-relaxed mt-4">
      <span className="font-semibold">SkillAcross</span> offers programs across:
    </p>

    <ul className="list-disc list-inside text-red-100 leading-relaxed mt-2 space-y-2">
      <li>
        <span className="font-semibold">Engineering &amp; Technology:</span>{" "}
        Mechanical, Civil, Architecture, Automobile, Aeronautical, Software, IT,
        Cloud, Cybersecurity, and Artificial Intelligence.
      </li>
      <li>
        <span className="font-semibold">Languages &amp; Communication:</span>{" "}
        English and German.
      </li>
      <li>
        <span className="font-semibold">Professional Growth:</span> Management
        and career development.
      </li>
    </ul>

    <p className="text-red-100 leading-relaxed mt-4">
      With <span className="font-semibold">SkillAcross</span>, our mission is to
      create a world-class skilling ecosystem that helps learners build
      expertise, gain global exposure, and achieve career success.
    </p>
  </div>

  {/* Quick Enquiry Right */}
  <div className="md:w-1/3">
    <QuickEnquiry />
  </div>
</div>


      {/* Impact & Reach Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">
          Our Impact & Reach
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              value: "1,20,000+",
              label: "Professionals successfully trained",
              icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M15 11a4 4 0 11-8 0 4 4 0 018 0z",
            },
            {
              value: "90%",
              label: "Placement success rate",
              icon: "M9 12h6m0 0l-3-3m3 3l-3 3m6 6v-6m0 0v-2a4 4 0 00-8 0v2v6h8z",
            },
            {
              value: "3000+",
              label: "Hiring Partners, including top IT & MNC companies",
              icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z",
            },
            {
              value: "300+",
              label: "Alumnis working worldwide",
              icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M15 11a4 4 0 11-8 0 4 4 0 018 0z",
            },
            {
              value: "4.8/5",
              label: "Rated by students for quality and placement support",
              icon: "M5 13l4 4L19 7",
            },
            {
              value: "1,00,000+",
              label: "Hands on Training delivered",
              icon: "M3 10h1l2-3 3 6 4-8 2 3h3",
            },
            {
              value: "1,000+",
              label: "Mock Interviews conducted annually",
              icon: "M8 9l3 3-3 3",
            },
            {
              value: "300+",
              label:
                "Partnerships with Industry Leaders for upskilling programs",
              icon: "M5 13l4 4L19 7",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center space-y-3 border border-gray-100 hover:shadow-2xl transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={item.icon}
                />
              </svg>
              <p className="text-4xl font-extrabold text-red-600">
                {item.value}
              </p>
              <p className="text-gray-700">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section with Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">
          Why Choose Us?
        </h2>
        <p className="text-xl font-semibold mb-8 text-center text-gray-700">
          Become a valuable expert with Skill across.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">
          {/* Proven Track Record */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-red-600">
              Proven Track Record
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Trusted by 10,000+ students and professionals</li>
              <li>90% placement success rate with top IT firms.</li>
            </ul>
          </div>

          {/* Expert Trainers */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-red-600">
              Expert Trainers
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Certified industry experts with years of hands-on experience
              </li>
              <li>Personalized mentoring to ensure individual success.</li>
            </ul>
          </div>

          {/* Job-Ready Training */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-red-600">
              Job-Ready Training
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Focus on practical, real-world skills through advanced lab
                sessions
              </li>
              <li>
                Regular projects, assignments, and case studies to enhance
                learning
              </li>
            </ul>
          </div>

          {/* Comprehensive Placement Support */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-red-600">
              Comprehensive Placement Support
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Dedicated placement cell offering resume building, mock
                interviews, and referrals.
              </li>
              <li>Strong hiring partnerships with 500+ top companies.</li>
            </ul>
          </div>

          {/* Flexible Learning Modes */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-red-600">
              Flexible Learning Modes
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Online, offline, and hybrid classes tailored to suit your
                schedule.
              </li>
            </ul>
          </div>

          {/* Recognized Certifications */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-red-600">
              Recognized Certifications
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Globally accepted certifications that validate your expertise.
              </li>
            </ul>
          </div>

          {/* Affordable Learning */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-red-600">
              Affordable Learning
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>World-class training programs at competitive fees.</li>
              <li> Fee range Rs.5,000/- to Rs.1,00,000/- at Affordable Learning</li>
            
            </ul>
          </div>

          {/* Strong Alumni Network */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-red-600">
              Strong Alumni Network
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Connect with a global community of professionals excelling in
                their IT careers.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <AbroadStudy />
      {/* <PolicyPage/> */}

      <TestimonialsSection />
      <Expert />
      <Footer />
    </div>
  );
};

export default HomePage;
