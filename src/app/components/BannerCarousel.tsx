// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useRouter } from "next/navigation";

// interface Banner {
//   id: number;
//   domain: number;
//   domain_name: string;
//   image: string;
//   image_name: string;
//   created_at: string;
//   updated_at: string;
// }

// const BannerCarousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [banners, setBanners] = useState<Banner[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);
//   const router = useRouter();

//   // API endpoint
//   const API_URL = "https://skillacross.com/api/api/banners/";

//   // Check if mobile device
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener('resize', checkMobile);

//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Preload images function
//   const preloadImages = useCallback((imageUrls: string[]) => {
//     imageUrls.forEach((url) => {
//       const img = new Image();
//       img.src = url;
//       // No need to wait for load, browser will cache them
//     });
//   }, []);

//   // Fetch banners from API - Optimized for speed
//   const fetchBanners = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Use AbortController for timeout
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

//       const response = await fetch(API_URL, {
//         method: 'GET',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//         signal: controller.signal,
//       });

//       clearTimeout(timeoutId);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data: Banner[] = await response.json();

//       setBanners(data);

//       // Preload images in background without waiting
//       if (data.length > 0) {
//         const imageUrls = data.map(banner => banner.image);
//         preloadImages(imageUrls);
//       }

//     } catch (err) {
//       console.error('Error fetching banners:', err);
//       setError(err instanceof Error ? err.message : 'Failed to fetch banners');
//     } finally {
//       setLoading(false);
//     }
//   }, [preloadImages]);

//   useEffect(() => {
//     fetchBanners();
//   }, [fetchBanners]);

//   const nextSlide = useCallback(() => {
//     if (banners.length <= 1) return;
//     setCurrentSlide(prev => prev === banners.length - 1 ? 0 : prev + 1);
//   }, [banners.length]);

//   const prevSlide = useCallback(() => {
//     if (banners.length <= 1) return;
//     setCurrentSlide(prev => prev === 0 ? banners.length - 1 : prev - 1);
//   }, [banners.length]);

//   // Auto-slide
//   useEffect(() => {
//     if (banners.length <= 1) return;

//     const interval = setInterval(nextSlide, 5000);
//     return () => clearInterval(interval);
//   }, [nextSlide, banners.length]);

//   const goToSlide = useCallback((index: number) => {
//     if (banners.length === 0 || index === currentSlide) return;
//     setCurrentSlide(index);
//   }, [banners.length, currentSlide]);

//   // Navigation function to domain page
//   const navigateToDomain = useCallback((domainId: number) => {
//     router.push(`/domain/${domainId}`);
//   }, [router]);

//   // Touch swipe functionality
//   const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 50) {
//       nextSlide();
//     }

//     if (touchStart - touchEnd < -50) {
//       prevSlide();
//     }
//   };

//   // // Mobile-optimized container height
//   // const getContainerHeight = () => {
//   //   if (typeof window === 'undefined') return '60vh';

//   //   const vh = window.innerHeight * 0.01;
//   //   if (isMobile) {
//   //     return `min(50vh, ${40 * vh}px)`;
//   //   }
//   //   return `min(60vh, ${60 * vh}px)`;
//   // };

//   if (loading) {
//     return (
//       <section
//         className="relative w-full overflow-hidden bg-gray-100 flex items-center justify-center mt-4 rounded-lg shadow-lg"
//           style={{ height:  isMobile ? '150px' : '400px' }}
//       >
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">Loading banners...</p>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section
//         className="relative w-full overflow-hidden bg-gray-100 flex items-center justify-center mt-4 rounded-lg shadow-lg"
//         // style={{ height: getContainerHeight(), minHeight: isMobile ? '250px' : '400px' }}
//       >
//         <div className="text-center px-4">
//           <div className="text-red-500 text-3xl sm:text-4xl mb-3 sm:mb-4">⚠️</div>
//           <p className="text-red-600 mb-3 sm:mb-4 text-sm sm:text-base">Failed to load banners</p>
//           <button
//             onClick={fetchBanners}
//             className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
//           >
//             Retry
//           </button>
//         </div>
//       </section>
//     );
//   }

