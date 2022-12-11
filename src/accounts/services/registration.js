const { Manager } = require("./manager");
const bcrypt = require("bcryptjs");
const { Token } = require("../../common/helper");
const { sendMail } = require("../../email/sendMail");
class Registration extends Manager {
  constructor() {
    super();
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
}
module.exports = { Registration };
