import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const books = [
    {
      id: 1,
      title: "Noli Me Tangere",
      author: "Jose Rizal",
      category: "Novel",
      status: "Available",
    },
    {
      id: 2,
      title: "El Filibusterismo",
      author: "Jose Rizal",
      category: "Novel",
      status: "Available",
    },
    {
      id: 3,
      title: "Introduction to Nursing",
      author: "Various Authors",
      category: "Education",
      status: "Borrowed",
    },
  ];

  const filteredBooks = books.filter((book) => {
    const searchText = search.toLowerCase();

    return (
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText) ||
      book.category.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="page">
      <div className="container">
        <h1>Library Books</h1>
        <p className="subtitle">
          Search and view books available in the library.
        </p>

        <input
          type="text"
          className="search-input"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>
                      <span
                        className={
                          book.status === "Available"
                            ? "status available"
                            : "status borrowed"
                        }
                      >
                        {book.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-results">
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;