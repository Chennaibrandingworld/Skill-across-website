import React, { useState, useEffect } from "react";

interface Course {
  id: number;
  title: string;
  // Add other properties if they exist in the API response
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  title: string;
}

interface ApiErrorResponse {
  errors?: Record<string, string[]>;
  message?: string;
}

export const QuickEnquiry: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    course: "",
    title: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://skillacross.com/api/api/courses/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data: Course[] = await response.json();
        // Filter out courses with null titles and remove duplicates
        const uniqueCourses = data
          .filter((course) => course.title && course.title.trim() !== "")
          .filter(
            (course, index, self) =>
              index === self.findIndex((c) => c.title === course.title)
          );
        setCourses(uniqueCourses);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Prepare the data according to API requirements
      const requestData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        title: formData.course, // Using course as title based on API requirements
        message: `Enquiry about ${formData.course} course from ${formData.name} (${formData.email}, ${formData.phone})`,
      };

      const response = await fetch("https://skillacross.com/api/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const responseData: ApiErrorResponse = await response.json();

      if (!response.ok) {
        // Handle validation errors from API
        if (responseData.errors) {
          const errorMessages = Object.entries(responseData.errors)
            .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
            .join("; ");
          throw new Error(errorMessages);
        }
        throw new Error(
          responseData.message ||
            `Server responded with status ${response.status}`
        );
      }

      console.log("Form submitted successfully:", responseData);

      setSuccess(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        title: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit enquiry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="md:w-1/2 rounded-md shadow-md p-8 bg-gradient-to-br from-red-400 via-red-500 to-red-600 text-white">
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse">
            <p className="text-center">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-md shadow-md p-8 bg-gradient-to-br from-red-400 via-red-500 to-red-600 text-white">
      <h3 className="text-2xl font-bold mb-6">Quick Enquiry</h3>
      <p className="mb-6 opacity-90">
        Fill out the form, and our expert team will connect with you within 15
        minutes.
      </p>

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-500 text-white rounded-md">
          Thank you for your enquiry! We will contact you within 15 minutes.
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-700 text-white rounded-md">
          Error: {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-md border border-transparent bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-300"
          required
          disabled={submitting}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-md border border-transparent bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-300"
          required
          disabled={submitting}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-md border border-transparent bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-300"
          required
          disabled={submitting}
        />
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-md border border-transparent bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-300"
          required
          disabled={submitting}
        >
          <option value="" disabled>
            Select Course
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.title}>
              {course.title}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className={`w-full font-semibold py-3 rounded-md transition ${
            submitting
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-red-600 hover:bg-gray-100"
          }`}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
