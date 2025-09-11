import React from "react";
import collab from "../assets/vids/Collab.webm"; // Make sure this is the correct path

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 bg-gray-50">
      <h1 className="text-5xl font-serif font-bold text-gray-800 mb-6 text-center">
        About Rustic Reads
      </h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto leading-relaxed">
        Rustic Reads is a collection of short stories that capture the quiet, meaningful moments of life. From remote escapes to urban solitude, our stories explore different perspectives of those who thrive in their own company.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Column: Text Content */}
        <div className="space-y-12">
          <section className="mb-8">
            <h2 className="text-4xl font-serif font-semibold text-gray-800 mb-4">
              Our Story
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Rustic Reads celebrates the quiet moments that often go unnoticed—stories that are brief yet impactful. We believe in the power of solitude and self-reflection, offering a platform for stories that focus on life's simple, profound moments. Whether it's the peaceful isolation of nature or the introspective solitude of city life, we create a space for narratives that speak to the heart.
            </p>
          </section>
        </div>

        {/* Right Column: Video Embed */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-md overflow-hidden">
            <video className="w-full h-auto object-contain" autoPlay loop muted>
              <source src={collab} type="video/webm" />
              {/* Fallback message */}
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
