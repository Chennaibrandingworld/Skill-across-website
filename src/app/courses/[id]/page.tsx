"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Expert } from "@/app/components/expert";
import TestimonialsSection from "@/app/components/testimonial_section";
import { QuickEnquiry } from "@/app/components/QuickEnquiry";

// Define types for the course data structure
interface Benefit {
  role: string;
  benefits: string;
  companies_hiring: string;
  countries_hiring: string;
  salary_package: string;
}

interface Certificate {
  certificate_image?: string;
}

interface Skill {
  id: number;
  skill_name: string;
}

interface Tool {
  id: number;
  tool_name: string;
  tool_logo: string;
  tool_link?: string;
}

interface Content {
  id: number;
  title: string;
  description: string;
}

interface Lab {
  id: number;
  title: string;
  description: string;
}

interface Faq {
  id: number;
  question: string;
  answer: string;
}

interface About {
  image?: string;
  description: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  apply_link: string;
  syllabus_file?: string;
  video_link?: string;
  about?: About;
  benefits?: Benefit[];
  certificate?: Certificate;
  skills?: Skill[];
  tools?: Tool[];
  contents?: Content[];
  labs?: Lab[];
  faqs?: Faq[];
}

// Enquiry Form Component for Download
const DownloadEnquiryForm: React.FC<{
  course: Course;
  onClose: () => void;
  onSuccess: () => void;
}> = ({ course, onClose, onSuccess }) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const requestData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        title: course.title,
        message: `Request to download ${course.title} curriculum from ${formData.name} (${formData.email}, ${formData.phone})`,
      };

      const response = await fetch("https://skillacross.com/api/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();
      if (!response.ok) {
        if (responseData.errors && typeof responseData.errors === "object") {
          const errorMessages = Object.entries(
            responseData.errors as Record<string, unknown>
          )
            .map(([field, errors]) => {
              if (Array.isArray(errors)) {
                return `${field}: ${errors.join(", ")}`;
              }
              return `${field}: ${String(errors)}`;
            })
            .join("; ");
          throw new Error(errorMessages);
        }
        throw new Error(
          responseData.message ||
            `Server responded with status ${response.status}`
        );
      }

      console.log("Form submitted successfully:", responseData);
      onSuccess();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit enquiry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Download Curriculum
        </h3>
        <p className="text-gray-600 mb-6">
          Please provide your details to download the {course.title} curriculum.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            Error: {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
            required
            disabled={submitting}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
            required
            disabled={submitting}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
            required
            disabled={submitting}
          />
          <button
            type="submit"
            className={`w-full font-semibold py-2 rounded-md transition ${
              submitting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Download Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [showDownloadForm, setShowDownloadForm] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `https://skillacross.com/api/api/course-detail/${id}/`
        );
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data: Course = await res.json();
        setCourse(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleDownloadSuccess = () => {
    if (course && course.syllabus_file) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = course.syllabus_file;
      link.setAttribute("download", `${course.title} Curriculum.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setShowDownloadForm(false);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-600"></div>
          <span className="ml-4 text-gray-800 font-semibold text-lg">
            Loading course details...
          </span>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center px-6">
          <p className="text-red-700 font-bold text-xl mb-4">
            Error loading course
          </p>
          <p className="text-gray-800 text-center">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-gray-800 text-lg">No course details available.</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Prepare tabs and current benefit data
  const tabs = course.benefits?.map((b) => b.role) || [];
  const benefit = course.benefits?.[activeTab];

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <Header />

      {/* Hero section */}
     <section className="relative w-full py-8 md:py-12"
  style={{
    background: "linear-gradient(120deg,#7928ca 0%,#ff0080 100%)",
    backgroundPosition: "center",
  }}
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg
            width="100%"
            height="100%"
            className="absolute left-0 top-0 opacity-20"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center px-6 md:px-12">
          <div className="mb-2 text-white/80 text-base">
            <span>&#8594; All Courses </span>
            <span className="mx-2">&gt;</span>
            <span className="font-semibold">{course.title}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
  {course.title}
</h1>


           {/* About Section */}
        <section className="mb-12">
          {/* <h2 className="text-2xl md:text-3xl font-bold mb-5">
            About {course.title}
          </h2> */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
          <p className="text-lg leading-relaxed text-white">
  {course.about?.description}
</p>



            {course.about?.image && (
              <Image
                src={course.about.image}
                alt="About course"
                width={600}
                height={400}
                className="rounded-lg w-full shadow-md"
                decoding="async"
              />
            )}
            
          </div>
        </section>
          {/* <p className="mb-8 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
            {course.description}
          </p> */}
          <div className="flex flex-wrap justify-center items-center space-x-4 mb-7">
            <span className="text-white bg-purple-600/80 px-3 py-1 rounded text-sm font-semibold flex items-center gap-1">
              <span>💻</span>Online Session
            </span>
            <span className="text-white bg-pink-600/70 px-3 py-1 rounded text-sm font-semibold flex items-center gap-1">
              <span>🏫</span>Classroom Session
            </span>
            <span className="text-white bg-amber-500/80 px-3 py-1 rounded text-sm font-semibold flex items-center gap-1">
              <span>🎓</span>Certificate Course
            </span>
          </div>
          <div className="flex gap-3 justify-center">
            {course.syllabus_file && (
              <button
                onClick={() => setShowDownloadForm(true)}
                className="bg-white text-gray-900 hover:bg-orange-100 px-7 py-3 ml-1 rounded border font-semibold shadow"
              >
                Download Curriculum
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Download Form Popup */}
      {showDownloadForm && (
        <DownloadEnquiryForm
          course={course}
          onClose={() => setShowDownloadForm(false)}
          onSuccess={handleDownloadSuccess}
        />
      )}

      {/* Rest of your course page content remains the same */}
      <main className="max-w-6xl mx-auto px-4 md:px-10 py-12">
        {/* About Section */}
        {/* <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-5">
            About {course.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {course.about?.image && (
              <Image
                src={course.about.image}
                alt="About course"
                width={600}
                height={400}
                className="rounded-lg w-full shadow-md"
                decoding="async"
              />
            )}
            <p className="text-lg leading-relaxed">
              {course.about?.description}
            </p>
          </div>
        </section> */}

        

        {/* Benefits Section */}
        <section className="py-8 mb-12">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center tracking-tight">
              {course.title} Benefits
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {tabs.length > 0 && (
                  <div className="flex justify-start mb-8">
                    <div className="bg-white rounded-full p-2 flex gap-2 shadow-md border border-orange-100">
                      {tabs.map((tab, idx) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(idx)}
                          className={`px-6 py-2 rounded-full font-semibold outline-none transition
                            ${
                              idx === activeTab
                                ? "bg-orange-500 text-white shadow"
                                : "bg-transparent text-orange-600 hover:bg-orange-100"
                            }`}
                          style={{
                            boxShadow:
                              idx === activeTab
                                ? "0 2px 8px rgba(255, 139, 38, 0.08)"
                                : undefined,
                          }}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {benefit && (
                  <div className="bg-white rounded-2xl shadow-lg px-8 py-8">
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-2 text-gray-800">
                        Benefits
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {benefit.benefits
                          .split("\n")
                          .map((b, i) =>
                            b.trim() ? <li key={i}>{b.trim()}</li> : null
                          )}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-semibold text-lg mb-2 text-gray-800">
                        Companies Hiring
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {benefit.companies_hiring.split("\n").map(
                          (c, i) =>
                            c.trim() && (
                              <span
                                key={i}
                                className="bg-orange-400 text-white font-bold px-4 py-1 rounded-md text-sm"
                              >
                                {c.trim()}
                              </span>
                            )
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-semibold text-lg mb-2 text-gray-800">
                        Countries Hiring
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {benefit.countries_hiring.split("\n").map(
                          (c, i) =>
                            c.trim() && (
                              <span
                                key={i}
                                className="bg-gray-100 text-gray-800 font-semibold px-4 py-1 rounded-md text-sm"
                              >
                                {c.trim().replace(/\.$/, "")}
                              </span>
                            )
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <h3 className="font-semibold text-lg mb-2 text-gray-800">
                        Salary Package
                      </h3>
                      <span className="text-xl font-bold text-gray-800">
                        {benefit.salary_package}
                      </span>
                      <span className="text-sm block text-gray-600">
                        &nbsp;per year in India, based on experience.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* You can add your QuickEnquiry component here if needed */}
              <div>
                <QuickEnquiry />
                {/* Placeholder for QuickEnquiry component */}
              </div>
            </div>
          </div>
        </section>

         

        

        <section className="mb-12 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Skills You Will Learn</h2>
            <ul className="list-disc ml-6 text-base space-y-1">
              {course.skills?.map(({ id, skill_name }) => (
                <li key={id}>{skill_name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Global Certification</h2>
            <div className="flex flex-wrap gap-7">
              {course.tools?.map(({ id, tool_name, tool_link }) => (
                <div key={id} className="flex flex-col items-center w-24">
                  {/* Clickable Tool Name that redirects to tool_link */}
                  <button
                    onClick={() => {
                      if (tool_link) {
                        window.open(tool_link, "_blank", "noopener,noreferrer");
                      }
                    }}
                    className={`text-center text-sm font-medium ${
                      tool_link
                        ? "text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors duration-200"
                        : "text-gray-600 cursor-default"
                    }`}
                    title={
                      tool_link
                        ? `Visit ${tool_name} website`
                        : "Link not available"
                    }
                    disabled={!tool_link}
                  >
                    {tool_name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Course Contents (Syllabus)
          </h2>
          <div className="grid md:grid-cols-2 gap-7">
            {course.contents?.map(({ id, title, description }) => (
              <div key={id} className="border bg-white p-5 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-base">{description}</p>
              </div>
            ))}
          </div>
          {course.syllabus_file && (
            <a
              href={course.syllabus_file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-3 bg-orange-500 text-white rounded font-semibold shadow hover:bg-orange-600 transition"
            >
              Download Syllabus PDF
            </a>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Labs & Practical Exercises
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {course.labs?.map(({ id, title, description }) => (
              <div key={id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {course.faqs?.map(({ id, question, answer }) => (
              <details
                key={id}
                className="bg-white rounded-lg p-4 shadow cursor-pointer"
              >
                <summary className="font-semibold text-base">
                  {question}
                </summary>
                <p className="mt-2">{answer}</p>
              </details>
            ))}
          </div>
        </section>
            {/* Certificate Section with White Background */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Certificate & Exam
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Become a valuable expert with Skill Across.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Certificate Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                {course.certificate?.certificate_image ? (
                  <Image
                    src={course.certificate.certificate_image}
                    alt="Course certificate"
                    width={400}
                    height={300}
                    className="rounded-lg w-full shadow-md border-2 border-gray-200 max-w-md"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 border-2 border-gray-300 text-center">
                    <div className="mb-6">
                      <svg
                        className="w-20 h-20 mx-auto text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-700">
                      Certificate of Completion
                    </h3>
                    <p className="text-gray-600 mt-2">Skill Across</p>
                  </div>
                )}
              </div>
            </div>

            {/* Certificate Features */}
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-full mr-4 flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Learn From Industry Experts
                  </h3>
                  <p className="text-gray-700">
                    Get guidance from experienced professionals who share
                    real-world insights, ensuring you gain relevant and
                    up-to-date knowledge that is highly valued in the industry.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-full mr-4 flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Free Resources
                  </h3>
                  <p className="text-gray-700">
                    Access a variety of free learning materials, including
                    tutorials, articles, and tools to help reinforce your
                    learning and build your skills outside of the classroom.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-full mr-4 flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Learn Anytime, Anywhere
                  </h3>
                  <p className="text-gray-700">
                    Study at your own pace with flexible access to courses and
                    resources, allowing you to learn from anywhere, whether
                    you&apos;re at home or on the go.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-full mr-4 flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Skill-Based Learning
                  </h3>
                  <p className="text-gray-700">
                    Focus on practical, skill-based learning to ensure you
                    acquire hands-on experience that prepares you for real-world
                    challenges in the industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* <TestimonialsSection /> */}
      <Expert />
      <Footer />
    </div>
  );
}
