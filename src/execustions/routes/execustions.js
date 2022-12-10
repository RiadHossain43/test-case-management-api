const router = require("express").Router();
const {
  getMessages,
  sendMessage,
  seedMessage,
} = require("../controllers/message");

// middlewares ...
const { authUser } = require("../../common/middleware/authUser");

router.post("/", [], sendMessage);

router.post("/seed-message", [], seedMessage);

router.get("/:userId", [], getMessages);

module.exports = router;
