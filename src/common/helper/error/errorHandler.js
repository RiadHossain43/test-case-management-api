const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { APIError } = require("./apiError");
class ErroHandler {
  constructor(error) {
    this.error = error;
  }
  handleError() {
    console.log(
      "Logging error handler: ******************************************"
    );
    console.log(this.error?.message);
    console.log(this.error);
    console.log(
      "*****************************************************************"
    );
  }
  isTrustedAPIError() {
    if (this.error instanceof APIError) {
      return this.error.isOperational;
    }
    return false;
  }
}
module.exports = ErroHandler;
