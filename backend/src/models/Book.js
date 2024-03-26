const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
  },
  premium: {
    type: Boolean,
    default: false,
  },
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genres",
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  images: [
    {
      type: String,
    },
  ],
  pdfUrl: {
    type: String,
  },
});

let Book = mongoose.model("Book", bookSchema);
let Author = mongoose.model("Author", authorSchema);

module.exports = { Book, Author };
