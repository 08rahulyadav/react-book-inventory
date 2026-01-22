import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById } from "../api/api";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = async () => {
    const res = await getBookById(id);
    setBook(res.data);
  };

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-50">
        <p className="text-lg text-gray-600">Loading book details...</p>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-6">

      
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">

        
        <button
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
        >
          ← Back
        </button>

        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {book.title}
        </h2>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">

          <p>
            <span className="font-semibold">Author:</span>{" "}
            {book.author}
          </p>

          <p>
            <span className="font-semibold">Publisher:</span>{" "}
            {book.publisher}
          </p>

          <p>
            <span className="font-semibold">Published Date:</span>{" "}
            {book.publishedDate}
          </p>

          <p>
            <span className="font-semibold">Email:</span>{" "}
            {book.email}
          </p>

          <p>
            <span className="font-semibold">Pages:</span>{" "}
            {book.pages}
          </p>
        </div>

        
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Overview
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {book.overview || "No overview available."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
