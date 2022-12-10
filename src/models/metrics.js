const mongoose = require("mongoose");
const { metaData } = require("./templates/metaData");

const Schema = new mongoose.Schema(
  {
    statusAnalytics: mongoose.Schema.Types.Mixed,
    metaData,
  },
  { timestamps: true }
);


module.exports = mongoose.model("test_cases", Schema);
