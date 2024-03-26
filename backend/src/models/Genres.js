const mongoose = require("mongoose");

const genresSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Genres", genresSchema);