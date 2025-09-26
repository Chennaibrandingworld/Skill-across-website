"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function Page() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "", // Added title field based on API requirements
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    message: "",
    isError: false,
  });

  // Handle input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ message: "", isError: false });

    try {
      const response = await fetch("https://skillacross.com/api/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSubmitStatus({
          message:
            "Message sent successfully! We&apos;ll get back to you soon.",
          isError: false,
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          title: "",
          message: "",
        });
      } else {
        // Handle API validation errors
        if (responseData.errors) {
          const errorMessages = Object.entries(responseData.errors)
            .map(
              ([field, errors]) =>
                `${field}: ${(errors as string[]).join(", ")}`
            )
            .join("; ");
          throw new Error(errorMessages);
        }
        throw new Error(responseData.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        message:
          (error as Error).message || "An error occurred. Please try again.",
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white">
        <Header />

        {/* Hero Section */}
        {/* <section
          className="w-full min-h-[450px] flex flex-col justify-center items-center px-6 md:px-20 py-24 text-white text-center"
          style={{
            background: "linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)",
          }}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
              Get In Touch With Us
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl opacity-90 leading-relaxed">
              We&apos;re here to answer your questions and discuss your training
              needs. Reach out to us anytime.
            </p>
          </div>
        </section> */}
        <section
          className="w-full min-h-[200px] flex flex-col justify-center items-center px-6 md:px-20 py-0 text-white text-center"
          style={{
            background: "linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)",
          }}
        >
          <h1 className="text-5xl font-extrabold mb-4 mt-6 drop-shadow-lg">
            Get In Touch With Us
          </h1>
        </section>
        {/* Main Contact Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20 flex flex-col space-y-16 md:space-y-20">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Phone Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Call Us</h3>
              <div className="space-y-2">
                <a
                  href="tel:+919962471249"
                  className="block text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  (+91) 99624 71249
                </a>
                <a
                  href="tel:+919543125855"
                  className="block text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  (+91) 95431 25855
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Email Us</h3>
              <a
                href="mailto: skillacross@gmail.com"
                className="text-red-600 hover:text-red-700 font-medium transition-colors break-all"
              >
                skillacross@gmail.com
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.150-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.050-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.520.074-.792.372-.272.297-1.040 1.016-1.040 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.200 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.360.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.570-.347m-5.421 7.403h-.004a9.870 9.870 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.510-5.26c.001-5.450 4.436-9.884 9.888-9.884 2.640 0 5.122 1.030 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.450-4.437 9.884-9.885 9.884m8.413-18.285A11.815 11.815 0 0012.05 0C5.495 0 .160 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">WhatsApp</h3>
              <a
                href="https://wa.me/+919962471249"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                +919962471249
              </a>
            </div>
          </div>

          {/* Contact Form and Info Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Let&apos;s Start a Conversation
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We are eager to listen to your training requirements. Kindly
                  complete the form, and we will get back to you within 24
                  hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Our Location
                    </h3>
                    <p className="text-gray-700">
                      Chandra Towers, Rajaji Rd, Tambaram West, Chennai, Tamil
                      Nadu 600045, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Business Hours
                    </h3>
                    <p className="text-gray-700">
                      Monday - Saturday: 9:00 AM - 9:00 PM
                    </p>
                    <p className="text-gray-700">Sunday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl p-8 md:p-10 shadow-2xl text-white">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>

              {/* Status Message */}
              {submitStatus.message && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus.isError
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="font-semibold mb-2 block">Name</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      className="w-full rounded-lg  bg-white py-3 px-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label className="block">
                    <span className="font-semibold mb-2 block">Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      className="w-full rounded-lg py-3  bg-white px-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="font-semibold mb-2 block">Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your phone number"
                      className="w-full rounded-lg py-3  bg-white px-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label className="block">
                    <span className="font-semibold mb-2 block">Title</span>
                    <input
                      type="text"
                      name="title"
                      placeholder="Message title/subject"
                      className="w-full rounded-lg py-3  bg-white px-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="font-semibold mb-2 block">Message</span>
                  <textarea
                    rows={4}
                    name="message"
                    placeholder="Your message"
                    className="w-full rounded-lg py-3  bg-white px-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-white text-gray-900 resize-y"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-red-600 font-bold rounded-lg py-3 text-lg hover:bg-gray-100 transition shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
              Find Us Here
            </h3>
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 h-80 md:h-[450px]">
              <iframe
                title="Skill across Chennai Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.057993086365!2d80.12193131484962!3d12.937935490915627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d42a7a4e749%3A0xfdc253a7f6104a72!2sChandra%20Towers%2C%20Rajaji%20Rd%2C%20Tambaram%20West%2C%20Chennai%2C%20Tamil%20Nadu%20600045%2C%20India!5e0!3m2!1sen!2sus!4v1693656320000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen={false}
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
