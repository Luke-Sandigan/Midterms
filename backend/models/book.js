import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        isbn: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        genre: {
            type: String,
            trim: true,
        },
        publisher: {
            type: String,
            trim: true,
        },
        publicationYear: {
            type: Number,
            min: 0,
        },
        availableCopies: {
            type: Number,
            default: 1,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
