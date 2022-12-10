const { Manager } = require("./manager");
class User extends Manager {
  constructor() {
    super();
  }
  async isExisting(query) {
    const user = await this.User.findOne(query);
    if (!user)
      return {
        status: false,
        data: null,
      };
    return {
      status: true,
      data: user,
    };
  }
  async getUser(query) {
    let exist = await this.isExisting(query);
    if (!exist.status) throw new Error("Collection not found.");
    return exist.data;
  }
  async changePassword(id, data) {
    const { password, oldPassword } = data;
    if (oldPassword === password)
      throw new Error("Current password can not be used.");
    let user = await this.getUser({ _id: id });
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error("Invalid credentials.");
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          password: hashPassword,
        },
      },
      { new: true }
    );
    return user;
  }
}
module.exports = { User };
