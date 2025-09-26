"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

interface BlogPost {
  id: number;
  name: string;
  author_name: string;
  image: string;
  hint: string;
  description: string;
  created_at: string; // Added created_at field
  category: {
    id: number;
    name: string;
    count: number;
  };
}

interface Category {
  id: number;
  name: string;
  count: number;
}

export default function ViewAllBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showRecent, setShowRecent] = useState(false); // New state for recent filter
  const [loading, setLoading] = useState(true);

  // Fetch all blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://skillacross.com/api/api/blogs/", {
          next: { revalidate: 3600 },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Sort posts by creation date (newest first)
        const sortedData = data.sort(
          (a: BlogPost, b: BlogPost) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setPosts(sortedData);
        setFilteredPosts(sortedData);

        // Extract unique categories
        const uniqueCategories: Category[] = [];
        sortedData.forEach((post: BlogPost) => {
          const exists = uniqueCategories.find(
            (cat) => cat.id === post.category.id
          );
          if (!exists) {
            uniqueCategories.push(post.category);
          }
        });
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Fetch posts by category
  const fetchPostsByCategory = async (categoryId: number | null) => {
    try {
      setLoading(true);
      setSelectedCategory(categoryId);
      setShowRecent(false); // Reset recent filter when selecting category

      if (categoryId === null) {
        setFilteredPosts(posts);
        return;
      }

      const response = await fetch(
        `https://skillacross.com/api/api/blogs/category/${categoryId}/`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Sort category posts by creation date
      const sortedData = data.sort(
        (a: BlogPost, b: BlogPost) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setFilteredPosts(sortedData);
    } catch (error) {
      console.error("Error fetching category posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show recent posts (last 30 days)
  const showRecentPosts = () => {
    setShowRecent(true);
    setSelectedCategory(null);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentPosts = posts.filter(
      (post) => new Date(post.created_at) >= thirtyDaysAgo
    );

    setFilteredPosts(recentPosts);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Hero Section with Violet-Rose Gradient */}
      <section className="bg-gradient-to-r from-violet-600 via-purple-500 to-rose-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Blog</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Discover the latest insights, trends, and stories from our team
          </p>
        </div>
      </section>

      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setShowRecent(false);
                setFilteredPosts(posts);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === null && !showRecent
                  ? "bg-violet-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Posts ({posts.length})
            </button>

            <button
              onClick={showRecentPosts}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                showRecent
                  ? "bg-violet-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Recent Posts
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => fetchPostsByCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category.id
                    ? "bg-violet-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {loading ? (
            // Loading state
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
            </div>
          ) : filteredPosts.length > 0 ? (
            // Blog Posts Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/blogdetails/${post.id}`} className="block">
                    {/* Blog Image */}
                    <div className="relative h-56 w-full">
                      <Image
                        src={post.image || "/placeholder-image.jpg"}
                        alt={post.name}
                        fill
                        className="object-cover"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-block bg-violet-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {post.category.name}
                        </span>
                      </div>
                      {/* Date Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="inline-block bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-violet-600 transition-colors">
                        {post.name}
                      </h2>

                      {/* Author */}
                      <p className="text-sm text-gray-600 mb-4">
                        By{" "}
                        <span className="font-medium">{post.author_name}</span>
                      </p>

                      {/* Excerpt */}
                      <p className="text-gray-700 mb-6 line-clamp-3">
                        {post.hint}
                      </p>

                      {/* Read More Link */}
                      <div className="flex items-center text-violet-600 font-medium">
                        Read more
                        <svg
                          className="w-4 h-4 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            // Empty state if no posts are found
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No blog posts found
              </h3>
              <p className="text-gray-600">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
