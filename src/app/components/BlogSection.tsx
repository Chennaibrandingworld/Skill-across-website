import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: number;
  name: string;
  author_name: string;
  image: string;
  hint: string;
  description: string;
  category: {
    id: number;
    name: string;
    count: number;
  };
}

interface BlogSectionProps {
  title?: string;
  viewAllText?: string;
  apiUrl?: string;
}

const BlogSection = ({
  title = "Latest From The Blog",
  viewAllText = "View All Blogs",
  apiUrl = "https://skillacross.com/api/api/blogs/",
}: BlogSectionProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [apiUrl]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16 bg-white rounded-md shadow-md mt-16">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">
          {title}
        </h2>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16 bg-white rounded-md shadow-md mt-16">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">
          {title}
        </h2>
        <div className="text-center py-8 text-red-600">
          <p>Error loading blog posts: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-20 py-16 bg-white rounded-md shadow-md mt-16">
      <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
        {posts.map((post) => (
          <Link
            href={`/blogdetails/${post.id}`}
            key={post.id}
            className="block"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow cursor-pointer h-full">
              {/* Blog Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-bold text-red-600 uppercase mb-2">
                  {post.category.name}
                </span>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {post.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                  {post.hint}
                </p>
                <div className="mt-auto pt-4">
                  <span className="text-red-600 hover:text-red-800 text-sm font-medium inline-flex items-center">
                    Read more
                    <svg
                      className="w-3 h-3 ms-2 rtl:rotate-180"
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
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center">
        <Link
          href="/viewallblogs" // This will now navigate to your blog page
          className="inline-block bg-red-600 text-white font-semibold px-8 py-3 rounded-md shadow hover:bg-red-700 transition"
        >
          {viewAllText}
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;
