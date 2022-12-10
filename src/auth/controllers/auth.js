const { Auth } = require("../services");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const authService = new Auth();
    const authResponse = await authService.authenticateIdentity(
      email,
      password
    );
    return res.status(200).json({
      message: "Login successfull.",
      details: { ...authResponse },
    });
  } catch (error) {
    next(error);
  }
};

exports.startRegistration = async (req, res, next) => {
  try {
    const authService = new Auth();
    const registration = await authService.startRegistration(req.body);
    return res.status(200).json({
      message: "Registration process started.",
      details: { ...registration },
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyRegistration = async (req, res, next) => {
  try {
    const token = req.header("x-register-token");
    const authService = new Auth();
    const user = await authService.verifyRegistration(token);
    res.status(200).json({
      message: "User account validation complete.",
      details: { user },
    });
  } catch (error) {
    next(error);
  }
};
exports.startAccountRecovery = async (req, res, next) => {
  try {
    const authService = new Auth();
    const recovery = await authService.startAccountRecovery(req.body.email);
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
    const authService = new Auth();
    const user = await authService.recoverAccount(token, req.body.password);
    res.status(200).json({
      message: "Account recovered.",
      details: { user },
    });
  } catch (error) {
    next(error);
  }
};
