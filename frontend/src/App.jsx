import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Noli Me Tangere",
      author: "Jose Rizal",
      category: "Novel",
      status: "Available",
      description:
        "A novel that explores Philippine society during the Spanish colonial period.",
    },
    {
      id: 2,
      title: "El Filibusterismo",
      author: "Jose Rizal",
      category: "Novel",
      status: "Available",
      description:
        "The sequel to Noli Me Tangere, focusing on social injustice and reform.",
    },
    {
      id: 3,
      title: "Introduction to Nursing",
      author: "Various Authors",
      category: "Education",
      status: "Borrowed",
      description:
        "An introductory reference covering fundamental nursing concepts and practices.",
    },
  ]);

  const filteredBooks = books.filter((book) => {
    const searchText = search.toLowerCase();

    return (
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText) ||
      book.category.toLowerCase().includes(searchText)
    );
  });

  function handleReturnBook(bookId) {
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === bookId
          ? { ...book, status: "Available" }
          : book
      )
    );

    if (selectedBook?.id === bookId) {
      setSelectedBook((currentBook) => ({
        ...currentBook,
        status: "Available",
      }));
    }
  }

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
                <th>Details</th>
                <th>Action</th>
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

                    <td>
                      <button
                        className="details-button"
                        onClick={() => setSelectedBook(book)}
                      >
                        View Details
                      </button>
                    </td>

                    <td>
                      {book.status === "Borrowed" ? (
                        <button
                          className="return-button"
                          onClick={() => handleReturnBook(book.id)}
                        >
                          Return Book
                        </button>
                      ) : (
                        <span className="no-action">—</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-results">
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedBook && (
          <div className="book-details">
            <h2>Book Details</h2>

            <p>
              <strong>Title:</strong> {selectedBook.title}
            </p>

            <p>
              <strong>Author:</strong> {selectedBook.author}
            </p>

            <p>
              <strong>Category:</strong> {selectedBook.category}
            </p>

            <p>
              <strong>Status:</strong> {selectedBook.status}
            </p>

            <p>
              <strong>Description:</strong> {selectedBook.description}
            </p>

            {selectedBook.status === "Borrowed" && (
              <button
                className="return-button"
                onClick={() => handleReturnBook(selectedBook.id)}
              >
                Return Book
              </button>
            )}

            <button
              className="close-button"
              onClick={() => setSelectedBook(null)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;