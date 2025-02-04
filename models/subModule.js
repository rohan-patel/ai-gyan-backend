const mongoose = require("mongoose");

const subModuleSchema = new mongoose.Schema({
    topic_id: String,
    module_id: String,
    revised: Boolean,
    submodules: [{
      sub_module_name: String,
      description: String,
      sub_module_id: String,
    }],
  })

modules.export = mongoose.model("generated_submodules", subModuleSchema);