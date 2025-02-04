const Module = require("../models/module")

const moduleController = {
  async findModuleByRequestId(requestId) {
    try {
      const module = await Module.findOne({ request_id: requestId });
      return module;
    } catch (error) {
      console.error("Error finding module:", error);
      throw error;
    }
  }
};

module.exports = moduleController;