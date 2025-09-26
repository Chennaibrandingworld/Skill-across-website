"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// Define the Course interface based on the API response
interface Course {
  id: number;
  title: string;
  course_img: string | null;
  description: string;
  domain_name: string;
}

export default function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Function to truncate description to 50 words
  const truncateDescription = (
    text: string,
    wordLimit: number = 50
  ): string => {
    if (!text) return "No description available";

    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;

    return words.slice(0, wordLimit).join(" ") + "...";
  };

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://skillacross.com/api/api/courses/"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Course[] = await response.json();
        setCourses(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Could not load courses from server. Please try again later.");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Auto slide functionality
  useEffect(() => {
    if (!isAutoPlaying || courses.length <= 4) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(courses.length / 4));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, courses.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(courses.length / 4));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [courses.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(courses.length / 4)) %
        Math.ceil(courses.length / 4)
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [courses.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Calculate the courses to display for the current slide
  const getCurrentCourses = () => {
    const startIndex = currentSlide * 4;
    return courses.slice(startIndex, startIndex + 4);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Beautiful Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #000 2%, transparent 0%), radial-gradient(circle at 75px 75px, #000 2%, transparent 0%)`,
            backgroundSize: "100px 100px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Our Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of courses designed to help you
            master new skills and advance your career.
          </p>
        </div>

        {/* Loader */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading courses...</p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="text-center py-8 bg-yellow-50 rounded-lg mb-8 border border-yellow-200">
            <p className="text-yellow-700 font-semibold">{error}</p>
          </div>
        )}

        {/* Course Carousel - Only show if we have courses */}
        {!loading && courses.length > 0 && (
          <>
            <div className="relative overflow-hidden rounded-2xl">
              {/* Navigation buttons */}
              {courses.length > 4 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:scale-110 transition-all border border-gray-100"
                    aria-label="Previous courses"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
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
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:scale-110 transition-all border border-gray-100"
                    aria-label="Next courses"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
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

              {/* Course Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-transform duration-500 ease-in-out">
                {getCurrentCourses().map((course) => (
                  <Link href={`/courses/${course.id}`} key={course.id}>
                    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2">
                      {/* Course Image */}
                      <div className="relative h-48 overflow-hidden">
                        {course.course_img ? (
                          <Image
                            src={course.course_img}
                            alt={course.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">
                              No image available
                            </span>
                          </div>
                        )}
                        {/* Domain Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                            {course.domain_name}
                          </span>
                        </div>
                      </div>

                      {/* Course Content */}
                      <div className="p-6">
                        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {truncateDescription(course.description, 25)}
                        </p>

                        {/* Enroll Button */}
                        <div className="mt-4">
                          <span className="inline-block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
                            Enroll Course
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Indicators */}
            {courses.length > 4 && (
              <div className="flex justify-center mt-8 space-x-3">
                {Array.from({ length: Math.ceil(courses.length / 4) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "w-8 bg-gradient-to-r from-blue-600 to-purple-600"
                          : "w-2 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  )
                )}
              </div>
            )}

            {/* View All Button */}
            <div className="text-center mt-12">
              <Link href="/all_courses">
                <button className="relative overflow-hidden group bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-transparent">
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    View All Courses
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </Link>
            </div>
          </>
        )}

        {/* Empty state */}
        {!loading && courses.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Courses Available
              </h3>
              <p className="text-gray-600">
                Please check back later for new course offerings.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
