const mongoose = require("mongoose");

const subModuleContentSchema = new mongoose.Schema({
    sub_module_id: String,
    content: String,
  })

modules.export = mongoose.model("generated_lesson_content", subModuleContentSchema);