"use client";
import React, { useEffect, useState } from "react";

interface Domain {
  id: number;
  name: string;
}

export const Footer = () => {
  const [domains, setDomains] = useState<Domain[]>([]);

  useEffect(() => {
    fetch("https://skillacross.com/api/api/domains/")
      .then((res) => res.json())
      .then((data: Domain[]) => setDomains(data))
      .catch((err) => console.error("Error fetching domains:", err));
  }, []);

  return (
    <footer className="bg-gradient-to-r from-violet-800 via-violet-900 to-indigo-900 text-gray-200 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-bold mb-6 text-white">Get in Touch</h4>
          <p className="mb-2">
            Phone:{" "}
            <a href="tel:+919962471249" className="hover:underline">
              +91 9962471249
            </a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:skillacross@gmail.com" className="hover:underline">
              skillacross@gmail.com
            </a>
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-xl font-bold mb-6 text-white">Company</h4>
          <ul className="space-y-3">
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/all_courses" className="hover:underline">
                Courses
              </a>
            </li>
            <li>
              <a href="/why-us" className="hover:underline">
                Why Us
              </a>
            </li>
            <li>
              <a href="/gallery" className="hover:underline">
                Gallery
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:underline">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Popular Courses → Domains from API */}
        <div>
          <h4 className="text-xl font-bold mb-6 text-white">Popular Courses</h4>
          <ul className="space-y-2 overflow-auto max-h-64 pr-2 scrollbar-thin scrollbar-thumb-violet-600 scrollbar-track-transparent">
            {domains.length > 0 ? (
              domains.map((domain) => (
                <li key={domain.id}>
                  <a href={`/domain/${domain.id}`} className="hover:underline">
                    {domain.name}
                  </a>
                </li>
              ))
            ) : (
              <p className="text-gray-400">Loading domains...</p>
            )}
          </ul>
        </div>

        {/* Branches */}
        <div>
          <h4 className="text-xl font-bold mb-6 text-white">Our Branches</h4>
          <div className="space-y-6 text-sm text-gray-300 max-h-64 overflow-auto pr-2 scrollbar-thin scrollbar-thumb-violet-600 scrollbar-track-transparent">
            <div>
              <strong>Chennai Branch</strong>
              <br />
              3rd Floor, Chandra Towers, No.23, Rajaji Rd, West Tambaram,
              Tambaram, Chennai, Tamil Nadu, 600045.
              <br />
              <a href="tel:+919962471249" className="hover:underline">
                +91 9962471249
              </a>
              <br />
              <a href="tel:+919543125855" className="hover:underline">
                +91 9543125855
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-violet-700 pt-6 text-center text-sm text-violet-400">
        © 2025 Skill Across. All rights reserved.
      </div>
    </footer>
  );
};
