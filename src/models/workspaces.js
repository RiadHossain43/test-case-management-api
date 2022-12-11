const mongoose = require("mongoose");
const { softDeletePlugin } = require("./plugins/softDelete");
const { accessManagementTypes } = require("./templates/accessManagementTypes");
const { metaData } = require("./templates/metaData");
const Schema = new mongoose.Schema(
  {
    collectionRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "collections",
    },
    accessManagementType: {
      type: String,
      enum: [
        accessManagementTypes.roleBased,
        accessManagementTypes.permissionBased,
      ],
      default: accessManagementTypes.roleBased,
      required: true,
    },
    metaData,
  },
  { timestamps: true }
);
Schema.plugin(softDeletePlugin);
module.exports = mongoose.model("test_cases", Schema);
