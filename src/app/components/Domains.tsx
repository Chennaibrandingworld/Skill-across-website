import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Domain {
  id: number;
  name: string;
}

export const Domains = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch("https://skillacross.com/api/api/domains/");
        if (!response.ok) throw new Error("Failed to fetch domains");
        const data: Domain[] = await response.json();
        setDomains(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-red-100 via-red-200 to-red-300 py-10">
        <div className="max-w-6xl mx-auto px-2">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Courses</h2>
            <p className="text-gray-600 text-base">
              Explore specialized courses designed to accelerate your career growth
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm p-6 animate-pulse min-h-[150px]"
              >
                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-100 via-red-200 to-red-300 py-10">
        <div className="max-w-4xl mx-auto px-2 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Courses</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-red-400 via-red-500 to-red-600 text-white py-10">
      <div className="max-w-6xl mx-auto px-2">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Our Courses</h2>
          <p className="text-white/90 text-base">
            Explore specialized courses designed to accelerate your career growth
          </p>
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {domains.map((domain) => (
            <Link href={`/domain/${domain.id}`} key={domain.id}>
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer group border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden p-6 min-h-[100px]">
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-red-600 transition-colors text-center">
                  {domain.name}
                </h3>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-sm font-medium text-red-600 flex items-center">
                    Explore
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
