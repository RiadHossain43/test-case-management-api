const ErroHandler = require("../helper/error/errorHandler");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const errorHandler = async (err, req, res, next) => {
  const errorHandler = new ErroHandler(err);
  errorHandler.handleError();
  if (errorHandler.isTrustedAPIError()) {
    console.log();
    res.status(err.httpStatusCode).json({
      message: err.name,
      details: {
        description: err.description,
      },
    });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
    console.log("Restarting gracefully...");
    process.exit(1);
  }
};

module.exports.errorHandler = errorHandler;
