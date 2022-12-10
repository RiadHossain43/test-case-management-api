const router = require("express").Router();
const {
  login,
  startRegistration,
  startAccountRecovery,
  verifyRegistration,
  recoverAccount,
} = require("../controllers");

router.post("/account/login", login);

router.post("/account/registration", startRegistration);

router.post("/account/verification", verifyRegistration);

router.post("/account/recovery", startAccountRecovery);

router.post("/account/recovery/verification", recoverAccount);

module.exports = router;
