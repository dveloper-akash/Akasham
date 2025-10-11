import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';

const Help = () => {
  const [form, setForm] = useState({
    subject: '',
    category: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can send this to the backend later
    console.log('Submitted Help Form:', form);
  };

  return (
    <div className="p-5 max-w-2xl mx-auto w-full">
      <h1 className="text-2xl font-semibold flex items-center gap-2 mb-6">
        <MessageSquare className="w-6 h-6 text-blue-500" />
        Contact Support
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Trouble uploading video"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            <option value="account">Account Issue</option>
            <option value="payment">Payment Problem</option>
            <option value="project">Project-related</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your message here..."
            required
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Send className="w-4 h-4" />
          Send Message
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-6 text-center">
        We usually respond within 24 hours. For urgent matters, email us at <span className="text-blue-600">support@akasham.in</span>
      </p>
    </div>
  );
};

export default Help;
