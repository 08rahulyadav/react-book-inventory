import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../api/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const res = await getBooks();
    setBooks(res.data);
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this book?");
    if (!ok) return;

    await deleteBook(id);
    loadBooks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-6">

      
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">

        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            📚 Book Inventory
          </h1>

          <button
            onClick={() => navigate("/add")}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            + Add Book
          </button>
        </div>

        
        <div className="overflow-auto max-h-[420px] rounded-lg border">
          <table className="w-full text-left">
            <thead className="bg-indigo-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Title
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Author
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No books available
                  </td>
                </tr>
              ) : (
                books.map((book, index) => (
                  <tr
                    key={book.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-indigo-50 transition`}
                  >
                    <td className="px-4 py-3">{book.title}</td>
                    <td className="px-4 py-3">{book.author}</td>

                    <td className="px-4 py-3 text-center space-x-2">
                      
                      <button
                        onClick={() => navigate(`/book/${book.id}`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                      >
                        View
                      </button>

                      
                      <button
                        onClick={() => navigate(`/edit/${book.id}`)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>

                      
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
