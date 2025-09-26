"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Expert } from "../components/expert";

type GalleryItem = {
  id: number;
  img_name: string;
  image: string;
  category: number;
  category_name: string;
};

export default function Page() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  // For modal view
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // 🔹 Fetch gallery data
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(
          "https://skillacross.com/api/api/list-gallery/"
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setGallery(data);

          // Extract unique category names
          const uniqueCategories = Array.from(
            new Set(data.map((item) => item.category_name))
          );
          setCategories(["All", ...uniqueCategories]);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // 🔹 Filter images by category
  const filteredImages =
    activeTab === "All"
      ? gallery
      : gallery.filter((item) => item.category_name === activeTab);

  return (
    <div className="bg-white">
      <Header />

      {/* Hero Section */}
      {/* <section
        className="w-full min-h-[400px] flex flex-col justify-center items-center px-6 md:px-20 py-24 text-white text-center"
        style={{
          background:
            "linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%)",
        }}
      >
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">Gallery</h1>
        <p className="text-2xl max-w-3xl opacity-90">
          Explore our moments and achievements
        </p>
      </section> */}
      <section
        className="w-full min-h-[200px] flex flex-col justify-center items-center px-6 md:px-20 py-0 text-white text-center"
        style={{
          background: "linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)",
        }}
      >
        <h1 className="text-5xl font-extrabold mb-4 mt-6 drop-shadow-lg">
          Gallery
        </h1>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Category Buttons */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-md font-semibold transition ${
                activeTab === category
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-red-500 hover:text-white"
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <p className="text-center text-gray-600">Loading images...</p>
        ) : filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredImages.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-lg shadow-md group bg-gray-100 cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <Image
                  src={item.image}
                  alt={item.img_name || item.category_name}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <p className="text-white font-semibold text-lg">View Image</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No images found for this category.
          </p>
        )}
      </div>

      {/* Modal for Image Viewer */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full mx-4">
            <Image
              src={selectedImage.image}
              alt={selectedImage.img_name || "Gallery Image"}
              width={1000}
              height={700}
              className="rounded-lg w-full max-h-[80vh] object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}

      <Expert />
      <Footer />
    </div>
  );
}
