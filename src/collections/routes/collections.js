const router = require("express").Router();
const {
  createCollection,
  listCollections,
  editCollection,
  getCollection,
  softRemoveCollection,
  hardRemoveCollection,
  restoreCollection,
} = require("../controllers");

// middlewares ...
const { validate } = require("../../common/middleware/validator");
const validaions = require("../validations");
const validateBody = validate("body");

router.post("/", [validateBody(validaions.createCollection)], createCollection);

router.get("/", [], listCollections);

router.put("/:id", [validateBody(validaions.editCollection)], editCollection);

router.get("/:id", [], getCollection);

router.delete("/:id/soft", [], softRemoveCollection);

router.delete("/:id/hard", [], hardRemoveCollection);

router.put("/:id/restore", [], restoreCollection);

module.exports = router;
