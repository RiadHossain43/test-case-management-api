const ErrorHandler = require("./errorHandler");
const actionOnUnhandled = () => {
  process.on("unhandledRejection", (error, promise) => {
    console.log("soft handling rejections ");
    let errorHandler = new ErrorHandler(error);
    errorHandler.handleError();
  });
  process.on("uncaughtException", (error) => {
    console.log("soft handling rejections ");
    let errorHandler = new ErrorHandler(error);
    errorHandler.handleError();
  });
};
module.exports = {
  actionOnUnhandled,
};