//   if (banners.length === 0) {
//     return (
//       <section
//         className="relative w-full overflow-hidden bg-gray-100 flex items-center justify-center mt-4 rounded-lg shadow-lg"
//           style={{ height:  isMobile ? '150px' : '400px' }}
//       >
//         <div className="text-center">
//           <p className="text-gray-500 text-sm sm:text-base">No banners available</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-full overflow-hidden bg-gray-50 mt-4 mb-6 sm:mb-8 rounded-lg "
//       style={{ height:  isMobile ? '150px' : '400px' }}
//       aria-label="Banner carousel"
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       {/* Main Carousel Container */}
//       <div className="relative w-full ">
//         {banners.map((banner, index) => (
//           <div
//             key={banner.id}
//             className={`absolute inset-0 transition-all duration-500 ease-in-out ${
//               index === currentSlide
//                 ? "opacity-100 z-10 visible"
//                 : "opacity-0 z-0 invisible"
//             }`}
//           >
//             {/* Mobile-optimized Image Container */}
//             {/* <div className="w-full h-full flex items-center justify-center p-1 sm:p-2 md:p-1">
//               <div className="flex justify-center items-center w-full h-full max-w-full max-h-full relative">
//                 <img
//                   src={banner.image}
//                   alt={banner.image_name || `Banner ${index + 1}`}
//                   className={`
//                     transition-all duration-300
//                     opacity-100 scale-100
//                     max-w-full max-h-full
//                     object-contain
//                     hover:scale-105 transition-transform duration-500
//                     filter-none
//                     mx-auto my-auto
//                     select-none
//                   `}
//                   style={{
//                     width: 'auto',
//                     height: 'auto',
//                     maxWidth: '100%',
//                     maxHeight: '100%',
//                     display: 'block',
//                     transform: 'translateZ(0)',
//                     userSelect: 'none',
//                     WebkitUserSelect: 'none',
//                     MozUserSelect: 'none',
//                   }}
//                   // Priority loading for first 2 images
//                   loading={index <= 1 ? "eager" : "lazy"}
//                   // High priority for first image
//                   fetchPriority={index === 0 ? "high" : "auto"}
//                   decoding="async"
//                   draggable={false}
//                 />

//                 {index === currentSlide && (
//                   <button
//                     onClick={() => navigateToDomain(banner.domain)}
//                     className={`
//                       absolute bottom-4 right-4 z-20
//                       bg-gradient-to-r from-blue-600 to-purple-600
//                       hover:from-blue-700 hover:to-purple-700
//                       text-white font-semibold
//                       rounded-lg
//                       shadow-lg
//                       transition-all duration-300
//                       transform hover:scale-105
//                       backdrop-blur-sm
//                       border border-white/20
//                       ${isMobile ?
//                         'px-3 py-2 text-sm' :
//                         'px-4 py-2 sm:px-5 sm:py-3 text-base'
//                       }
//                     `}
//                     aria-label={`Explore ${banner.domain_name || 'this domain'}`}
//                   >
//                     Explore
//                     <span className="ml-2">→</span>
//                   </button>
//                 )}
//               </div>
//             </div> */}
//             <div className="w-full  flex items-center justify-center p-1 sm:p-2 md:p-1">
//   <div className="flex justify-center items-center w-full  max-w-full  relative">
//     <img
//       src={banner.image}
//       alt={banner.image_name || `Banner ${index + 1}`}
//       className={`
//         transition-all duration-300
//         opacity-100 scale-100
//         max-w-full
//         object-contain
//         hover:scale-105 transition-transform duration-500
//         filter-none
//         mx-auto my-auto
//         select-none
//         ${isMobile ? 'max-h-[60vh]' : 'max-h-[80vh]'}
//       `}
//       style={{
//         width: 'auto',
//         height: 'auto',
//         maxWidth: '100%',
//         maxHeight: isMobile ? '100vh' : '80vh',
//         display: 'block',
//         transform: 'translateZ(0)',
//         userSelect: 'none',
//         WebkitUserSelect: 'none',
//         MozUserSelect: 'none',
//       }}
//       // Priority loading for first 2 images
//       loading={index <= 1 ? "eager" : "lazy"}
//       // High priority for first image
//       fetchPriority={index === 0 ? "high" : "auto"}
//       decoding="async"
//       draggable={false}
//     />

