import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    telephone: '',
    comment: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    setForm({ name: '', email: '', telephone: '', comment: '' });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 md:px-16">
      {/* Header */}
      <div className="bg-white py-6 px-4 md:px-10 shadow rounded-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Contact Us</h1>
      </div>

      {/* Contact Form centered */}
      <div className="max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              <span className="text-red-500">*</span> Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-sky-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              <span className="text-red-500">*</span> Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-sky-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Telephone</label>
            <input
              type="tel"
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              placeholder="Enter your telephone number"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-sky-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              <span className="text-red-500">*</span> Comment
            </label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Write your message..."
              required
              className="w-full border border-gray-300 rounded px-3 py-2 h-32 resize-none focus:outline-none focus:ring focus:border-sky-400"
            />
          </div>

          <p className="text-sm text-gray-500">
            <span className="text-red-500">*</span> Required fields
          </p>

          <button
            type="submit"
            className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition"
          >
            <Send className="h-4 w-4" /> Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
