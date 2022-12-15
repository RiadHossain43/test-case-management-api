const { Manager } = require("./manager");
const { APIError } = require("../../common/helper/error/apiError");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
class Workspaces extends Manager {
  constructor() {
    super();
  }
  async createWorkspace(data) {
    const workspace = new this.Workspaces({
      accessManagementType: data.accessManagementType,
      metaData: {
        name: data.name,
        description: data.description,
        author: data.author,
      },
    });
    return workspace.save();
  }
  async isExisting(query) {
    const workspace = await this.Workspaces.findOne(query);
    if (!workspace)
      return {
        status: false,
        data: null,
      };
    return {
      status: true,
      data: workspace,
    };
  }
  async getWorkspace(query) {
    let exist = await this.isExisting(query);
    if (!exist.status)
      throw new APIError(
        ReasonPhrases.NOT_FOUND,
        StatusCodes.NOT_FOUND,
        "No workspace found with the given query."
      );
    return exist.data;
  }
  async listWorkspaces(query) {
    let pagination = await this.Workspaces.paginate(query);
    return pagination;
  }
  async editWorkspace(id, data) {
    const workspace = await this.getWorkspace({ _id: id });
    workspace.metaData.name = data.name;
    workspace.metaData.description = data.description;
    return workspace.save();
  }
  async softRemoveWorkspace(id) {
    const workspace = await this.getWorkspace({ _id: id });
    if (workspace) {
      return this.Workspaces.softDelete({ _id: id });
    }
  }
  async hardRemoveWorkspace(id) {
    const workspace = await this.getWorkspace({ _id: id });
    if (workspace) {
      return this.Workspaces.deleteOne({ _id: id });
    }
  }
  async restoreWorkspace(id) {
    const workspace = await this.getWorkspace({ _id: id });
    if (workspace) {
      return this.Workspaces.restore({ _id: id });
    }
  }
}
module.exports = { Workspaces };