//     {/* Explore Button - Only visible on current slide */}
//     {/* {index === currentSlide && (
//       <button
//         onClick={() => navigateToDomain(banner.domain)}
//         className={`
//           absolute z-20
//           bg-gradient-to-r from-blue-600 to-purple-600
//           hover:from-blue-700 hover:to-purple-700
//           text-white font-semibold
//           rounded-lg
//           shadow-lg
//           transition-all duration-300
//           transform hover:scale-105
//           backdrop-blur-sm
//           border border-white/20
//           ${isMobile ?
//             'bottom-3 right-3 px-3 py-1.5 text-xs' :
//             'bottom-4 right-4 px-4 py-2 text-sm sm:px-5 sm:py-3 sm:text-base'
//           }
//         `}
//         aria-label={`Explore ${banner.domain_name || 'this domain'}`}
//       >
//         Explore
//         <span className="ml-1 sm:ml-2">→</span>
//       </button>
//     )} */}
//     {index === currentSlide && (
//   <button
//     onClick={() => navigateToDomain(banner.domain)}
//     className={`
//       absolute z-20
//       bg-gradient-to-r from-blue-600 to-purple-600
//       hover:from-blue-700 hover:to-purple-700
//       text-white font-semibold
//       rounded-lg
//       shadow-lg
//       transition-all duration-300
//       transform hover:scale-105 -translate-x-1/2 -translate-y-1/2
//       backdrop-blur-sm
//       border border-white/20
//       top-1/2 left-1/2
//       ${isMobile ?
//         'px-3 py-1.5 text-xs' :
//         'px-4 py-2 text-sm sm:px-5 sm:py-3 sm:text-base'
//       }
//     `}
//     aria-label={`Explore ${banner.domain_name || 'this domain'}`}
//   >
//     Explore
//     <span className="ml-1 sm:ml-2">→</span>
//   </button>
// )}

//   </div>
// </div>
//           </div>
//         ))}
//       </div>

//       {/* Carousel Controls */}
//       {banners.length > 1 && (
//         <>
//           <button
//             onClick={prevSlide}
//             className={`absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full z-30 transition-all duration-200 backdrop-blur-sm ${
//               isMobile ? 'p-2' : 'p-2 sm:p-3'
//             }`}
//             aria-label="Previous slide"
//           >
//             <svg
//               className={`${isMobile ? 'h-4 w-4' : 'h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6'}`}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//           <button
//             onClick={nextSlide}
//             className={`absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full z-30 transition-all duration-200 backdrop-blur-sm ${
//               isMobile ? 'p-2' : 'p-2 sm:p-3'
//             }`}
//             aria-label="Next slide"
//           >
//             <svg
//               className={`${isMobile ? 'h-4 w-4' : 'h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6'}`}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </>
//       )}

//       {/* Indicators */}
//       {banners.length > 1 && (
//         <div className={`absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2 z-30 ${
//           isMobile ? 'bottom-1' : ''
//         }`}>
//           {banners.map((banner, index) => (
//             <button
//               key={banner.id}
//               onClick={() => goToSlide(index)}
//               className={`rounded-full transition-all duration-300 backdrop-blur-sm ${
//                 index === currentSlide
//                   ? "bg-white scale-125 shadow-lg"
//                   : "bg-white/40 hover:bg-white/60"
//               } ${
//                 isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}

//       {/* Slide Counter */}
//       {/* {banners.length > 1 && (
//         <div className={`absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-black/40 text-white rounded z-30 backdrop-blur-sm ${
//           isMobile ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-xs sm:text-sm'
//         }`}>
//           <span className="font-mono">
//             {currentSlide + 1} / {banners.length}
//           </span>
//         </div>
//       )} */}

//       {/* Swipe Hint for Mobile */}
//       {/* {isMobile && banners.length > 1 && (
//         <div className="absolute top-2 left-2 bg-black/40 text-white px-2 py-1 rounded text-xs z-30 backdrop-blur-sm">
//           <span>Swipe →</span>
//         </div>
//       )} */}
//     </section>
//   );
// };

// export default BannerCarousel;

// "use client";

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useRouter } from "next/navigation";

// interface Banner {
//   id: number;
//   domain: number;
//   domain_name: string;
//   image: string;
//   image_name: string;
//   created_at: string;
//   updated_at: string;
// }

// const BannerCarousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [banners, setBanners] = useState<Banner[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);
//   const router = useRouter();

//   // API endpoint
//   const API_URL = "https://skillacross.com/api/api/banners/";

//   // Check if mobile device
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);

//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Preload images function
//   const preloadImages = useCallback((imageUrls: string[]) => {
//     imageUrls.forEach((url) => {
//       const img = new Image();
//       img.src = url;
//       // No need to wait for load, browser will cache them
//     });
//   }, []);

