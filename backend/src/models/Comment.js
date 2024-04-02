const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    text: {
      type: String,
    },
    rating: {
      type: Number,
    },
    edited:{
      type:Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
