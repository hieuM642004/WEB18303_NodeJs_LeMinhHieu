const mongoose = require("mongoose");

const genresSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    image: {
      type: String,
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Genres", genresSchema);