const { TestCases } = require("./testCases");
const { changePositionInArray } = require("../../common/helper/algorithms");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { APIError } = require("../../common/helper/error/apiError");

class Steps extends TestCases {
  constructor() {
    super();
  }
  async addStep(id, data) {
    await this.TestCases.updateOne(
      { _id: id },
      {
        $push: { steps: { value: data.step } },
      }
    );
    return this.getTestCase({ _id: id });
  }
  async changeStepPosition(id, data) {
    let testCase = await this.getTestCase({ _id: id });
    const oldIndex = testCase.steps.findIndex((step) => step._id === data.id);
    if (!oldIndex)
      throw new APIError(
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND,
        "Step not found with id:" + data.id
      );
    if (data.newIndex > testCase.steps.length - 1)
      data.newIndex = testCase.steps.length - 1;
    testCase.steps = changePositionInArray(
      testCase.steps,
      oldIndex,
      data.newIndex
    );
    return testCase.save();
  }
  async removeStep(id, step_id) {
    await this.TestCases.updateOne(
      { _id: id },
      {
        $pull: { steps: { _id: step_id } },
      }
    );
    return this.getTestCase({ _id: id });
  }
}
module.exports = { Steps };
