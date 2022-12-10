const { StatusCodes, ReasonPhrases } = require("http-status-codes");
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
  prepareHTTPResponse() {}
}
module.exports = ErroHandler;
