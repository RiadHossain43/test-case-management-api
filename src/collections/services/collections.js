const { APIError } = require("../../common/helper/error/apiError");
const { Manager } = require("./manager");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
class Collections extends Manager {
  constructor() {
    super();
  }
  async createCollection(data) {
    const collection = new this.Collections({
      workspaceRef: data.workspaceRef,
      metaData: {
        name: data.name,
        description: data.description,
        author: data.author,
      },
    });
    return collection.save();
  }
  async isExisting(query) {
    const collection = await this.Collections.findOne(query);
    if (!collection)
      return {
        status: false,
        data: null,
      };
    return {
      status: true,
      data: collection,
    };
  }
  async getCollection(query) {
    let exist = await this.isExisting(query);
    if (!exist.status)
      throw new APIError(
        ReasonPhrases.NOT_FOUND,
        StatusCodes.NOT_FOUND,
        "No collection found with the givent query."
      );
    return exist.data;
  }
  async listCollections(query) {
    let pagination = await this.Collections.paginate(query);
    return pagination;
  }
  async editCollection(id, data) {
    const collection = await this.getCollection({ _id: id });
    collection.metaData.name = data.name;
    collection.metaData.description = data.description;
    return collection.save();
  }
  async softRemoveCollection(id) {
    const collection = await this.getCollection({ _id: id });
    if (collection) {
      return this.Collections.softDelete({ _id: id });
    }
  }
  async hardRemoveCollection(id) {
    const collection = await this.getCollection({ _id: id });
    if (collection) {
      return this.Collections.deleteOne({ _id: id });
    }
  }
  async restoreCollection(id) {
    const collection = await this.getCollection({ _id: id });
    if (collection) {
      return this.Collections.restore({ _id: id });
    }
  }
}
module.exports = { Collections };
