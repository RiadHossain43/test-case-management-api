const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailVerification: {
      token: {
        type: String,
        default: "",
      },
      status: {
        type: String,
        enum: ["Verified", "Pending"],
        default: "Pending",
      },
      varificationDate: {
        type: Date,
        default: null,
      },
    },
    recoveryToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", Schema);
