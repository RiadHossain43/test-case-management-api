const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().max(100).required().label("Type"),
  description: Joi.string().optional().label("Description"),
});
const createCollection = schema;
const editCollection = schema;
module.exports = {
  createCollection,
  editCollection,
};
