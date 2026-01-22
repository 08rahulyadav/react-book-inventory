import { useState } from "react";
import { addBook } from "../api/api";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    publisher: "",
    publishedDate: "",
    overview: "",
    email: "",
    pages: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Required fields validation (DATE INCLUDED)
    if (
      !form.title ||
      !form.author ||
      !form.email ||
      !form.pages ||
      !form.publishedDate
    ) {
      alert("Please fill all required fields");
      return;
    }

    // ✅ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // ✅ Pages must be a number
    if (isNaN(form.pages)) {
      alert("Pages must be a number");
      return;
    }

    // ✅ API call
    await addBook({
      ...form,
      pages: Number(form.pages)
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6">

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-sm text-gray-600 hover:text-gray-800"
        >
          ← Back to list
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            placeholder="Book Title *"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          />

          <input
            name="author"
            placeholder="Author *"
            value={form.author}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          />

          <input
            name="publisher"
            placeholder="Publisher"
            value={form.publisher}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="date"
            name="publishedDate"
            value={form.publishedDate}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          />

          <input
            name="email"
            placeholder="Author Email *"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          />

          <input
            name="pages"
            placeholder="Pages *"
            value={form.pages}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          />

          <textarea
            name="overview"
            placeholder="Book Overview"
            rows="4"
            value={form.overview}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
