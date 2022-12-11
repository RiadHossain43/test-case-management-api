const mongoose = require("mongoose");
const { softDeletePlugin } = require("./plugins/softDelete");
const { metaData } = require("./templates/metaData");

const Schema = new mongoose.Schema(
  {
    statusAnalytics: mongoose.Schema.Types.Mixed,
    metaData,
  },
  { timestamps: true }
);
Schema.plugin(softDeletePlugin);
module.exports = mongoose.model("test_cases", Schema);
