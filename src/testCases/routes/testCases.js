const router = require("express").Router();
const {
  listTestCases,
  editTestCase,
  getTestCase,
  softRemoveTestCase,
  hardRemoveTestCase,
  restoreTestCase,
} = require("../controllers");

// middlewares ...
const { validate } = require("../../common/middleware/validator");
const validations = require("../validations");
const { createTestCase } = require("../controllers");
const validateBody = validate("body");

router.post("/", [validateBody(validations.createTestCase)], createTestCase);

router.get("/", [], listTestCases);

router.put("/:id", [validateBody(validations.editTestCase)], editTestCase);

router.get("/:id", [], getTestCase);

router.delete("/:id/soft", [], softRemoveTestCase);

router.delete("/:id/hard", [], hardRemoveTestCase);

router.put("/:id/restore", [], restoreTestCase);

module.exports = router;
