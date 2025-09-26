"use client";

import React, { useEffect, useState } from "react";
import {
  FaLightbulb,
  FaChartLine,
  FaGift,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Footer } from "../components/Footer";
import { Expert } from "../components/expert";
import { Header } from "../components/Header";

// Define the Job type interface
interface Job {
  id: number;
  job_title: string;
  job_hint: string;
  job_location: string;
  job_description: string;
  apply_link: string;
}

export default function Page() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const cards = [
    {
      icon: <FaLightbulb className="text-red-600 w-10 h-10 mb-4" />,
      title: "Innovative Environment",
      description: "Work in a collaborative space where your ideas matter.",
    },
    {
      icon: <FaChartLine className="text-red-600 w-10 h-10 mb-4" />,
      title: "Career Growth",
      description:
        "Opportunities to grow and thrive in your professional journey.",
    },
    {
      icon: <FaGift className="text-red-600 w-10 h-10 mb-4" />,
      title: "Comprehensive Benefits",
      description: "Enjoy a range of benefits that prioritize your well-being.",
    },
  ];

  // 🔹 Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("https://skillacross.com/api/api/jobs/");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="bg-white">
      <Header />

      {/* Hero Section */}
      {/* <section
        className="w-full min-h-[400px] flex flex-col justify-center items-center px-6 md:px-20 py-24 text-white text-center"
        style={{
          background: "linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)",
        }}
      >
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">Careers</h1>
        <p className="text-2xl max-w-3xl opacity-90">
          Join our dynamic team and make an impact. Discover exciting career
          opportunities with us.
        </p>
      </section> */}
      <section
        className="w-full min-h-[200px] flex flex-col justify-center items-center px-6 md:px-20 py-0 text-white text-center"
        style={{
          background: "linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)",
        }}
      >
        <h1 className="text-5xl font-extrabold mb-4 mt-6 drop-shadow-lg">
          Careers
        </h1>
      </section>

      {/* Why Join Us */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Why Join Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-800">
          {cards.map(({ icon, title, description }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 border rounded-lg shadow hover:shadow-lg transition"
            >
              {icon}
              <h3 className="text-2xl font-semibold mb-2">{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16 bg-rose-50 rounded-md shadow-md mt-12">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Open Positions
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading jobs...</p>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition flex flex-col"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {job.job_title}
                </h3>
                <p className="text-gray-600 mb-4 italic">{job.job_hint}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <FaMapMarkerAlt className="text-red-500" />
                  {job.job_location || "Not specified"}
                </div>

                <details className="mb-4">
                  <summary className="cursor-pointer text-purple-600 font-semibold">
                    View Details
                  </summary>
                  <p className="mt-2 text-gray-700 whitespace-pre-line text-sm">
                    {job.job_description}
                  </p>
                </details>

                <a
                  href={job.apply_link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No open positions at the moment.
          </p>
        )}
      </section>

      <Expert />
      <Footer />
    </div>
  );
}
