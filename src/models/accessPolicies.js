const mongoose = require("mongoose");
const { metaData } = require("./templates/metaData");
const { testTypes, permissions } = require("./templates/permissions");

const Schema = new mongoose.Schema(
  {
    workspaceRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "workspaces",
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    permissions: {
      type: mongoose.Schema.Types.Mixed,
      enum: [permissions],
    },
    metaData,
  },
  { timestamps: true }
);
module.exports = mongoose.model("access_policies", Schema);
