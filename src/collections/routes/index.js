const express = require("express");
const router = express.Router();
router.use("/", require("./collections"));
module.exports = router;
