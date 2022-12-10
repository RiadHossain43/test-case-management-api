const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().max(100).required().label("Type"),
  description: Joi.string().optional().label("Description"),
});
const create = schema;
const update = schema;
module.exports = {
  create,
  update,
};
