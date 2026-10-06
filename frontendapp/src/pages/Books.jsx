import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", year: 1925, available: true },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", year: 1960, available: true },
  { id: 3, title: "1984", author: "George Orwell", category: "Dystopian", year: 1949, available: false },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", category: "Romance", year: 1813, available: true },
  { id: 5, title: "The Hobbit", author: "J. R. R. Tolkien", category: "Fantasy", year: 1937, available: true },
  { id: 6, title: "Clean Code", author: "Robert C. Martin", category: "Technology", year: 2008, available: false },
  { id: 7, title: "Introduction to Algorithms", author: "Thomas H. Cormen et al.", category: "Technology", year: 2009, available: true },
  { id: 8, title: "The Alchemist", author: "Paulo Coelho", category: "Adventure", year: 1988, available: true },
];

function Books({ availableOnly = false }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [showAvailableOnly, setShowAvailableOnly] = useState(availableOnly);

  const filteredBooks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return books.filter((book) => {
      const matchesQuery = !normalized || [book.title, book.author, book.category].some((value) => value.toLowerCase().includes(normalized));
      const matchesCategory = category === "All" || book.category === category;
      const matchesAvailability = !showAvailableOnly || book.available;
      return matchesQuery && matchesCategory && matchesAvailability;
    });
  }, [query, category, showAvailableOnly]);

  return (
    <main className="books-page">
      <header className="books-header">
        <div>
          <p className="eyebrow">LIBRARY CATALOG</p>
          <h1>Find a book.</h1>
          <p className="books-subtitle">{showAvailableOnly ? "Browse books that are currently available to borrow." : "Search the library collection by title, author, or category."}</p>
        </div>
        <div className="books-actions"><Link className="secondary-button nav-button" to="/borrowed-books">My borrowed books</Link><Link className="logout-link" to="/login">Sign out</Link></div>
      </header>

      <section className="search-panel">
        <div className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search books, authors, or categories..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search books"
          />
        </div>
        <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category">
          <option>All</option>
          <option>Fiction</option>
          <option>Dystopian</option>
          <option>Romance</option>
          <option>Fantasy</option>
          <option>Technology</option>
          <option>Adventure</option>
        </select>
      </section>

      <div className="availability-filter" role="group" aria-label="Book availability">
        <button type="button" className={!showAvailableOnly ? "filter-active" : ""} onClick={() => setShowAvailableOnly(false)}>All books</button>
        <button type="button" className={showAvailableOnly ? "filter-active" : ""} onClick={() => setShowAvailableOnly(true)}>Available books</button>
      </div>

      <div className="results-row">
        <strong>{filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}</strong>
        <span>{showAvailableOnly ? "Currently available" : "Library collection"}</span>
      </div>

      <section className="book-grid" aria-live="polite">
        {filteredBooks.map((book) => (
          <article className="book-card" key={book.id}>
            <div className="book-cover"><span>{book.title.charAt(0)}</span></div>
            <div className="book-info">
              <div className="book-topline">
                <span className={`availability ${book.available ? "available" : "unavailable"}`}>
                  {book.available ? "Available" : "Borrowed"}
                </span>
                <span>{book.year}</span>
              </div>
              <h2>{book.title}</h2>
              <p>by {book.author}</p>
              <span className="category-tag">{book.category}</span>
              {book.available ? (
                <Link className="borrow-button" to={`/borrow/${book.id}`}>Borrow book</Link>
              ) : (
                <button type="button" disabled className="borrow-button">Currently unavailable</button>
              )}
            </div>
          </article>
        ))}
      </section>

      {filteredBooks.length === 0 && (
        <div className="empty-state">
          <h2>No books found</h2>
          <p>Try a different title, author, or category.</p>
        </div>
      )}
    </main>
  );
}

export default Books;
