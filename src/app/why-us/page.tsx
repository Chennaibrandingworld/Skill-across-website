import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Expert } from "../components/expert";

export default function Page() {
  return (
    <div className="bg-white">
      <>
        <Header />

        <section
          className="w-full min-h-[200px] flex flex-col justify-center items-center px-6 md:px-20 py-0 text-white text-center"
          style={{
            background: "linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)",
          }}
        >
          <h1 className="text-5xl font-extrabold mb-4 mt-6 drop-shadow-lg">
            Why Us?
          </h1>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-20 py-16 bg-white rounded-md shadow-md">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Why Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-gray-800">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-4 text-red-600">
                Proven Excellence
              </h3>
              <p>Trusted by 1,20,000+ students and professionals</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-4 text-red-600">
                Expert Trainers
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Certified industry experts with years of hands-on experience
                </li>
                <li>Personalized mentoring to ensure individual success.</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-4 text-red-600">
                Job-Ready Training
              </h3>
              <ul className="list-disc list-inside space-y-1">
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

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-4 text-red-600">
                Comprehensive Placement Support
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Dedicated placement cell offering resume building, mock
                  interviews, and referrals.
                </li>
                <li>Strong hiring partnerships with 500+ top companies</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-4 text-red-600">
                Flexible Learning Modes
              </h3>
              <p>
                Online, offline, and hybrid classes tailored to suit your
                schedule
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-4 text-red-600">
                Abroad Studies
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Our Study Abroad Education Consultancy in Chennai has
                  extensive knowledge about the options available to students
                  interested in studying abroad.
                </li>
                <li>
                  We offer expert advice on choosing the destination,
                  university, and program to match the student&apos;s academic
                  and career aspirations. (No Consultation Fee)
                </li>
              </ul>
            </div>
          </div>
        </section>
      </>
      <Expert />
      <Footer />
    </div>
  );
}
