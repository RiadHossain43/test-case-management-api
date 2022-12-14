const Workspaces = require("../../models/workspaces");
class Manager {
  constructor() {
    this.Workspaces = Workspaces;
  }
}
module.exports = { Manager };
