const { Recovery } = require("../services");

exports.startAccountRecovery = async (req, res, next) => {
  try {
    const recoveryService = new Recovery();
    const recovery = await recoveryService.startAccountRecovery(req.body.email);
    res.status(200).json({
      message: "Recovery email sent for varification.",
      details: { ...recovery },
    });
  } catch (error) {
    next(error);
  }
};
exports.recoverAccount = async (req, res, next) => {
  try {
    const token = req.header("x-recovery-token");
    const recoveryService = new Recovery();
    const user = await recoveryService.recoverAccount(token, req.body.password);
    res.status(200).json({
      message: "Account recovered.",
      details: { user },
    });
  } catch (error) {
    next(error);
  }
};
