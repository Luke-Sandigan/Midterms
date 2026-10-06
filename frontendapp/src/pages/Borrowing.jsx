import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

function Borrowing() {
  const { bookId } = useParams();
  const book = useMemo(() => books.find((item) => item.id === Number(bookId)), [bookId]);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ borrowerName: "", studentId: "", borrowDate: new Date().toISOString().slice(0, 10), returnDate: "" });

  if (!book) {
    return <main className="form-page"><div className="form-card"><h1>Book not found</h1><p>The selected book does not exist in the library catalog.</p><Link className="secondary-button" to="/books">Back to books</Link></div></main>;
  }

  if (!book.available) {
    return <main className="form-page"><div className="form-card"><p className="eyebrow">BORROWING FORM</p><h1>Book unavailable</h1><p><strong>{book.title}</strong> is currently borrowed and cannot be requested from this form.</p><Link className="secondary-button" to="/books">Back to books</Link></div></main>;
  }

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="form-page">
        <div className="form-card confirmation-card">
          <div className="success-mark">✓</div>
          <p className="eyebrow">BORROWING REQUEST</p>
          <h1>Borrowing submitted.</h1>
          <p>Your request for <strong>{book.title}</strong> has been recorded for <strong>{form.borrowerName}</strong>.</p>
          <div className="confirmation-details">
            <span>Student ID</span><strong>{form.studentId}</strong>
            <span>Borrow date</span><strong>{form.borrowDate}</strong>
            <span>Return date</span><strong>{form.returnDate}</strong>
          </div>
          <Link className="login-button center-button" to="/books">Back to books <span>→</span></Link>
        </div>
      </main>
    );
  }

  return (
    <main className="form-page">
      <div className="form-wrap">
        <Link className="back-link" to="/books">← Back to books</Link>
        <div className="form-card">
          <p className="eyebrow">BORROWING FORM</p>
          <h1>Borrow a book.</h1>
          <p className="form-subtitle">Complete the form below to submit your borrowing request.</p>

          <div className="selected-book">
            <div className="book-cover small-cover"><span>{book.title.charAt(0)}</span></div>
            <div><span className="availability available">Available</span><h2>{book.title}</h2><p>by {book.author}</p></div>
          </div>

          <form onSubmit={submit} className="borrowing-form">
            <label>Borrower name<input name="borrowerName" value={form.borrowerName} onChange={update} placeholder="Enter your full name" required /></label>
            <label>Student ID<input name="studentId" value={form.studentId} onChange={update} placeholder="e.g. 2026-12345" required /></label>
            <div className="date-grid">
              <label>Borrow date<input type="date" name="borrowDate" value={form.borrowDate} onChange={update} required /></label>
              <label>Return date<input type="date" name="returnDate" value={form.returnDate} onChange={update} min={form.borrowDate} required /></label>
            </div>
            <button className="login-button submit-borrow" type="submit">Submit borrowing request <span>→</span></button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Borrowing;
