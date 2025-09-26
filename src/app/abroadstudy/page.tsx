"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  University,
  FileText,
  ClipboardCheck,
  Mic,
  Award,
  RefreshCw,
  DollarSign,
  Stamp,
  Users,
  Plane,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Expert } from "../components/expert";

export default function AbroadStudy() {
  const [showMore] = useState(false);

  const cards = [
    {
      title: "Profile Evaluation",
      description:
        "Understanding your goals, academics & affordability is the first step in deciding the country, universities, and courses that best suit your profile.",
      icon: <BookOpen className="w-10 h-10 text-red-600" />,
    },
    {
      title: "Course Selection",
      description:
        "With thousands of course options, our experts will help you choose the right program that fits your interests and aspirations.",
      icon: <GraduationCap className="w-10 h-10 text-red-600" />,
    },
    {
      title: "University Shortlisting",
      description:
        "Shortlisting the ideal universities based on your preferences — our consultants will find the perfect match for your profile and needs.",
      icon: <University className="w-10 h-10 text-red-600" />,
    },
    {
      title: "SOP, LOR & Resume Crafting",
      description:
        "We ensure your SOP, LOR & Resume clearly reflect your academic and professional aspirations.",
      icon: <FileText className="w-10 h-10 text-red-600" />,
    },
    {
      title: "Application Filing",
      description:
        "Error-free university applications are our forte. We take care of specifics for each application.",
      icon: <ClipboardCheck className="w-10 h-10 text-red-600" />,
    },
    {
      title: "Admission Interview Prep",
      description:
        "Our experts guide you with tips and tricks to ace university admission interviews.",
      icon: <Mic className="w-10 h-10 text-red-600" />,
    },
    {
      title: "Scholarship Guidance",
      description:
        "We guide you with applications, essays, and strategies to improve your scholarship chances.",
      icon: <Award className="w-10 h-10 text-red-600" />,
    },
    {
      title: "Application Follow-up",
      description:
        "We track your application status and provide timely updates about your admission.",
      icon: <RefreshCw className="w-10 h-10 text-red-600" />,
    },
    {
      title: "Education Loan Assistance",
      description:
        "Our specialists help you choose banks, prepare documents, and negotiate loan terms.",
      icon: <DollarSign className="w-10 h-10 text-red-600" />,
    },
    {
      title: "Visa Guidance",
      description:
        "We help prepare and submit academic & financial documents required by embassies.",
      icon: <Stamp className="w-10 h-10 text-red-600" />,
    },
    {
      title: "Visa Interview Prep",
      description:
        "Our experts train you with mock sessions to confidently face visa interviews.",
      icon: <Users className="w-10 h-10 text-red-600" />,
    },
    {
      title: "Travel & Accommodation",
      description:
        "We assist you in planning travel, booking tickets, and finding accommodation abroad.",
      icon: <Plane className="w-10 h-10 text-red-600" />,
    },
  ];

  return (
    <div className="bg-white">
      {/* ✅ Header */}
      <Header />

      {/* Hero Section with Red Gradient */}
      <section
        className="w-full min-h-[400px] flex flex-col justify-center items-center px-6 md:px-20 py-24 text-white text-center"
        style={{
          background:
            "linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%)",
        }}
      >
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
          Abroad Study
        </h1>
        <p className="text-2xl max-w-3xl opacity-90">
          Achieve your dreams with expert guidance for studying abroad
        </p>
      </section>

      {/* Main Content */}
      <main className="min-h-screen bg-gradient-to-r from-red-50 via-red-100 to-red-200 flex flex-col items-center justify-center py-12 px-6">
        <section className="max-w-7xl w-full text-center">
          {/* Section Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Study Abroad Guidance
            </h1>
            <p className="mt-4 text-lg text-gray-700 max-w-4xl mx-auto">
              Explore through a range of <strong>30,000+ courses</strong> from
              over <strong>500+ universities</strong> across top destinations
              including the USA, Canada, UK, Ireland, Australia, France,
              Netherlands, Finland, and Sweden.
            </p>
          </header>

          {/* Cards Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-red-100"
              >
                <div className="flex justify-center mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

         {/* ✅ Training Programs Section */}
<section className="mt-20">
  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center">
    Training Programs We Offer
  </h2>

  <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    {[
      {
        title: "IELTS Exam Preparation Training",
        description:
          "Ace your IELTS with expert guidance, personalized practice sessions, and proven strategies to achieve your dream score.",
        icon: "📘",
        color: "from-blue-500 to-blue-600",
      },
      {
        title: "German Language Training (A1–C2)",
        description:
          "Master German from beginner to advanced (A1–C2) with immersive lessons, cultural insights, and exam preparation.",
        icon: "🇩🇪",
        color: "from-yellow-500 to-red-600",
      },
      {
        title: "English Language Training",
        description:
          "Enhance your English fluency, grammar, and communication skills with interactive training sessions.",
        icon: "🗣️",
        color: "from-green-500 to-emerald-600",
      },
    ].map((program, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.2 }}
        viewport={{ once: true }}
        className={`p-8 rounded-2xl shadow-lg border border-gray-100 bg-gradient-to-r ${program.color} text-white relative overflow-hidden transform hover:scale-105 transition duration-300`}
      >
        {/* Icon Circle */}
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-3xl mb-6 shadow-md">
          <span className="">{program.icon}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-3">{program.title}</h3>

        {/* Description */}
        <p className="text-base opacity-90 leading-relaxed">
          {program.description}
        </p>

        {/* Decorative Glow Effect */}
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </motion.div>
    ))}
  </div>
</section>


          {/* Discover More Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-12"
          >
           

            {showMore && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-8 max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg text-gray-700 border border-red-100"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Why Choose Us?
                </h4>
                <p>
                  Our team of expert consultants ensures you receive
                  personalized guidance tailored to your academic background,
                  career goals, and financial plans. From profile evaluation to
                  final university admission, we simplify your journey to
                  studying abroad.
                </p>
              </motion.div>
            )}
          </motion.div>
        </section>
      </main>

      {/* ✅ Expert & Footer */}
      <Expert />
      <Footer />
    </div>
  );
}