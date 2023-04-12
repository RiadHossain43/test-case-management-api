const { APIError } = require("../../common/helper/error/apiError");
const { Manager } = require("./manager");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
class TestCases extends Manager {
  constructor() {
    super();
  }
  async createTestCase(data) {
    const testCase = new this.TestCases({
      collectionRef: data.collectionRef,
      type: data.type,
      labels: data.labels,
      metaData: {
        name: data.name,
        description: data.description,
        author: data.author,
      },
    });
    return testCase.save();
  }
  async isExisting(query) {
    const testCase = await this.TestCases.findOne(query);
    if (!testCase)
      return {
        status: false,
        data: null,
      };
    return {
      status: true,
      data: testCase,
    };
  }
  async getTestCase(query) {
    let exist = await this.isExisting(query);
    if (!exist.status) throw new APIError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND, "Test case not found.");
    return exist.data;
  }
  async listTestCasess(query) {
    let pagination = await this.TestCases.paginate(query);
    return pagination;
  }
  async editTestCase(id, data) {
    const testCase = await this.getTestCase({ _id: id });
    testCase.type = data.type;
    testCase.metaData.name = data.name;
    testCase.metaData.description = data.description;
    return testCase.save();
  }
  async softRemoveTestCase(id) {
    const testCase = await this.getTestCase({ _id: id });
    if (testCase) {
      return this.TestCases.softDelete({ _id: id });
    }
  }
  async hardRemoveTestCase(id) {
    const testCase = await this.getTestCase({ _id: id });
    if (testCase) {
      return this.TestCases.deleteOne({ _id: id });
    }
  }
  async restoreTestCase(id) {
    const testCase = await this.getTestCase({ _id: id });
    if (testCase) {
      return this.TestCases.restore({ _id: id });
    }
  }
}
module.exports = { TestCases };
