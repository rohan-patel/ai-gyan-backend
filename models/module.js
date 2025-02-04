const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  request_id: {
    type: Types.ObjectId
  },
  modules: [{
    module_name: String,
    description: String,
    module_id: String,
  }],
});

module.exports = mongoose.model("generated_modules", moduleSchema)