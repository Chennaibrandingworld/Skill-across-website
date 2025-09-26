import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

interface BlogPost {
  id: number;
  name: string;
  created_at: string;
  author_name: string;
  image: string;
  hint: string;
  description: string;
  category: {
    id: number;
    name: string;
    count: number;
  };
  related_blogs?: BlogPost[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(
      `https://skillacross.com/api/api/blogs/${id}/`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch blog post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  // Use the related_blogs from the API response
  const relatedBlogs = post.related_blogs || [];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-red-600"
                >
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <Link
                    href="/blog"
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-red-600 md:ms-2"
                  >
                    Blog
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 line-clamp-1">
                    {post.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Blog Content */}
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            {/* Blog Image */}
            <div className="relative h-72 md:h-96 w-full">
              <Image
                src={post.image}
                alt={post.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* Category Badge on Image */}
              <div className="absolute top-6 left-6">
                <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-2 rounded-full shadow-lg">
                  {post.category.name}
                </span>
              </div>
            </div>

            <div className="p-8 md:p-10">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.name}
              </h1>

              {/* Author and Date */}
              <div className="flex items-center mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-red-600 font-semibold text-lg">
                      {post.author_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {post.author_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Published on{" "}
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="ml-auto flex space-x-4">
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Hint/Excerpt */}
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-10">
                <p className="text-lg text-gray-800 italic font-medium">
                  {post.hint}
                </p>
              </div>

              {/* Description (HTML content) */}
              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.description }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Tags:
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {post.category.name}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    AWS
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Technology
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    AI
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* Related Blogs Section */}
          {relatedBlogs.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                Related Blog Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
                  >
                    <Link href={`/blogdetails/${blog.id}`}>
                      <div className="relative h-48 w-full">
                        <Image
                          src={blog.image}
                          alt={blog.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            {blog.category.name}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {blog.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {blog.hint}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {new Date(blog.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                          <span className="text-sm font-medium text-red-600">
                            Read More →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Navigation */}
          <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4">
            <Link
              href="/viewallblogs"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-5 h-5 me-2"
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
                  d="M13 5H1m0 0l4 4M1 5l4-4"
                />
              </svg>
              Back to All Blogs
            </Link>

            <div className="flex space-x-4">
              <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg
                  className="w-4 h-4 me-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 极速加速器 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 极速加速器.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                </svg>
                Share
              </button>
              <button className="inline-flex items-center justify-center px-4 py-2 border border-gray极速加速器 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg
                  className="w-4 h-4 me-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5极速加速器 1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
                </svg>
                Save
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.name} | Blog`,
    description: post.hint,
    openGraph: {
      title: post.name,
      description: post.hint,
      images: [post.image],
      type: "article",
    },
  };
}
