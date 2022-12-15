const { Collections } = require("../services");
const { StatusCodes } = require("http-status-codes");
exports.createCollection = async (req, res, next) => {
  try {
    const collectionService = new Collections();
    const data = {
      ...req.body,
      author: "6388aba3a2100c3984e30a32",
    };
    const collection = await collectionService.createCollection(data);
    return res.status(StatusCodes.CREATED).json({
      message: "Collection created.",
      details: { collection },
    });
  } catch (error) {
    next(error);
  }
};
exports.listCollections = async (req, res, next) => {
  try {
    const collectionService = new Collections();
    const collections = await collectionService.listCollections({});
    return res.status(StatusCodes.OK).json({
      message: "Collections retrived.",
      details: { collections },
    });
  } catch (error) {
    next(error);
  }
};
exports.getCollection = async (req, res, next) => {
  try {
    const collectionService = new Collections();
    const collection = await collectionService.getCollection({
      _id: req.params.id,
    });
    return res.status(StatusCodes.OK).json({
      message: "Collection retrived.",
      details: { collection },
    });
  } catch (error) {
    next(error);
  }
};
exports.editCollection = async (req, res, next) => {
  try {
    const collectionService = new Collections();
    const collection = await collectionService.editCollection(
      req.params.id,
      req.body
    );
    return res.status(StatusCodes.OK).json({
      message: "Collection updated.",
      details: { collection },
    });
  } catch (error) {
    next(error);
  }
};
exports.softRemoveCollection = async (req, res, next) => {
  try {
    const collectionService = new Collections();
    const collection = await collectionService.softRemoveCollection(
      req.params.id
    );
    return res.status(StatusCodes.OK).json({
      message: "Collection moved to trash.",
      details: { collection },
    });
  } catch (error) {
    next(error);
  }
};
exports.restoreCollection = async (req, res, next) => {
  try {
    const collectionService = new Collections();
    const response = await collectionService.restoreCollection(req.params.id);
    return res.status(StatusCodes.OK).json({
      message: "Collection restored.",
      details: { response },
    });
  } catch (error) {
    next(error);
  }
};
exports.hardRemoveCollection = async (req, res, next) => {
  try {
    const collectionService = new Collections();
    const collection = await collectionService.hardRemoveCollection(
      req.params.id
    );
    return res.status(StatusCodes.OK).json({
      message: "Collection removed.",
      details: { collection },
    });
  } catch (error) {
    next(error);
  }
};
