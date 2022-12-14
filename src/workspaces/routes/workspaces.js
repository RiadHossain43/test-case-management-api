const router = require("express").Router();
const {
  createWorkspace,
  listWorkspaces,
  editWorkspace,
  getWorkspace,
  softRemoveWorkspace,
  hardRemoveWorkspace,
  restoreWorkspace,
} = require("../controllers");

// middlewares ...
const { validate } = require("../../common/middleware/validator");
const validaions = require("../validations");
const validateBody = validate("body");

router.post("/", [validateBody(validaions.createWorkspace)], createWorkspace);

router.get("/", [], listWorkspaces);

router.put("/:id", [validateBody(validaions.editWorkspace)], editWorkspace);

router.get("/:id", [], getWorkspace);

router.delete("/:id/soft", [], softRemoveWorkspace);

router.delete("/:id/hard", [], hardRemoveWorkspace);

router.put("/:id/restore", [], restoreWorkspace);

module.exports = router;
