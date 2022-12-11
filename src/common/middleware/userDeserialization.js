const { Token } = require("../helper/token");
const { Auth } = require("../../auth/services");

const userDeserialization = async (req, res, next) => {
  const accessToken = req.header("x-auth-accesstoken");
  const refreshToken = req.header("x-auth-refreshtoken");
  try {
    if (!accessToken) throw new Error("Forbiden!! No access token found.");
    const validationResponse = await Token.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!validationResponse.valid) {
      if (validationResponse.expired && refreshToken) {
        const auth = new Auth();
        const newTokens = await auth.handleRefreshToken(refreshToken);
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        });
        res.cookie("refreshToken", newTokens.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(203).json({
          message: "New pair of newTokens granted.",
        });
      } else throw new Error("Forbidden!! Invalid access token.");
    }
    /** user authenticated proceed to next middleware */
    if (validationResponse.decoded) {
      req.accessControl = {
        userId: validationResponse.decoded.userId,
      };
      return next();
    }
    console.log("Unknown authorization error!");
    return res.status(440).json({ message: "Unknown authorization error!" });
  } catch (error) {
    console.error(error);
    res
      .status(440)
      .json({ message: error.message || "User unauthorized or login expired" });
  }
};

module.exports = userDeserialization;
