import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BorrowedBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    setBorrowedBooks(JSON.parse(localStorage.getItem("borrowedBooks") || "[]"));
    setStudent(JSON.parse(localStorage.getItem("studentProfile") || "null"));
  }, []);

  return (
    <main className="borrowed-page">
      <header className="borrowed-header">
        <div>
          <p className="eyebrow">STUDENT LIBRARY</p>
          <h1>My borrowed books.</h1>
          <p className="books-subtitle">
            View the books currently borrowed under your student account.
          </p>
        </div>
        <div className="borrowed-nav">
          <Link className="secondary-button nav-button" to="/books">Browse books</Link>
          <Link className="logout-link" to="/login">Sign out</Link>
        </div>
      </header>

      {student && (
        <section className="student-summary">
          <div>
            <span>Student</span>
            <strong>{student.borrowerName}</strong>
          </div>
          <div>
            <span>Student ID</span>
            <strong>{student.studentId}</strong>
          </div>
          <div>
            <span>Borrowed</span>
            <strong>{borrowedBooks.length} {borrowedBooks.length === 1 ? "book" : "books"}</strong>
          </div>
        </section>
      )}

      <div className="results-row borrowed-results">
        <strong>{borrowedBooks.length} {borrowedBooks.length === 1 ? "borrowed book" : "borrowed books"}</strong>
        <span>Student borrowing record</span>
      </div>

      {borrowedBooks.length > 0 ? (
        <section className="borrowed-list">
          {borrowedBooks.map((book) => (
            <article className="borrowed-card" key={book.id}>
              <div className="book-cover borrowed-cover"><span>{book.title.charAt(0)}</span></div>
              <div className="borrowed-info">
                <div className="book-topline">
                  <span className="availability available">Borrowed</span>
                  <span>{book.category}</span>
                </div>
                <h2>{book.title}</h2>
                <p>by {book.author}</p>
                <div className="borrow-dates">
                  <div><span>Borrowed on</span><strong>{book.borrowDate}</strong></div>
                  <div><span>Return by</span><strong>{book.returnDate}</strong></div>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="empty-state borrowed-empty">
          <div className="empty-icon">▱</div>
          <h2>No borrowed books yet</h2>
          <p>You haven't submitted a borrowing request. Browse the catalog to find a book.</p>
          <Link className="login-button browse-button" to="/books">Browse available books <span>→</span></Link>
        </div>
      )}
    </main>
  );
}

export default BorrowedBooks;