//   // Fetch banners from API - Optimized for speed
//   const fetchBanners = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Use AbortController for timeout
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

//       const response = await fetch(API_URL, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         signal: controller.signal,
//       });

//       clearTimeout(timeoutId);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data: Banner[] = await response.json();

//       setBanners(data);

//       // Preload images in background without waiting
//       if (data.length > 0) {
//         const imageUrls = data.map((banner) => banner.image);
//         preloadImages(imageUrls);
//       }
//     } catch (err) {
//       console.error("Error fetching banners:", err);
//       setError(err instanceof Error ? err.message : "Failed to fetch banners");
//     } finally {
//       setLoading(false);
//     }
//   }, [preloadImages]);

//   useEffect(() => {
//     fetchBanners();
//   }, [fetchBanners]);

//   const nextSlide = useCallback(() => {
//     if (banners.length <= 1) return;
//     setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
//   }, [banners.length]);

//   const prevSlide = useCallback(() => {
//     if (banners.length <= 1) return;
//     setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
//   }, [banners.length]);

//   // Auto-slide
//   useEffect(() => {
//     if (banners.length <= 1) return;

//     const interval = setInterval(nextSlide, 5000);
//     return () => clearInterval(interval);
//   }, [nextSlide, banners.length]);

//   const goToSlide = useCallback(
//     (index: number) => {
//       if (banners.length === 0 || index === currentSlide) return;
//       setCurrentSlide(index);
//     },
//     [banners.length, currentSlide]
//   );

//   // Navigation function to domain page
//   const navigateToDomain = useCallback(
//     (domainId: number) => {
//       router.push(`/domain/${domainId}`);
//     },
//     [router]
//   );

//   // Touch swipe functionality
//   const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 50) {
//       nextSlide();
//     }

//     if (touchStart - touchEnd < -50) {
//       prevSlide();
//     }
//   };

//   if (loading) {
//     return (
//       <section
//         className="relative w-full overflow-hidden bg-gray-100 flex items-center justify-center mt-4 rounded-lg shadow-lg"
//         style={{ height: isMobile ? "150px" : "400px" }}
//       >
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">
//             Loading banners...
//           </p>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section
//         className="relative w-full overflow-hidden bg-gray-100 flex items-center justify-center mt-4 rounded-lg shadow-lg"
//         // style={{ height: getContainerHeight(), minHeight: isMobile ? '250px' : '400px' }}
//       >
//         <div className="text-center px-4">
//           <div className="text-red-500 text-3xl sm:text-4xl mb-3 sm:mb-4">
//             ⚠️
//           </div>
//           <p className="text-red-600 mb-3 sm:mb-4 text-sm sm:text-base">
//             Failed to load banners
//           </p>
//           <button
//             onClick={fetchBanners}
//             className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
//           >
//             Retry
//           </button>
//         </div>
//       </section>
//     );
//   }

//   if (banners.length === 0) {
//     return (
//       <section
//         className="relative w-full overflow-hidden bg-gray-100 flex items-center justify-center mt-4 rounded-lg shadow-lg"
//         style={{ height: isMobile ? "150px" : "400px" }}
//       >
//         <div className="text-center">
//           <p className="text-gray-500 text-sm sm:text-base">
//             No banners available
//           </p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-full overflow-hidden bg-gray-50 mt-4 mb-6 sm:mb-8 rounded-lg "
//       style={{ height: isMobile ? "150px" : "400px" }}
//       aria-label="Banner carousel"
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       {/* Main Carousel Container */}
//       <div className="relative w-full ">
//         {banners.map((banner, index) => (
//           <div
//             key={banner.id}
//             className={`absolute inset-0 transition-all duration-500 ease-in-out ${
//               index === currentSlide
//                 ? "opacity-100 z-10 visible"
//                 : "opacity-0 z-0 invisible"
//             }`}
//           >
//             <div className="w-full  flex items-center justify-center p-1 sm:p-2 md:p-1">
//               <div className="flex justify-center items-center w-full  max-w-full  relative">
//                 <img
//                   src={banner.image}
//                   alt={banner.image_name || `Banner ${index + 1}`}
//                   className={`
//         transition-all duration-300
//         opacity-100 scale-100
//         max-w-full
//         object-contain
//         hover:scale-105 transition-transform duration-500
//         filter-none
//         mx-auto my-auto
//         select-none
//         ${isMobile ? "max-h-[60vh]" : "max-h-[80vh]"}
//       `}
//                   style={{
//                     width: "auto",
//                     height: "auto",
//                     maxWidth: "100%",
//                     maxHeight: isMobile ? "100vh" : "80vh",
//                     display: "block",
//                     transform: "translateZ(0)",
//                     userSelect: "none",
//                     WebkitUserSelect: "none",
//                     MozUserSelect: "none",
//                   }}
//                   // Priority loading for first 2 images
//                   loading={index <= 1 ? "eager" : "lazy"}
//                   // High priority for first image
//                   fetchPriority={index === 0 ? "high" : "auto"}
//                   decoding="async"
//                   draggable={false}
//                 />

