const { Manager } = require("./manager");
const bcrypt = require("bcryptjs");
const { Token } = require("../../common/helper");
const { sendMail } = require("../../email/sendMail");
class Auth extends Manager {
  constructor() {
    super();
  }
  async authenticateIdentity({ email, password, userAgent }) {
    if (!email) throw new Error("Email is required.");
    if (!password) throw new Error("Password is required.");
    const user = await this.User.findOne({ email });
    if (!user) throw new Error("User not registered with this email.");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials.");
    const session = this.Session.create({ userRef: user._id, userAgent });
    const accessTokenPayload = { userId: user._id };
    const refreshTokenPayload = { sessionId: session._id };
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
    if (!accessToken) throw new Error("Access token could not be signed.");
    return { accessToken, refreshToken };
  }
  async startRegistration(data) {
    if (!data) throw new Error("Data is required.");
    const { name, email, password } = data;
    let user = await this.User.findOne({ email });
    if (user)
      throw new Error("An account is already registerd with this email.");
    let accessTokenPayload = {
      name,
      email,
      password,
    };
    const registrationToken = await Token.signToken(
      accessTokenPayload,
      process.env.JWT_KEY,
      { expiresIn: 600 }
    );
    if (!registrationToken)
      throw new Error("Registration token could not be signed.");
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    let newUser = new this.User({
      name,
      email,
      password: hashPassword,
      emailVerification: { token: registrationToken },
    });
    await newUser.save();
    let verificationLink = `http://localhost:3000/activate-account/${registrationToken}`;
    await sendMail("account-verification", email, { name, verificationLink });
    return { name, email };
  }
  async verifyRegistration(token) {
    if (!token) throw new Error("Registration token is required");
    let validationResponse = await Token.verify(token, process.env.JWT_KEY);
    if (!validationResponse.valid) {
      if (validationResponse.expired) {
        await this.User.updateOne(
          { email },
          {
            $set: {
              "emailVerification.token": null,
            },
          }
        );
        throw new Error("Token expired.");
      }
      throw new Error("Token is invalid.");
    }
    let { name, email, password } = validationResponse.decoded;
    let user = await this.User.findOne({ email });
    if (!user) throw new Error("User not found.");
    if (user.emailVerification.token !== token)
      throw new Error("Token is too old.");
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    user = await this.User.findOneAndUpdate(
      { email },
      {
        $set: {
          name,
          email,
          password: hashPassword,
          emailVerification: {
            token: null,
            status: "Verified",
            varificationDate: Date.now(),
          },
        },
      },
      { new: true }
    );
    return user;
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
}
module.exports = { Auth };
