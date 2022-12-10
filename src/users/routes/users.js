const router = require("express").Router();
const { getUserInfo, register, resetPassword } = require("../../controllers/user");

// middlewares ...
const { authUser } = require("../../common/middleware/authUser");

router.get("/:userId", [authUser], getUserInfo);

router.post("/", [], register);

router.post("/setnewpassword", [], resetPassword);

module.exports = router;
