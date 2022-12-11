const { Manager } = require("./manager");
const bcrypt = require("bcryptjs");
const { Token } = require("../../common/helper");
const { sendMail } = require("../../email/sendMail");
class Recovery extends Manager {
  constructor() {
    super();
  }
  async startAccountRecovery(email) {
    let user = await this.User.findOne({ email });
    if (!user) throw new Error("User not found.");
    const accessTokenPayload = { _id: user._id };
    const recoveryToken = await Token.signToken(
      accessTokenPayload,
      process.env.JWT_KEY,
      {
        expiresIn: 600,
      }
    );
    if (!recoveryToken) throw new Error("Recovery token could not be signed.");
    let recoveryLink = `http://localhost:3000/activate-account/${recoveryToken}`;
    await sendMail("account-recovery", email, {
      name: user.name,
      recoveryLink,
    });
    await this.User.updateOne(
      { email },
      {
        $set: {
          recoveryToken: recoveryToken,
        },
      }
    );
    return { email };
  }
  async recoverAccount(token, newPassword) {
    if (!token) throw new Error("Recovery token is required");
    let validationResponse = await Token.verify(token, process.env.JWT_KEY);
    if (!validationResponse.valid) {
      if (validationResponse.expired) {
        await this.User.updateOne(
          { email },
          {
            $set: {
              recoveryToken: null,
            },
          }
        );
        throw new Error("Token expired.");
      }
      throw new Error("Token is invalid.");
    }
    let { _id } = validationResponse.decoded;
    let user = await this.User.findOne({ _id });
    if (!user) throw new Error("User not found.");
    if (user.recoveryToken !== token) throw new Error("Token is too old.");
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(newPassword, salt);
    user = await this.User.findOneAndUpdate(
      { _id },
      {
        $set: {
          password: hashPassword,
          recoveryToken: null,
        },
      },
      { new: true }
    );
    return user;
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
}
module.exports = { Recovery };
