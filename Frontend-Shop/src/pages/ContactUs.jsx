import React, { useState } from "react";
import Wrapper from "../components/Wrapper";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
  };

  return (
    <Wrapper>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Contact Us</h1>
        <div className="text-sm text-center text-slate-800 mb-4">
          <p>
            If you have any questions or need support, feel free to reach out to
            us using the form below:
          </p>
        </div>
        <form className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-800 text-sm mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-800 text-sm mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="text-gray-800 text-sm mb-2 block"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              rows="4"
              placeholder="Write your message"
              required
            ></textarea>
          </div>
          <button
            type="button"
            className="py-3.5 w-full px-7 mb-5 text-sm font-semibold tracking-wider rounded-md text-white bg-stone-900 hover:bg-stone-950 focus:outline-none"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default ContactUs;
