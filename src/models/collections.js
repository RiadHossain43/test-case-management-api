const mongoose = require("mongoose");
const { metaData } = require("./templates/metaData");

const Schema = new mongoose.Schema(
  {
    metaData,
  },
  { timestamps: true }
);
module.exports = mongoose.model("collections", Schema);
