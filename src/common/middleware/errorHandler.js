const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const ErroHandler = require("../helper/error/errorHandler");
const errorHandler = async (err, req, res, next) => {
  const errorHandler = new ErroHandler(err);
  errorHandler.handleError();
  /**
   * response will be made dynamic enough, to handle all the errors and send message to frontend
   */
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
};

module.exports.errorHandler = errorHandler;
