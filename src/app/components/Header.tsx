"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

// Define types for the API response
interface Domain {
  id: number;
  name: string;
}

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch domains from API
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://skillacross.com/api/api/domains/"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const domainsData: Domain[] = await response.json();
        setDomains(domainsData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch domains:", err);
        setError("Failed to load domains. Please try again later.");
        setDomains([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Calculate total header height
  const headerHeight = scrolled ? 80 : 112;

  return (
    <>
      <header
        className={`w-full fixed top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white"
        }`}
      >
        {/* Top Contact Bar - hidden on mobile */}
        <div className="hidden md:flex bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white text-sm px-4 md:px-12 py-3 justify-between items-center">
          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="tel:+919962471249"
              className="flex items-center gap-2 hover:underline"
            >
              Chennai: <FaPhoneAlt className="inline" /> +91-9962471249
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="https://wa.me/+919962471249"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition shadow-md hover:shadow-lg"
            >
              <FaWhatsapp size={20} /> WhatsApp Us
            </a>
          </div>
        </div>

        {/* Navbar wrapper */}
        <div
          className="relative max-w-screen-xl mx-auto px-4 md:px-12"
          ref={wrapperRef}
        >
          <nav className="bg-white py-4 flex justify-between items-center h-20 z-10">
            {/* Logo - Fixed Link */}
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/img/logo2.jpg"
                alt="Skill Across Logo"
                width={250}
                height={150}
                priority
                className="rounded-md"
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-8 font-medium text-gray-700 items-center">
              <li>
                <Link
                  href="/"
                  className="hover:text-red-600 transition font-semibold"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-red-600 transition font-semibold"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/why-us"
                  className="hover:text-red-600 transition font-semibold"
                >
                  Why Us
                </Link>
              </li>
              {/* Courses Toggle */}
              <li className="relative">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={open}
                  className="flex items-center gap-1 hover:text-red-600 transition focus:outline-none select-none font-semibold"
                  onClick={toggleDropdown}
                  disabled={loading}
                >
                  Courses{" "}
                  {!loading && (
                    <FaChevronDown
                      size={14}
                      className={`transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  {loading && (
                    <span
                      className="ml-1 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    ></span>
                  )}
                </button>

                {open && !loading && (
                  <div
                    className="absolute right-0 top-full mt-2 w-[150px] bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-8 grid grid-cols-1 gap-1"
                    style={{ minWidth: "300px", transformOrigin: "top right" }}
                  >
                    {error ? (
                      <div className="col-span-3 text-center py-4 text-red-500">
                        {error}
                      </div>
                    ) : domains.length > 0 ? (
                      <>
                        {domains.map((domain) => (
                          <div key={domain.id} className="min-w-[250px]">
                            <Link href={`/domain/${domain.id}`}>
                              <div className="font-semibold text-gray-900 border-b-2 border-red-600 pb-2 mb-3">
                                {domain.name}
                              </div>
                            </Link>
                          </div>
                        ))}

                        {/* 👉 Static Abroad Study at the end */}
                        {/* <div className="min-w-[250px]">
                          <Link href="/abroadstudy">
                            <div className="font-semibold text-gray-900 border-b-2 border-red-600 pb-2 mb-3">
                              ABROAD STUDY
                            </div>
                          </Link>
                        </div> */}
                      </>
                    ) : (
                      <div className="col-span-3 text-center py-4 text-gray-500">
                        No domains available at the moment.
                      </div>
                    )}
                  </div>
                )}
              </li>

              <li>
                <Link
                  href="/gallery"
                  className="hover:text-red-600 transition font-semibold"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-red-600 transition font-semibold"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-red-600 transition font-semibold"
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </nav>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 shadow-inner absolute left-0 right-0">
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-red-600 font-medium py-2 transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-gray-700 hover:text-red-600 font-medium py-2 transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/why-us"
                    className="text-gray-700 hover:text-red-600 font-medium py-2 transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Why Us
                  </Link>

                  {/* Mobile Courses Dropdown */}
                  <div className="py-2">
                    <button
                      onClick={() => setOpen(!open)}
                      className="flex items-center justify-between w-full text-gray-700 hover:text-red-600 font-medium focus:outline-none"
                      disabled={loading}
                    >
                      <span>Courses</span>
                      {!loading && (
                        <FaChevronDown
                          size={14}
                          className={`transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      )}
                      {loading && (
                        <span
                          className="ml-1 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"
                        ></span>
                      )}
                    </button>
                    {open && !loading && (
                      <div className="mt-2 pl-4 border-l-2 border-red-200">
                        {error ? (
                          <div className="text-red-500 py-2">{error}</div>
                        ) : domains.length > 0 ? (
                          <>
                            {domains.map((domain) => (
                              <div key={domain.id} className="mb-4">
                                <Link href={`/domain/${domain.id}`}>
                                  <div className="font-semibold text-gray-900 text-sm mt-3 mb-2">
                                    {domain.name}
                                  </div>
                                </Link>
                              </div>
                            ))}

                            {/* 👉 Static Abroad Study at the end */}
                            {/* <div className="mb-4">
                              <Link href="/abroad-study">
                                <div className="font-semibold text-gray-900 text-sm mt-3 mb-2">
                                  ABROAD STUDY
                                </div>
                              </Link>
                            </div> */}
                          </>
                        ) : (
                          <div className="text-gray-500 py-2">
                            No domains available at the moment.
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <Link
                    href="/gallery"
                    className="text-gray-700 hover:text-red-600 font-medium py-2 transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Gallery
                  </Link>
                  <Link
                    href="/careers"
                    className="text-gray-700 hover:text-red-600 font-medium py-2 transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Careers
                  </Link>
                  <Link
                    href="/contact-us"
                    className="text-gray-700 hover:text-red-600 font-medium py-2 transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Add spacer to prevent content from being hidden behind fixed header */}
      <div style={{ height: `${headerHeight}px` }}></div>
    </>
  );
};
