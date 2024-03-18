const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 6,
      max: 20,
      unique: true,
    },
    avatar:{
      type: String,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    hasFollow:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);