//                 {index === currentSlide && (
//                   <button
//                     onClick={() => navigateToDomain(banner.domain)}
//                     className={`
//       absolute z-20
//       bg-gradient-to-r from-blue-600 to-purple-600
//       hover:from-blue-700 hover:to-purple-700
//       text-white font-semibold
//       rounded-lg
//       shadow-lg
//       transition-all duration-300
//       transform hover:scale-105 -translate-x-1/2 -translate-y-1/2
//       backdrop-blur-sm
//       border border-white/20
//       top-1/2 left-1/2
//       ${
//         isMobile
//           ? "px-3 py-1.5 text-xs"
//           : "px-4 py-2 text-sm sm:px-5 sm:py-3 sm:text-base"
//       }
//     `}
//                     aria-label={`Explore ${
//                       banner.domain_name || "this domain"
//                     }`}
//                   >
//                     Explore
//                     <span className="ml-1 sm:ml-2">→</span>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Carousel Controls */}
//       {banners.length > 1 && (
//         <>
//           <button
//             onClick={prevSlide}
//             className={`absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full z-30 transition-all duration-200 backdrop-blur-sm ${
//               isMobile ? "p-2" : "p-2 sm:p-3"
//             }`}
//             aria-label="Previous slide"
//           >
//             <svg
//               className={`${
//                 isMobile ? "h-4 w-4" : "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
//               }`}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           </button>
//           <button
//             onClick={nextSlide}
//             className={`absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full z-30 transition-all duration-200 backdrop-blur-sm ${
//               isMobile ? "p-2" : "p-2 sm:p-3"
//             }`}
//             aria-label="Next slide"
//           >
//             <svg
//               className={`${
//                 isMobile ? "h-4 w-4" : "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
//               }`}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </>
//       )}

//       {/* Indicators */}
//       {banners.length > 1 && (
//         <div
//           className={`absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2 z-30 ${
//             isMobile ? "bottom-1" : ""
//           }`}
//         >
//           {banners.map((banner, index) => (
//             <button
//               key={banner.id}
//               onClick={() => goToSlide(index)}
//               className={`rounded-full transition-all duration-300 backdrop-blur-sm ${
//                 index === currentSlide
//                   ? "bg-white scale-125 shadow-lg"
//                   : "bg-white/40 hover:bg-white/60"
//               } ${
//                 isMobile
//                   ? "w-1.5 h-1.5"
//                   : "w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default BannerCarousel;

// "use client";

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useRouter } from "next/navigation";

// interface Banner {
//   id: number;
//   domain: number;
//   domain_name: string;
//   image: string;
//   image_name: string;
//   banner_type: string; // Add this field
//   offer_id: string | null; // Add this field
//   created_at: string;
//   updated_at: string;
// }

// const BannerCarousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [banners, setBanners] = useState<Banner[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);
//   const router = useRouter();

//   // API endpoint
//   const API_URL = "https://skillacross.com/api/api/banners/";

//   // Check if mobile device
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);

//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Preload images function
//   const preloadImages = useCallback((imageUrls: string[]) => {
//     imageUrls.forEach((url) => {
//       const img = new Image();
//       img.src = url;
//     });
//   }, []);

//   // Fetch banners from API
//   const fetchBanners = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 5000);

//       const response = await fetch(API_URL, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         signal: controller.signal,
//       });

//       clearTimeout(timeoutId);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data: Banner[] = await response.json();

//       setBanners(data);

//       if (data.length > 0) {
//         const imageUrls = data.map((banner) => banner.image);
//         preloadImages(imageUrls);
//       }
//     } catch (err) {
//       console.error("Error fetching banners:", err);
//       setError(err instanceof Error ? err.message : "Failed to fetch banners");
//     } finally {
//       setLoading(false);
//     }
//   }, [preloadImages]);

