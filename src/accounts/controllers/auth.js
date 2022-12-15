const { Auth } = require("../services");
const { StatusCodes } = require("http-status-codes");
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const authService = new Auth();
    const authResponse = await authService.authenticateIdentity({
      email,
      password,
      userAgent: req.get("user-agent") || "",
    });
    return res.status(StatusCodes.OK).json({
      message: "Login successfull.",
      details: { ...authResponse },
    });
  } catch (error) {
    next(error);
  }
};
