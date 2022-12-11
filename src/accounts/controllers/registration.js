const { Registration } = require("../services");

exports.startRegistration = async (req, res, next) => {
  try {
    const registraationService = new Registration();
    const registration = await registraationService.startRegistration(req.body);
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
    const registraationService = new Registration();
    const user = await registraationService.verifyRegistration(token);
    res.status(200).json({
      message: "User account validation complete.",
      details: { user },
    });
  } catch (error) {
    next(error);
  }
};
