import React from "react";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send message
    alert("Message sent (mock)");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Your name</label>
          <Input className=""
            required />
        </div>
        <div>
          <label className="block text-sm mb-1">Your email</label>
          <Input type="email" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Message</label>
          <textarea className="w-full p-3 border rounded-md min-h-[120px]" required />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
};

export default ContactPage;
