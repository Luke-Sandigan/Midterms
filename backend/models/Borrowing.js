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
