const router = require("express").Router();
const {
  login,
  startRegistration,
  startAccountRecovery,
  verifyRegistration,
  recoverAccount,
} = require("../controllers");

router.post("/auth/login", login);

router.post("/registration", startRegistration);

router.post("/registration/verification", verifyRegistration);

router.post("/recovery", startAccountRecovery);

router.post("/recovery/verification", recoverAccount);

module.exports = router;
