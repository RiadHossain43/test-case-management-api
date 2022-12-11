const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
exports.connectDataBase = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.plugin(mongoosePaginate);
    await mongoose.connect(process.env.MONGO_URI + process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.error(err);
    // Exit process with failure
    process.exit(1);
  }
};