//   useEffect(() => {
//     fetchBanners();
//   }, [fetchBanners]);

//   const nextSlide = useCallback(() => {
//     if (banners.length <= 1) return;
//     setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
//   }, [banners.length]);

//   const prevSlide = useCallback(() => {
//     if (banners.length <= 1) return;
//     setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
//   }, [banners.length]);

//   // Auto-slide
//   useEffect(() => {
//     if (banners.length <= 1) return;

//     const interval = setInterval(nextSlide, 5000);
//     return () => clearInterval(interval);
//   }, [nextSlide, banners.length]);

//   const goToSlide = useCallback(
//     (index: number) => {
//       if (banners.length === 0 || index === currentSlide) return;
//       setCurrentSlide(index);
//     },
//     [banners.length, currentSlide]
//   );

//   // Updated navigation function to handle both banner types
//   const handleBannerClick = useCallback(
//     (banner: Banner) => {
//       if (banner.banner_type === "offer_banner" && banner.offer_id) {
//         // For offer banners, use the offer_link
//         // window.open(banner.offer_link, "_blank"); // Opens in new tab
//         router.push(`/offerdetails/${banner.offer_id}`);
//         // OR use router if you want to navigate within the same tab:
//         // router.push(banner.offer_link);
//       } else {
//         // For regular banners, navigate to domain page
//         router.push(`/domain/${banner.domain}`);
//       }
//     },
//     [router]
//   );

//   // Touch swipe functionality
//   const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 50) {
//       nextSlide();
//     }

//     if (touchStart - touchEnd < -50) {
//       prevSlide();
//     }
//   };

//   if (loading) {
//     return (
//       <section
//         className="relative w-full overflow-hidden bg-gray-100 flex items-center justify-center mt-4 rounded-lg shadow-lg"
//         style={{ height: isMobile ? "150px" : "400px" }}
//       >
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">
//             Loading banners...
//           </p>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section
//         className="relative w-full overflow-hidden bg-gray-100 flex items-center justify-center mt-4 rounded-lg shadow-lg"
//         style={{ height: isMobile ? "150px" : "400px" }}
//       >
//         <div className="text-center px-4">
//           <div className="text-red-500 text-3xl sm:text-4xl mb-3 sm:mb-4">
//             ⚠️
//           </div>
//           <p className="text-red-600 mb-3 sm:mb-4 text-sm sm:text-base">
//             Failed to load banners
//           </p>
//           <button
//             onClick={fetchBanners}
//             className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
//           >
//             Retry
//           </button>
//         </div>
//       </section>
//     );
//   }

//   if (banners.length === 0) {
//     return (
//       <section
//         className="relative w-full overflow-hidden bg-gray-100 flex items-center justify-center mt-4 rounded-lg shadow-lg"
//         style={{ height: isMobile ? "150px" : "400px" }}
//       >
//         <div className="text-center">
//           <p className="text-gray-500 text-sm sm:text-base">
//             No banners available
//           </p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-full overflow-hidden bg-gray-50 mt-4 mb-6 sm:mb-8 rounded-lg"
//       style={{ height: isMobile ? "150px" : "400px" }}
//       aria-label="Banner carousel"
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       {/* Main Carousel Container */}
//       <div className="relative w-full">
//         {banners.map((banner, index) => (
//           <div
//             key={banner.id}
//             className={`absolute inset-0 transition-all duration-500 ease-in-out ${
//               index === currentSlide
//                 ? "opacity-100 z-10 visible"
//                 : "opacity-0 z-0 invisible"
//             }`}
//           >
//             <div className="w-full flex items-center justify-center p-1 sm:p-2 md:p-1">
//               <div className="flex justify-center items-center w-full max-w-full relative">
//                 <img
//                   src={banner.image}
//                   alt={banner.image_name || `Banner ${index + 1}`}
//                   className={`
//                     transition-all duration-300
//                     opacity-100 scale-100
//                     max-w-full
//                     object-contain
//                     hover:scale-105 transition-transform duration-500
//                     filter-none
//                     mx-auto my-auto
//                     select-none
//                     ${isMobile ? "max-h-[60vh]" : "max-h-[80vh]"}
//                   `}
//                   style={{
//                     width: "auto",
//                     height: "auto",
//                     maxWidth: "100%",
//                     maxHeight: isMobile ? "100vh" : "80vh",
//                     display: "block",
//                     transform: "translateZ(0)",
//                     userSelect: "none",
//                     WebkitUserSelect: "none",
//                     MozUserSelect: "none",
//                   }}
//                   loading={index <= 1 ? "eager" : "lazy"}
//                   fetchPriority={index === 0 ? "high" : "auto"}
//                   decoding="async"
//                   draggable={false}
//                 />

