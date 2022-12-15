const { Validation } = require("../helper/validation");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const validate =
  (validationObjectName) => (schema) => async (req, res, next) => {
    const validation = new Validation(req.tenant);
    const errors = validation.validate(schema, req[validationObjectName]);
    if (errors)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `${validationObjectName} validation error.`,
        details: {
          errors,
        },
      });
    next();
  };
exports.validate = validate;
