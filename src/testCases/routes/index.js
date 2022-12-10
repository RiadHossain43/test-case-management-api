const express = require("express");
const router = express.Router();
router.use("/", require("./testCases"));
router.use("/", require("./steps"));
module.exports = router;
