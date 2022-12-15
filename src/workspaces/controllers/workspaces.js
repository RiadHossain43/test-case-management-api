const { StatusCodes } = require("http-status-codes");
const { Workspaces } = require("../services");
exports.createWorkspace = async (req, res, next) => {
  try {
    const workspaceService = new Workspaces();
    const data = {
      ...req.body,
      author: "6388aba3a2100c3984e30a32",
    };
    const workspace = await workspaceService.createWorkspace(data);
    return res.status(StatusCodes.CREATED).json({
      message: "Workspace created.",
      details: { workspace },
    });
  } catch (error) {
    next(error);
  }
};
exports.listWorkspaces = async (req, res, next) => {
  try {
    const workspaceService = new Workspaces();
    const workspaces = await workspaceService.listWorkspaces({});
    return res.status(StatusCodes.OK).json({
      message: "Workspaces retrived.",
      details: { workspaces },
    });
  } catch (error) {
    next(error);
  }
};
exports.getWorkspace = async (req, res, next) => {
  try {
    const workspaceService = new Workspaces();
    const workspace = await workspaceService.getWorkspace({
      _id: req.params.id,
    });
    return res.status(StatusCodes.OK).json({
      message: "Workspace retrived.",
      details: { workspace },
    });
  } catch (error) {
    next(error);
  }
};
exports.editWorkspace = async (req, res, next) => {
  try {
    const workspaceService = new Workspaces();
    const workspace = await workspaceService.editWorkspace(
      req.params.id,
      req.body
    );
    return res.status(StatusCodes.OK).json({
      message: "Workspace updated.",
      details: { workspace },
    });
  } catch (error) {
    next(error);
  }
};
exports.softRemoveWorkspace = async (req, res, next) => {
  try {
    const workspaceService = new Workspaces();
    const workspace = await workspaceService.softRemoveWorkspace(req.params.id);
    return res.status(StatusCodes.OK).json({
      message: "Workspace moved to trash.",
      details: { workspace },
    });
  } catch (error) {
    next(error);
  }
};
exports.restoreWorkspace = async (req, res, next) => {
  try {
    const workspaceService = new Workspaces();
    const response = await workspaceService.restoreWorkspace(req.params.id);
    return res.status(StatusCodes.OK).json({
      message: "Workspace restored.",
      details: { response },
    });
  } catch (error) {
    next(error);
  }
};
exports.hardRemoveWorkspace = async (req, res, next) => {
  try {
    const workspaceService = new Workspaces();
    const workspace = await workspaceService.hardRemoveWorkspace(req.params.id);
    return res.status(StatusCodes.OK).json({
      message: "Workspace removed.",
      details: { workspace },
    });
  } catch (error) {
    next(error);
  }
};
