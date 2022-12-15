const { Steps } = require("../services");
const { StatusCodes } = require("http-status-codes");

exports.addStep = async (req, res, next) => {
  try {
    const steps = new Steps();
    const testCase = await steps.addStep(req.params.id, req.body);
    return res.status(StatusCodes.CREATED).json({
      message: "Step added to test case.",
      details: { testCase },
    });
  } catch (error) {
    next(error);
  }
};
exports.changeStepPosition = async (req, res, next) => {
  try {
    const steps = new Steps();
    const testCase = await steps.changeStepPosition(req.params.id, {
      id: req.params.step_id,
      newIndex: req.body.newIndex,
    });
    return res.status(StatusCodes.OK).json({
      message: "Step position updated.",
      details: { testCase },
    });
  } catch (error) {
    next(error);
  }
};
exports.removeStep = async (req, res, next) => {
  try {
    const steps = new Steps();
    const testCase = await steps.removeStep(req.params.id, req.params.step_id);
    return res.status(StatusCodes.OK).json({
      message: "Step removed from test case.",
      details: { testCase },
    });
  } catch (error) {
    next(error);
  }
};
