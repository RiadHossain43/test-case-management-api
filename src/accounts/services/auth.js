const { Manager } = require("./manager");
const bcrypt = require("bcryptjs");
const { Token } = require("../../common/helper");
class Auth extends Manager {
  constructor() {
    super();
  }
  async authenticateIdentity({ email, password, userAgent }) {
    if (!email || !password) throw new Error("Email & Password are required.");
    const user = await this.User.findOne({ email });
    if (!user) throw new Error("User not registered with this email.");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials.");
    await this.Session.create({ userRef: user._id, userAgent });
    const newTokenPair = await this.getTokenPair(
      { userId: user._id },
      { userId: user._id }
    );

    /**
     * PROBLEM: security case needs to be handled.
     * what if:
     * 1. user logins in
     * 2. never uses refresh token & never logs out
     * 3. refresh token is stolen.
     * RESOLUTION : reuse detection required somehow on login process.
     */
    user.refreshTokens = [...user.refreshTokens, newTokenPair.refreshToken];
    await user.save();
    return { ...newTokenPair };
  }
  async getTokenPair(accessTokenPayload, refreshTokenPayload) {
    const accessToken = await Token.signToken(
      accessTokenPayload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_TTL,
      }
    );
    const refreshToken = await Token.signToken(
      refreshTokenPayload,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_TTL,
      }
    );
    return { accessToken, refreshToken };
  }
  async handleRefreshToken(refreshToken) {
    /**
     * PROBLEM: what if user is deleted and tokens are still valid.
     */
    if (!refreshToken) throw new Error("No refresh token found.");
    const foundUser = await this.User.findOne({ refreshToken });
    /**
     * Detected refresh token reuse.
     * Handling security on reuse of a token.
     */
    if (!foundUser) {
      const validationResponse = await Token.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      if (!validationResponse.valid)
        throw new Error("Forbidden|| Invalid refresh token");
      console.log(
        "Refresh token reuse atempt detected, protecting hacked user..."
      );
      const hackedUser = await this.User.findOne({
        _id: validationResponse.decoded.userId,
      });
      hackedUser.refreshTokens = [];
      const result = await hackedUser.save();
      console.log("Printing user information...");
      console.log(result);
      throw new Error("Forbidden!! Reuse of refresh token.");
    }

    /**
     * Evaluation of refresh token to execute a token pair iteration.
     */
    const newRefreshTokenArray = foundUser.refreshTokens.filter(
      (rt) => rt !== refreshToken
    );
    const validationResponse = await Token.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!validationResponse.valid) {
      console.log("Refresh token expired, login required.");
      foundUser.refreshTokens = [...newRefreshTokenArray];
      const result = await foundUser.save();
      console.log(result);
    }
    if (
      !validationResponse.valid ||
      foundUser._id !== !validationResponse.valid.decoded.userId
    )
      throw new Error("Forbidden!! User id don't match with refresh token.");

    /**
     * Refresh token passed all checks and is still valid.
     */
    const newTokenPair = await this.getTokenPair(
      { userId: user._id },
      { userId: user._id }
    );
    /**
     * Adding new refresh token for this current users refresh token family
     */
    foundUser.refreshTokens = [
      ...newRefreshTokenArray,
      newTokenPair.refreshToken,
    ];
    await foundUser.save();
    return { ...newTokenPair };
  }
}
module.exports = { Auth };
