const user = require("../../models/user");
class Manager {
  constructor() {
    this.User = user;
  }
}
module.exports = { Manager };
