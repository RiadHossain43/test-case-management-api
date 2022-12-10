const Joi = require("joi");
const { testTypes } = require("../../models/templates/testTypes");
const schema = Joi.object({
  name: Joi.string().max(100).required().label("Type"),
  description: Joi.string().optional().label("Description"),
  collectionRef: Joi.string().required().label("Collection"),
  type: Joi.string()
    .valid(...testTypes)
    .label("Type"),
  labels: Joi.array().items(Joi.string().optional().label("Labels")),
});
const createTestCase = schema;
const editTestCase = schema.fork(["collectionRef"], (schema) =>
  schema.optional()
);
module.exports = {
  createTestCase,
  editTestCase,
};
