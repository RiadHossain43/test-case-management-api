const mongoose = require("mongoose");
const { metaData } = require("./templates/metaData");
const { softDeletePlugin } = require("./plugins/softDelete");
const Schema = new mongoose.Schema(
  {
    workspaceRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "workspaces",
    },
    metaData,
  },
  { timestamps: true }
);
Schema.plugin(softDeletePlugin);
module.exports = mongoose.model("collections", Schema);
