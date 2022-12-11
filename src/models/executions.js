const mongoose = require("mongoose");
const { softDeletePlugin } = require("./plugins/softDelete");
const { metaData } = require("./templates/metaData");

const Schema = new mongoose.Schema(
  {
    testCaseRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "test_cases",
    },
    run: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "runs",
    },
    priority: Number,
    status: {
      type: String,
      enum: ["Skipped", "Pending", "Passed", "Failed"],
    },
    summery: {
      type: String,
    },
    metaData,
  },
  { timestamps: true }
);
Schema.plugin(softDeletePlugin);
module.exports = mongoose.model("executions", Schema);
