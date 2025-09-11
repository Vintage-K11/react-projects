import React from "react";
import { Input } from "@/components/common/Input";  // Shadcn UI Input
import { Button } from "@/components/common/Button";  // Shadcn UI Button
import contactVid from "../assets/vids/contact.mp4"; // Replace with actual path

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send message
    alert("Message sent (mock)");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-serif font-bold text-gray-800 mb-8 text-center">
        Get in Touch with Rustic Reads
      </h1>

      {/* Unified Box for Form and Video */}
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
        {/* Left Section: Form */}
        <div className="md:w-1/2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Your Name</label>
              <Input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Your Email</label>
              <Input
                type="email"
                placeholder="Enter your email address"
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Your Message</label>
              <textarea
                placeholder="Write your message..."
                className="w-full p-4 border border-gray-300 rounded-md min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full py-3 cursor-pointer bg-black text-white rounded-md hover:bg-blue-950 transition-all duration-300"
            >
              Send Message
            </Button>
          </form>
        </div>

        {/* Right Section: Animation Video */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-md overflow-hidden">
            <video className="w-full h-auto object-contain rounded-lg" autoPlay loop muted>
              <source src={contactVid} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
