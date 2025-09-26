// pages/success-stories.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";

// Define TypeScript interfaces for our data
interface SuccessStory {
  id: number;
  video_name: string;
  video_link: string;
  created_at: string;
  video_id?: string | null;
}

export default function SuccessStories() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Explicitly type as array of refs
  const videoRefs = useRef<Array<HTMLIFrameElement | null>>([]);

  // Function to extract YouTube ID from various URL formats
  const getYouTubeId = (url: string | null): string | null => {
    if (!url) return null;

    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const fetchStories = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://skillacross.com/api/api/success-stories/"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch success stories");
      }
      const data: SuccessStory[] = await response.json();

      // Process the data to extract YouTube IDs
      const processedData = data.map((story) => ({
        ...story,
        video_id: getYouTubeId(story.video_link),
      }));

      setStories(processedData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const handleMouseEnter = (index: number): void => {
    const iframe = videoRefs.current[index];
    if (iframe && stories[index]?.video_id) {
      try {
        iframe.contentWindow?.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
      } catch (e) {
        console.log("Error playing video:", e);
      }
    }
  };

  const handleMouseLeave = (index: number): void => {
    const iframe = videoRefs.current[index];
    if (iframe && stories[index]?.video_id) {
      try {
        iframe.contentWindow?.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      } catch (e) {
        console.log("Error pausing video:", e);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Success Stories - SkillAcross</title>
        <meta name="description" content="Success stories from our learners" />
      </Head>

      <section className="max-w-7xl mx-auto px-6 md:px-20 py-16 bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-md shadow-lg text-white mt-16">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Our Success Stories
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow overflow-hidden flex flex-col animate-pulse"
              >
                <div className="relative" style={{ paddingTop: "56.25%" }}>
                  <div className="absolute inset-0 w-full h-full bg-gray-300"></div>
                </div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-white mb-10">
            <p className="text-xl">Error loading stories: {error}</p>
          </div>
        ) : null}

        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {stories.map((story, index) => (
              <div
                key={story.id}
                className="bg-white rounded-lg shadow overflow-hidden flex flex-col transform transition duration-300 hover:scale-105"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div
                  className="relative group"
                  style={{ paddingTop: "56.25%" }}
                >
                  {story.video_id ? (
                    <iframe
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      src={`https://www.youtube.com/embed/${story.video_id}?enablejsapi=1&rel=0&modestbranding=1`}
                      title={story.video_name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Video not available</span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black bg-opacity-50 rounded-full p-3">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-gray-800 font-semibold text-center">
                  {story.video_name}
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <div className="text-center text-white mb-10">
              <p className="text-xl">
                No success stories available at the moment.
              </p>
            </div>
          )
        )}

        <div className="text-center">
          <a
            href="https://www.youtube.com/@networkrhinos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-red-600 font-semibold px-8 py-3 rounded-md shadow hover:bg-gray-100 transition text-base"
          >
            More Success Stories
          </a>
        </div>
      </section>
    </>
  );
}
