const Borrowing = require("../models/Borrowing");
const Book = require("../models/Book");
const Student = require("../models/Student");


exports.borrowBook = async (req, res) => {
  try {
    const { studentId, bookId } = req.body;

    if (!studentId || !bookId) {
      return res.status(400).json({
        success: false,
        message: "studentId and bookId are required",
      });
    }

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // BOR-BE-05
    if (!book.available) {
      return res.status(409).json({
        success: false,
        message: "Book is currently unavailable",
      });
    }

    const existingBorrowing = await Borrowing.findOne({
      student: studentId,
      book: bookId,
      status: "borrowed",
    });

    if (existingBorrowing) {
      return res.status(409).json({
        success: false,
        message: "Student has already borrowed this book",
      });
    }

    const borrowing = await Borrowing.create({
      student: studentId,
      book: bookId,
    });

    book.available = false;
    await book.save();

    const populatedBorrowing = await Borrowing.findById(
      borrowing._id
    )
      .populate("student")
      .populate("book");

    return res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      borrowing: populatedBorrowing,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to borrow book",
      error: error.message,
    });
  }
};
