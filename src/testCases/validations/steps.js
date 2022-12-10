const Joi = require("joi");
const addStep = Joi.object({
  step: Joi.string().max(120).required().label("Step"),
});
const changeStepPosition = Joi.object({
  newIndex: Joi.number().greater(-1).less(21).label("Step"),
});
module.exports = {
  addStep,
  changeStepPosition,
};
