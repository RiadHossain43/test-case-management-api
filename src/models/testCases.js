const mongoose = require("mongoose");
const { metaData } = require("./templates/metaData");
const { testTypes } = require("./templates/testTypes");

const Schema = new mongoose.Schema(
  {
    collectionRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "collections",
    },
    type: {
      type: String,
      enum: testTypes,
      required: true,
    },
    labels: [String],
    steps: {
      type: [
        {
          value: String,
        },
      ],
      validate: [
        function (val) {
          return val.length <= 20;
        },
        "{PATH} exceeds the limit of 10",
      ],
    },
    metaData,
  },
  { timestamps: true }
);
module.exports = mongoose.model("test_cases", Schema);
