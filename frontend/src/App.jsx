import "./App.css";

function App() {
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

  return (
    <div className="page">
      <div className="container">
        <h1>Library Books</h1>
        <p className="subtitle">View books available in the library.</p>

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
              {books.map((book) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;