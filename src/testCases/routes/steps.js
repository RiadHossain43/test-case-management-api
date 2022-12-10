const router = require("express").Router();
const { addStep, changeStepPosition, removeStep } = require("../controllers");

// middlewares ...
const { validate } = require("../../common/middleware/validator");
const validations = require("../validations");
const validateBody = validate("body");

router.post("/:id/steps", [validateBody(validations.addStep)], addStep);

router.put(
  "/:id/steps/:step_id",
  [validateBody(validations.changeStepPosition)],
  changeStepPosition
);

router.delete("/:id/steps/:step_id", removeStep);

module.exports = router;
