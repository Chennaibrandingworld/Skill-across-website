"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Link from "next/link";

// Define the Course interface based on the API response
interface Course {
  id: number;
  title: string;
  course_img: string | null;
  description: string;
  domain_name: string;
}

export default function AllCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");

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

  // Get unique domains for filter
  const domains = [
    "All",
    ...new Set(courses.map((course) => course.domain_name)),
  ];

  // Filter courses based on search and domain
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain =
      selectedDomain === "All" || course.domain_name === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-tr from-red-500 via-red-600 to-red-700 py-16 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Our Courses
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Discover a wide range of courses designed to boost your career and
            skills
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative bg-white rounded-xl shadow-lg border border-red-200">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <svg
                className="absolute right-3 top-3 h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Domain Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedDomain === domain
                    ? "bg-white text-red-600 font-semibold"
                    : "bg-red-500 text-white hover:bg-red-400"
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            {selectedDomain === "All"
              ? "All Courses"
              : selectedDomain + " Courses"}
            <span className="text-red-600 ml-2">
              ({filteredCourses.length})
            </span>
          </h2>

          {/* Sort Options (placeholder) */}
          <div className="hidden md:block">
            <select className="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>Sort by: Newest</option>
              <option>Sort by: Popularity</option>
              <option>Sort by: Name</option>
            </select>
          </div>
        </div>

        {/* Loader */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mb-4"></div>
            <p className="text-gray-700 text-lg">Loading courses...</p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-yellow-700 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Course Grid */}
        {!loading && filteredCourses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCourses.map((course) => (
              <Link href={`/courses/${course.id}`} key={course.id}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                  {course.course_img ? (
                    <div className="relative h-48 w-full">
                      <Image
                        src={course.course_img}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-600 rounded-full">
                        {course.domain_name}
                      </span>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {truncateDescription(course.description)}
                    </p>

                    <div className="flex justify-between items-center mt-6">
                      <a
                        href="#"
                        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                      >
                        View Details →
                      </a>

                      {/* <button className="text-gray-500 hover:text-red-600 transition-colors text-sm font-medium">
                      View Details →
                    </button> */}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No results message */}
        {!loading && filteredCourses.length === 0 && courses.length > 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <svg
              className="h-16 w-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && courses.length === 0 && !error && (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <svg
              className="h-16 w-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses available
            </h3>
            <p className="text-gray-600">
              Please check back later for new courses
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