//                 {index === currentSlide && (
//                   <button
//                     onClick={() => handleBannerClick(banner)}
//                     className={`
//                       absolute z-20
//                       bg-gradient-to-r from-blue-600 to-purple-600
//                       hover:from-blue-700 hover:to-purple-700
//                       text-white font-semibold
//                       rounded-lg
//                       shadow-lg
//                       transition-all duration-300
//                       transform hover:scale-105 -translate-x-1/2 -translate-y-1/2
//                       backdrop-blur-sm
//                       border border-white/20
//                       top-1/2 left-1/2
//                       ${
//                         isMobile
//                           ? "px-3 py-1.5 text-xs"
//                           : "px-4 py-2 text-sm sm:px-5 sm:py-3 sm:text-base"
//                       }
//                     `}
//                     aria-label={
//                       banner.banner_type === "offer_banner"
//                         ? "View offer"
//                         : `Explore ${banner.domain_name || "this domain"}`
//                     }
//                   >
//                     {banner.banner_type === "offer_banner"
//                       ? "View Offer"
//                       : "Explore"}
//                     <span className="ml-1 sm:ml-2">→</span>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Carousel Controls */}
//       {banners.length > 1 && (
//         <>
//           <button
//             onClick={prevSlide}
//             className={`absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full z-30 transition-all duration-200 backdrop-blur-sm ${
//               isMobile ? "p-2" : "p-2 sm:p-3"
//             }`}
//             aria-label="Previous slide"
//           >
//             <svg
//               className={`${
//                 isMobile ? "h-4 w-4" : "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
//               }`}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           </button>
//           <button
//             onClick={nextSlide}
//             className={`absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full z-30 transition-all duration-200 backdrop-blur-sm ${
//               isMobile ? "p-2" : "p-2 sm:p-3"
//             }`}
//             aria-label="Next slide"
//           >
//             <svg
//               className={`${
//                 isMobile ? "h-4 w-4" : "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
//               }`}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </>
//       )}

//       {/* Indicators */}
//       {banners.length > 1 && (
//         <div
//           className={`absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2 z-30 ${
//             isMobile ? "bottom-1" : ""
//           }`}
//         >
//           {banners.map((banner, index) => (
//             <button
//               key={banner.id}
//               onClick={() => goToSlide(index)}
//               className={`rounded-full transition-all duration-300 backdrop-blur-sm ${
//                 index === currentSlide
//                   ? "bg-white scale-125 shadow-lg"
//                   : "bg-white/40 hover:bg-white/60"
//               } ${
//                 isMobile
//                   ? "w-1.5 h-1.5"
//                   : "w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default BannerCarousel;

"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

