// pages/policy.tsx
import React from "react";
import Link from "next/link";

const PolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Page Header */}
        <h1 className="text-4xl font-bold mb-6 text-red-600">Policy & Fee Details</h1>

        {/* Fee Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Fee Range</h2>
          <p className="text-lg text-gray-700">
            Fee range: <span className="font-bold">Rs.5,000/- to Rs.1,00,000/-</span> <br />
            at <span className="font-semibold text-red-600">Affordable Learning</span>
          </p>
        </div>

        {/* Policy Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Policy Details</h2>
          
          {/* PDF Download Link */}
          <div className="mt-6">
            <Link 
              href="assets/img/Policies.pdf" 
              target="_blank" 
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              View Full Policy PDF
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;