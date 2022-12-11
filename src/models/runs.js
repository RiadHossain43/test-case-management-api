const mongoose = require("mongoose");
const { softDeletePlugin } = require("./plugins/softDelete");
const { metaData } = require("./templates/metaData");

const Schema = new mongoose.Schema(
  {
    metaData,
  },
  { timestamps: true }
);

Schema.plugin(softDeletePlugin);
module.exports = mongoose.model("runs", Schema);