interface Banner {
  id: number;
  domain: number;
  domain_name: string;
  image: string;
  image_name: string;
  banner_type: string;
  offer_id: string | null;
  created_at: string;
  updated_at: string;
}

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const router = useRouter();
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // API endpoint
  const API_URL = "https://skillacross.com/api/api/banners/";

  // Check if mobile device - optimized
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Use debounce to avoid frequent updates
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 100);
    };

    checkMobile();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Fetch banners from API - optimized for speed
  const fetchBanners = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Create abort controller with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // Reduced timeout

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        priority: "high", // Add fetch priority
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Banner[] = await response.json();

      // Filter only active banners if needed, or take limited number
      const activeBanners = data.slice(0, 10); // Limit to 10 banners for performance

      setBanners(activeBanners);

      // Preload first 3 images immediately
      if (activeBanners.length > 0) {
        const firstThreeUrls = activeBanners
          .slice(0, 3)
          .map((banner) => banner.image);
        preloadImages(firstThreeUrls);
      }
    } catch (err) {
      console.error("Error fetching banners:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  }, []);

  // Simple preload function
  const preloadImages = useCallback((urls: string[]) => {
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  // Navigation functions
  const nextSlide = useCallback(() => {
    if (banners.length <= 1) return;
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    if (banners.length <= 1) return;
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  }, [banners.length]);

  // Optimized auto-slide with cleanup
  useEffect(() => {
    if (banners.length <= 1) return;

    // Clear existing interval
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }

    autoSlideRef.current = setInterval(nextSlide, 5000);

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [nextSlide, banners.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (banners.length === 0 || index === currentSlide) return;
      setCurrentSlide(index);
    },
    [banners.length, currentSlide]
  );

  // Handle banner click - redirect directly
  const handleBannerClick = useCallback(
    (banner: Banner) => {
      if (banner.banner_type === "offer_banner" && banner.offer_id) {
        router.push(`/offerdetails/${banner.offer_id}`);
      } else {
        router.push(`/domain/${banner.domain}`);
      }
    },
    [router]
  );

  // Touch swipe functionality
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  // Lazy load images for non-visible slides
  const preloadNextImages = useCallback(
    (currentIndex: number) => {
      const nextIndex = (currentIndex + 1) % banners.length;
      const prevIndex =
        currentIndex === 0 ? banners.length - 1 : currentIndex - 1;

      const urlsToPreload = [];
      if (banners[nextIndex]) urlsToPreload.push(banners[nextIndex].image);
      if (banners[prevIndex]) urlsToPreload.push(banners[prevIndex].image);

      if (urlsToPreload.length > 0) {
        preloadImages(urlsToPreload);
      }
    },
    [banners, preloadImages]
  );

  // Preload adjacent images when slide changes
  useEffect(() => {
    if (banners.length > 1) {
      preloadNextImages(currentSlide);
    }
  }, [currentSlide, banners.length, preloadNextImages]);

  if (loading) {
    return (
      <section
        className="relative w-full overflow-hidden bg-gray-100 flex items-center justify-center mt-4 rounded-lg shadow-lg"
        style={{ height: isMobile ? "150px" : "400px" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">
            Loading banners...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="relative w-full overflow-hidden bg-gray-100 flex items-center justify-center mt-4 rounded-lg shadow-lg"
        style={{ height: isMobile ? "150px" : "400px" }}
      >
        <div className="text-center px-4">
          <div className="text-red-500 text-3xl sm:text-4xl mb-3 sm:mb-4">
            ⚠️
          </div>
          <p className="text-red-600 mb-3 sm:mb-4 text-sm sm:text-base">
            Failed to load banners
          </p>
          <button
            onClick={fetchBanners}
            className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (banners.length === 0) {
    return (
      <section
        className="relative w-full overflow-hidden bg-gray-100 flex items-center justify-center mt-4 rounded-lg shadow-lg"
        style={{ height: isMobile ? "150px" : "400px" }}
      >
        <div className="text-center">
          <p className="text-gray-500 text-sm sm:text-base">
            No banners available
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-50 mt-4 mb-6 sm:mb-8 rounded-lg cursor-pointer"
      style={{ height: isMobile ? "150px" : "400px" }}
      aria-label="Banner carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Carousel Container */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10 " : "opacity-0 z-0 "
            }`}
          >
            <div
              className="w-full h-full flex items-center justify-center p-1 sm:p-2 md:p-1"
              onClick={() => handleBannerClick(banner)}
            >
              <div className="flex justify-center items-center w-full h-full relative">
                <img
                  src={banner.image}
                  alt={banner.image_name || `Banner ${index + 1}`}
                  className={`
    w-full h-full
    object-cotain
    transition-opacity duration-300
    select-none
  `}
                  loading={index <= 2 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className={`absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full z-30 transition-all duration-200 backdrop-blur-sm ${
              isMobile ? "p-2" : "p-2 sm:p-3"
            }`}
            aria-label="Previous slide"
          >
            <svg
              className={`${isMobile ? "h-4 w-4" : "h-4 w-4 sm:h-5 sm:w-5"}`}
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
            className={`absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full z-30 transition-all duration-200 backdrop-blur-sm ${
              isMobile ? "p-2" : "p-2 sm:p-3"
            }`}
            aria-label="Next slide"
          >
            <svg
              className={`${isMobile ? "h-4 w-4" : "h-4 w-4 sm:h-5 sm:w-5"}`}
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

      {/* Indicators */}
      {banners.length > 1 && (
        <div
          className={`absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2 z-30 ${
            isMobile ? "bottom-1" : ""
          }`}
        >
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 backdrop-blur-sm ${
                index === currentSlide
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/40 hover:bg-white/60"
              } ${isMobile ? "w-1.5 h-1.5" : "w-2 h-2 sm:w-2.5 sm:h-2.5"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BannerCarousel;
