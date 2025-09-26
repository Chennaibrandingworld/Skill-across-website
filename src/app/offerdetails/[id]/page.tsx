"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Expert } from "@/app/components/expert";

interface Offer {
  id: number;
  offer_type: string;
  validity: string;
  title: string;
  hint: string;
  description: string;
}

// Enquiry Form Component for Offers
const OfferEnquiryForm: React.FC<{
  offer: Offer;
  onClose: () => void;
  onSuccess: () => void;
}> = ({ offer, onClose, onSuccess }) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      const requestData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        title: offer.title,
        message:
          formData.message ||
          `Enquiry about ${offer.title} offer from ${formData.name} (${formData.email}, ${formData.phone})`,
      };

      const response = await fetch("https://skillacross.com/api/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.errors && typeof responseData.errors === "object") {
          const errorMessages = Object.entries(
            responseData.errors as Record<string, unknown>
          )
            .map(([field, errors]) => {
              if (Array.isArray(errors)) {
                return `${field}: ${errors.join(", ")}`;
              }
              return `${field}: ${String(errors)}`;
            })
            .join("; ");
          throw new Error(errorMessages);
        }
        throw new Error(
          responseData.message ||
            `Server responded with status ${response.status}`
        );
      }

      console.log("Enquiry submitted successfully:", responseData);
      onSuccess();
    } catch (err) {
      console.error("Error submitting enquiry:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit enquiry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Prevent click inside the modal from closing it
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0  bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Close when clicking on backdrop
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative enquiry-modal-content"
        onClick={handleModalClick} // Prevent closing when clicking inside modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Enquire About Offer
        </h3>
        <p className="text-gray-600 mb-6">
          Get more details about this special offer
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-black placeholder-gray-500"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-black placeholder-gray-500"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-black placeholder-gray-500"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Any specific questions about this offer?"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition-colors text-black placeholder-gray-500"
              disabled={submitting}
            />
          </div>

          <button
            type="submit"
            className={`w-full font-semibold py-3 rounded-lg transition-all duration-200 ${
              submitting
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
            }`}
            disabled={submitting}
          >
            {submitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Enquiry"
            )}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          * Required fields
        </p>
      </div>
    </div>
  );
};

export default function OfferDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("No offer ID provided");
      return;
    }

    const fetchOffer = async () => {
      try {
        console.log("Fetching offer with ID:", id);

        const response = await fetch(
          `https://skillacross.com/api/api/offers/${id}/`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data && typeof data === "object" && !Array.isArray(data)) {
          setOffer(data);
        } else {
          setError("Invalid response format from server");
        }
      } catch (error) {
        console.error("Error fetching offer:", error);
        setError(
          `Failed to load offer: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [id]);

  const handleEnquirySuccess = () => {
    setEnquirySubmitted(true);
    setShowEnquiry(false);

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      setEnquirySubmitted(false);
    }, 5000);
  };

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showEnquiry) {
        setShowEnquiry(false);
      }
    };

    if (showEnquiry) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [showEnquiry]);

  if (loading)
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading offer details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center max-w-md">
            <div className="bg-red-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Error Loading Offer
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-gray-500 text-sm">ID: {id}</p>
            <button
              onClick={() => window.history.back()}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );

  if (!offer)
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center max-w-md">
            <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Offer Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              The offer you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <p className="text-gray-500 text-sm mb-4">ID: {id}</p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
            >
              Browse Other Offers
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Success Message */}
      {enquirySubmitted && (
        <div className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg shadow-lg max-w-sm">
          <div className="flex items-start">
            <span className="text-green-500 mr-3 text-xl mt-0.5">✓</span>
            <div>
              <p className="font-medium">Thank you!</p>
              <p className="text-sm mt-1">
                Your enquiry has been submitted successfully.
              </p>
            </div>
            <button
              onClick={() => setEnquirySubmitted(false)}
              className="ml-4 text-green-600 hover:text-green-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        className="w-full min-h-[200px] flex flex-col justify-center items-center px-6 md:px-20 py-0 text-white text-center"
        style={{
          background: "linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)",
        }}
      >
        <h1 className="text-5xl font-extrabold mb-4 mt-6 drop-shadow-lg">
          Offers
        </h1>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Offer Header */}
        <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-8 mb-8 shadow-sm border border-red-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <span className="inline-block bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-medium px-4 py-2 rounded-full mb-3 shadow-md">
                {offer.offer_type}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {offer.title}
              </h1>
              <p className="text-rose-700 text-lg italic mb-4 font-medium">
                {offer.hint}
              </p>
              <div className="flex items-center text-sm text-rose-800">
                <span className="mr-4 bg-rose-100 px-3 py-1 rounded-full">
                  📅 Valid until: {offer.validity}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowEnquiry(true)}
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
            >
              Enquire Now
            </button>
          </div>
        </div>

        {/* Offer Description */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl border border-rose-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-rose-200">
                Offer Details
              </h2>
              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: offer.description }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border border-red-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Why Enquire?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Get personalized assistance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Clarify any doubts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Learn about eligibility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  <span>Get exclusive benefits</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Form Popup */}
      {showEnquiry && offer && (
        <OfferEnquiryForm
          offer={offer}
          onClose={() => setShowEnquiry(false)}
          onSuccess={handleEnquirySuccess}
        />
      )}
      <Expert />

      <Footer />
    </div>
  );
}
