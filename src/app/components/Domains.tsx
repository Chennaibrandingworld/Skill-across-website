// import Link from "next/link";
// import React, { useState, useEffect } from "react";

// interface Domain {
//   id: number;
//   name: string;
// }

// export const Domains = () => {
//   const [domains, setDomains] = useState<Domain[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchDomains = async () => {
//       try {
//         const response = await fetch(
//           "https://skillacross.com/api/api/domains/"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch domains");
//         }
//         const data: Domain[] = await response.json();
//         setDomains(data);
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "An unknown error occurred"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDomains();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-50/50 to-pink-50/30 py-12">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
//             Our Courses
//           </h2>
//           <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
//             Explore our comprehensive curriculum designed to boost your career
//           </p>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//             {[...Array(8)].map((_, i) => (
//               <div
//                 key={i}
//                 className="bg-white/80 rounded-lg border border-red-100 p-5 h-32 animate-pulse"
//               >
//                 <div className="h-4 bg-red-200 rounded w-3/4 mx-auto mb-4"></div>
//                 <div className="h-2 bg-red-200 rounded w-1/2 mx-auto"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-50/50 to-pink-50/30 py-12">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
//             Our Courses
//           </h2>
//           <div className="text-center py-8 bg-white/80 rounded-lg border border-red-200 backdrop-blur-sm">
//             <div className="text-red-500 font-medium mb-2">
//               Oops! Something went wrong
//             </div>
//             <p className="text-gray-600 mb-4">{error}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-5 py-1.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 text-sm"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-50/50 to-pink-50/30 py-12">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="text-center mb-10">
//           <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-3">
//             Our Courses
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Explore our comprehensive curriculum designed to boost your career
//             and expand your knowledge
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {domains.map((domain) => (
//             <Link href={`/domain/${domain.id}`} key={domain.id}>
//               <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-red-100 p-5 transition-all duration-300 hover:shadow-lg cursor-pointer group hover:border-red-200">
//                 <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 flex items-center justify-center text-red-600 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-red-700 group-hover:text-white transition-all duration-300">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                     />
//                   </svg>
//                 </div>

//                 <h3 className="text-lg font-semibold text-gray-800 text-center group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-red-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 mb-1">
//                   {domain.name}
//                 </h3>

//                 <p className="text-gray-500 text-xs text-center group-hover:text-red-500 transition-colors">
//                   Explore courses
//                 </p>
//               </div>
//             </Link>
//           ))}

//           <Link href="/abroadstudy">
//             <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg border border-red-200 p-5 transition-all duration-300 hover:shadow-lg cursor-pointer group relative">
//               <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 flex items-center justify-center text-red-600 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-red-700 group-hover:text-white transition-all duration-300">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>

//               <h3 className="text-lg font-semibold text-center bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-1">
//                 ABROAD STUDY
//               </h3>

//               <p className="text-red-600/80 text-xs text-center">
//                 International education opportunities
//               </p>

//               <div className="absolute top-2 right-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs px-2 py-0.5 rounded-full">
//                 Global
//               </div>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };
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
        const response = await fetch(
          "https://skillacross.com/api/api/domains/"
        );
        if (!response.ok) throw new Error("Failed to fetch domains");
        const data: Domain[] = await response.json();
        setDomains(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-red-100 via-red-200 to-red-300 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Our Courses
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore specialized courses designed to accelerate your career
              growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm p-8 animate-pulse h-32"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
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
      <div className="min-h-screen bg-gradient-to-r from-red-100 via-red-200 to-red-300 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Our Courses
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-100 via-red-200 to-red-300 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Our Courses</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore specialized courses designed to accelerate your career
            growth
          </p>
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {domains.map((domain) => (
            <Link href={`/domain/${domain.id}`} key={domain.id}>
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer group border border-gray-100 h-32 flex items-center justify-center relative overflow-hidden">
                {/* Main Content - Always Centered */}
                <div className="text-center transition-transform duration-300 group-hover:-translate-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors px-4">
                    {domain.name}
                  </h3>
                </div>

                {/* Explore Link - Hidden by default, shows on hover */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-center justify-center text-red-600">
                    <span className="text-sm font-medium">Explore</span>
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
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
