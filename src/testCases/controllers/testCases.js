const { TestCases } = require("../services");
exports.createTestCase = async (req, res, next) => {
  try {
    const testCasesService = new TestCases();
    const data = {
      ...req.body,
      author: "6388aba3a2100c3984e30a32",
    };
    const testCase = await testCasesService.createTestCase(data);
    return res.status(200).json({
      message: "Test case created.",
      details: { testCase },
    });
  } catch (error) {
    next(error);
  }
};
exports.listTestCases = async (req, res, next) => {
  try {
    const testCasesService = new TestCases();
    const testCases = await testCasesService.listTestCasess({});
    return res.status(200).json({
      message: "Test cases retrived.",
      details: { testCases },
    });
  } catch (error) {
    next(error);
  }
};
exports.getTestCase = async (req, res, next) => {
  try {
    const testCasesService = new TestCases();
    const testCase = await testCasesService.getTestCase({
      _id: req.params.id,
    });
    return res.status(200).json({
      message: "Test case retrived.",
      details: { testCase },
    });
  } catch (error) {
    next(error);
  }
};
exports.editTestCase = async (req, res, next) => {
  try {
    const testCasesService = new TestCases();
    const testCase = await testCasesService.editTestCase(
      req.params.id,
      req.body
    );
    return res.status(200).json({
      message: "Test case updated.",
      details: { testCase },
    });
  } catch (error) {
    next(error);
  }
};
exports.softRemoveTestCase = async (req, res, next) => {
  try {
    const testCasesService = new TestCases();
    const testCase = await testCasesService.softRemoveTestCase(
      req.params.id
    );
    return res.status(200).json({
      message: "Test case moved to trash.",
      details: { testCase },
    });
  } catch (error) {
    next(error);
  }
};
exports.restoreTestCase = async (req, res, next) => {
  try {
    const testCasesService = new TestCases();
    const response = await testCasesService.restoreTestCase(req.params.id);
    return res.status(200).json({
      message: "Test case restored.",
      details: { response },
    });
  } catch (error) {
    next(error);
  }
};
exports.hardRemoveTestCase = async (req, res, next) => {
  try {
    const testCasesService = new TestCases();
    const testCase = await testCasesService.hardRemoveTestCase(
      req.params.id
    );
    return res.status(200).json({
      message: "Test case removed.",
      details: { testCase },
    });
  } catch (error) {
    next(error);
  }
};
