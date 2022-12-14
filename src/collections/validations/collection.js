const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().max(100).required().label("Type"),
  description: Joi.string().optional().label("Description"),
});
const createCollection = schema.append({
  workspaceRef: Joi.string().max(100).required().label("Workspace"),
});
const editCollection = schema;
module.exports = {
  createCollection,
  editCollection,
};
