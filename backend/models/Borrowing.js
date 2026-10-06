const mongoose = require("mongoose");

const borrowingSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    borrowedAt: {
      type: Date,
      default: Date.now,
    },

    returnedAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Borrowing", borrowingSchema);

borrowingSchema.index(
  { book: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "borrowed" },
  }
);

const mongoose = require("mongoose");

const borrowingSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    borrowedAt: {
      type: Date,
      default: Date.now,
    },

    returnedAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
  },
  {
    timestamps: true,
  }
);

borrowingSchema.index(
  { book: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "borrowed" },
  }
);

module.exports = mongoose.model("Borrowing", borrowingSchema);

exports.returnBook = async (req, res) => {
  try {
    const { borrowingId } = req.params;

    const borrowing = await Borrowing.findById(borrowingId);

    if (!borrowing) {
      return res.status(404).json({
        success: false,
        message: "Borrowing record not found",
      });
    }

    if (borrowing.status === "returned") {
      return res.status(409).json({
        success: false,
        message: "Book has already been returned",
      });
    }

    borrowing.status = "returned";
    borrowing.returnedAt = new Date();

    await borrowing.save();

    const book = await Book.findById(borrowing.book);

    if (book) {
      book.available = true;
      await book.save();
    }

    const updatedBorrowing = await Borrowing.findById(
      borrowing._id
    )
      .populate("student")
      .populate("book");

    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
      borrowing: updatedBorrowing,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to return book",
      error: error.message,
    });
  }
};


exports.getBorrowedBooks = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const borrowings = await Borrowing.find({
      student: studentId,
      status: "borrowed",
    })
      .populate("book")
      .sort({ borrowedAt: -1 });

    return res.status(200).json({
      success: true,
      count: borrowings.length,
      borrowings,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed books",
      error: error.message,
    });
  }
};
