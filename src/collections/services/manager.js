const Collections = require("../../models/collections");
class Manager {
  constructor() {
    this.Collections = Collections;
  }
}
module.exports = { Manager };
