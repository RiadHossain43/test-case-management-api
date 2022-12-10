const TestCases = require("../../models/testCases");
class Manager {
  constructor() {
    this.TestCases = TestCases;
  }
}
module.exports = { Manager };
