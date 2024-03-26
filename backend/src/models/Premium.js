const mongoose = require("mongoose");

// Define Premium Schema
const premiumSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    money: {
        type: Number,
        default: 0,
      },
    status: {
      type: Boolean,
      default: false,
    },
    package: {
      type: Number,
      default: 0,
    },
    expiryDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Create Premium Model
const Premium = mongoose.model("Premium", premiumSchema);

module.exports = Premium;
