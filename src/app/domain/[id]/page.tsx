// app/src/app/domain/[id]/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Expert } from "@/app/components/expert";

interface Course {
  id: number;
  title: string;
  course_img: string; // Added course_img field
}

interface Domain {
  id: number;
  name: string;
}

const DomainCoursesPage = () => {
  const params = useParams();
  const domainId = params.id as string;

  const [courses, setCourses] = useState<Course[]>([]);
  const [domain, setDomain] = useState<Domain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDomainCourses = async () => {
      try {
        setLoading(true);

        // First, fetch domain details
        const domainResponse = await fetch(
          `https://skillacross.com/api/api/domains/${domainId}/courses/`
        );
        if (!domainResponse.ok) {
          throw new Error(`Failed to fetch domain: ${domainResponse.status}`);
        }
        const domainData: Domain = await domainResponse.json();
        setDomain(domainData);

        // Then, fetch courses for this domain
        const coursesResponse = await fetch(
          `https://skillacross.com/api/api/domains/${domainId}/courses/`
        );
        if (!coursesResponse.ok) {
          throw new Error(`Failed to fetch courses: ${coursesResponse.status}`);
        }
        const coursesData: Course[] = await coursesResponse.json();
        setCourses(coursesData);

        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (domainId) {
      fetchDomainCourses();
    }
  }, [domainId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-red-600"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Hero Section */}
      {/* <section className="relative w-full py-20 bg-gradient-to-r from-violet-600 to-rose-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {domain?.name} Courses
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Explore our specialized courses in {domain?.name}
          </p>
        </div>
      </section> */}
      <section
        className="w-full min-h-[200px] flex flex-col justify-center items-center px-6 md:px-20 py-0 text-white text-center"
        style={{
          background: "linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)",
        }}
      >
        <h1 className="text-5xl font-extrabold mb-4 mt-6 drop-shadow-lg">
          {domain?.name} Courses
        </h1>
        <p className="text-lg md:text-xl text-white/90">
          Explore our specialized courses in {domain?.name}
        </p>
      </section>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {domain?.name} Courses
          </h1>
          <p className="text-gray-600">
            Explore our specialized courses in {domain?.name}
          </p>
        </div> */}

        {courses.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-sm p-10 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                No Courses Available
              </h3>
              <p className="text-gray-600 mb-6">
                There are currently no courses available for this domain.
              </p>
              <Link
                href="/"
                className="inline-flex items-center bg-red-600 text-white px-5 py-2.5 rounded-md hover:bg-red-700 transition"
              >
                Browse Other Domains
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Course Image */}
                <div className="h-48 overflow-hidden">
                  <Image
                    src={course.course_img}
                    alt={course.title}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {course.title}
                  </h3>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-red-600 font-medium">Enroll Now</span>
                    <Link
                      href={`/courses/${course.id}`}
                      className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Expert />
      <Footer />
    </div>
  );
};

export default DomainCoursesPage;
