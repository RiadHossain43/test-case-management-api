const User = require("../../models/user");
const Session = require("../../models/session");

class Manager {
  constructor() {
    this.User = User;
    this.Session = Session;
  }
}
module.exports = { Manager };
