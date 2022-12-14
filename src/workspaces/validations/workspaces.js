const Joi = require("joi");
const {
  accessManagementTypes,
} = require("../../models/templates/accessManagementTypes");
const schema = Joi.object({
  name: Joi.string().max(100).required().label("Name"),
  description: Joi.string().optional().label("Description"),
});
const createWorkspace = schema.append({
  accessManagementType: Joi.string()
    .valid(
      accessManagementTypes.roleBased,
      accessManagementTypes.permissionBased
    )
    .required()
    .label("Access management type"),
});
const editWorkspace = schema;
module.exports = {
  createWorkspace,
  editWorkspace,
};
