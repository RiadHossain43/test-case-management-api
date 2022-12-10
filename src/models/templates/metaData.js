const mongoose = require("mongoose");
const metaData = {
  name: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
};
module.exports = { metaData };
