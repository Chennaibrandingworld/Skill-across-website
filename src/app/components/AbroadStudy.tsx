import React from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, University } from "lucide-react";
import Link from "next/link"; // ✅ Correct import for navigation

export const AbroadStudy = () => {
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
  ];

  return (
    <main className="min-h-screen bg-gradient-to-r from-red-100 via-red-200 to-red-300 flex items-center justify-center py-12 px-6">
      <section className="max-w-6xl w-full text-center">
        {/* Heading + Description */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Study Abroad Guidance
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            Explore through a range of <strong>30,000+ courses</strong> from
            over <strong>500+ universities</strong> across top study destinations
            including the USA, Canada, UK, Ireland, Australia, France,
            Netherlands, Finland, and Sweden.
          </p>
        </header>

        {/* Animated Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
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

        {/* Navigation Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Link
            href="/abroadstudy"
            className="inline-block px-10 py-4 bg-gradient-to-r from-red-600 to-red-500 
                       text-white text-lg font-bold rounded-full shadow-lg 
                       hover:from-red-700 hover:to-red-600 
                       transition-transform duration-300 hover:scale-110"
          >
            🚀 Discover More
          </Link>
        </motion.div>
      </section>
    </main>
  );
};
