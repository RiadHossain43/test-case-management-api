const Workspaces = require("../../models/workspaces");
const AccessPolicies = require("../../models/accessPolicies");
class Manager {
  constructor() {
    this.Workspaces = Workspaces;
    this.AccessPolicies = AccessPolicies;
  }
}
module.exports = { Manager };
