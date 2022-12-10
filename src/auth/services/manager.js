const User = require("../../models/user");
class Manager {
  constructor() {
    this.User = User;
  }
}
module.exports = { Manager };
