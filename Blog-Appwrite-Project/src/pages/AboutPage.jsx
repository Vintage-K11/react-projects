import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">About This Blog</h1>
      <p className="text-lg text-muted-foreground mb-6">
        This platform is built to share knowledge, tutorials and personal experiences. We prioritize high-quality content and a supportive community.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
        <p className="text-muted-foreground">
          Create a friendly and modern place for developers to publish and discover great articles.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
