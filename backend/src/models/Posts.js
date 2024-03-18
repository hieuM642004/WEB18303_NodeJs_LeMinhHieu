const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    content: {
      type: String,
      require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    image: {
      type: String,
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);