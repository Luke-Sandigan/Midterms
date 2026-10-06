import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Books from "../pages/Books";
import Borrowing from "../pages/Borrowing";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/available" element={<Books availableOnly />} />
      <Route path="/borrow/:bookId" element={<Borrowing />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
