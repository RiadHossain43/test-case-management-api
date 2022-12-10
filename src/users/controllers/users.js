const { User } = require("../services");
exports.getUser = async (req, res, next) => {
  try {
    const userService = new User();
    const { id } = req.params;
    const user = await userService.getUser(id);
    res
      .status(200)
      .json({ message: "user retrived successfully", details: { user } });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const userService = new User();
    const { id } = req.params;
    const user = await userService.changePassword(id, req.body);
    res.status(200).json({
      message: "Password changed.",
      details: { user },
    });
  } catch (error) {
    next(error);
  }
};
