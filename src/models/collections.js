const mongoose = require("mongoose");
const { metaData } = require("./templates/metaData");
const { softDeletePlugin } = require("./plugins/softDelete");
const Schema = new mongoose.Schema(
  {
    metaData,
  },
  { timestamps: true }
);
Schema.plugin(softDeletePlugin);
module.exports = mongoose.model("collections", Schema);
