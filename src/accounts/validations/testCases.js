const Joi = require("joi");
const testTypes = require("../../models/templaates/testTypes");
const schema = Joi.object({
  name: Joi.string().max(100).required().label("Type"),
  description: Joi.string().optional().label("Description"),
  collection: Joi.string().required().label("Collection"),
  type: Joi.string()
    .valid(...testTypes)
    .label("Type"),
  labels: Joi.string().optional().label("Labels"),
});
const create = schema;
const update = schema;
module.exports = {
  create,
  update,
};
