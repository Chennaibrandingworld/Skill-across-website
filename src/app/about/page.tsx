"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Header } from "../components/Header";
import { Expert } from "../components/expert";
import { Footer } from "../components/Footer";
import LogoSlider from "../components/logo_slider";
import TestimonialsSection from "../components/testimonial_section";

// Define TypeScript interfaces
interface Testimonial {
  id: number;
  name: string;
  description: string;
  rating: number;
  photo: string;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  profile_photo: string;
  sort_order: number;
}

interface TeamData {
  id: number;
  title: string;
  description: string;
  members: TeamMember[];
}

export default function Page() {
  const [teamData, setTeamData] = useState<TeamData | null>(null);

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
        // Data is fetched but not stored since it's unused
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };

    const fetchTeamData = async () => {
      try {
        const response = await fetch("https://skillacross.com/api/api/teams/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Assuming the API returns an array, take the first item
        if (data.length > 0) {
          setTeamData(data[0]);
        }
      } catch (err) {
        console.error("Error fetching team data:", err);
      }
    };

    fetchTestimonials();
    fetchTeamData();
  }, []);

  return (
    <div className="bg-white">
      <Header />

      {/* Violet-Rose Gradient Hero-like Section */}
      <section
        className="w-full min-h-[200px] flex flex-col justify-center items-center px-6 md:px-20 py-0 text-white text-center"
        style={{
          background: "linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)",
        }}
      >
        <h1 className="text-5xl font-extrabold mb-4 mt-6 drop-shadow-lg">
          About Us
        </h1>
      </section>

      {/* Mission and Training Focus */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        {/* Centered Heading */}
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Our Mission and Training Focus
        </h2>

        {/* Content and Image Row */}
        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Left Content */}
          <div className="md:w-1/2 text-gray-900 space-y-6 text-left">
            <p>
              SkillAcross, backed by 25 years of training and placement
              expertise, is a future-ready brand offering customized,
              certification-driven training and talent solutions. In
              collaboration with a 35-year-old placement leader and in
              association with India&apos;s renowned abroad studies brand, we
              empower individuals and organizations with skills in:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Engineering & Core:</strong> Mechanical, Civil,
                Automobile, Aeronautical, Electrical, Electronics, Architecture
              </li>
              <li>
                <strong>Technology & IT:</strong> Software, Cloud, Cyber
                Security, Data Science, IoT, AI
              </li>
              <li>
                <strong>Professional Skills:</strong> Languages, Management and
                Leadership
              </li>
            </ul>
            <p>
              With strong industry ties and global pathways, SkillAcross bridges
              education, employability, and international opportunities.
            </p>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/assets/img/about-us.png"
              alt="Our Mission and Training Focus"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Vision, Mission & Core Values Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">
          Our Vision, Mission & Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vision Card */}
          <div className="bg-rose-50 rounded-lg shadow p-6 flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-red-600">
              Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To be the most trusted and innovative training institute that
              consistently empowers individuals to excel in their careers,
              fostering a generation of skilled professionals who contribute to
              the global tech community.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-rose-50 rounded-lg shadow p-6 flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-red-600">
              Our Mission
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                To provide world-class training that focuses on industry
                relevance and career-oriented outcomes.
              </li>
              <li>To ensure 100% placement assistance for every student.</li>
              <li>
                To stay at the forefront of technology, updating our curriculum
                to match evolving industry trends.
              </li>
            </ul>
          </div>

          {/* Core Values Card */}
          <div className="bg-rose-50 rounded-lg shadow p-6 flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-red-600">
              Core Values
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li>
                <strong>Integrity:</strong> We are committed to honesty and
                transparency in all our interactions.
              </li>
              <li>
                <strong>Excellence:</strong> We strive to deliver top-quality
                training that exceeds expectations.
              </li>
              <li>
                <strong>Innovation:</strong> We embrace new technologies and
                teaching methodologies to stay ahead.
              </li>
              <li>
                <strong>Empowerment:</strong> We believe in nurturing talent and
                unlocking potential.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16 flex flex-col md:flex-row items-center gap-12">
        {/* Left Image */}
        <div className="md:w-1/2">
          <Image
            src="/assets/img/founders.jpg"
            alt="Founder, Founder of Skill across"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover"
            priority
          />
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 flex flex-col justify-center space-y-6 text-gray-900">
          <h2 className="text-3xl font-bold">Meet the Founder</h2>
          {/* <h3 className="text-xl font-semibold">Founder, Ex-Amazon</h3> */}
          <p>
            At the heart of SkillAcross is the vision of our founder a seasoned
            educationist and entrepreneur with over two decades of experience in
            skill development and global placements. Having witnessed first-hand
            the evolving demands of industries worldwide, he was driven to build
            a platform that not only imparts knowledge but also ensures
            employability and international opportunities for learners.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      <LogoSlider />
      <Expert />
      <Footer />
    </div>
  );
}
