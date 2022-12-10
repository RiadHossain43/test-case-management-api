const { Validation } = require("../helper/validation");
const validate =
  (validationObjectName) => (schema) => async (req, res, next) => {
    const validation = new Validation(req.tenant);
    const errors = validation.validate(schema, req[validationObjectName]);
    if (errors)
      return res.status(400).json({
        message: `${validationObjectName} validation error.`,
        errors,
      });
    next();
  };
exports.validate = validate;
