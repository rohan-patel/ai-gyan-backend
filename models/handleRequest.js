const mongoose = require("mongoose");

const handleRequestSchema = new mongoose.Schema({
  user_id: String,
  topic: String,
  current_status: Number,
  progress: {
    module_gen: Number,
    sub_module_gen: Number,
    revised_submodule: Number,
    content_gen: Number,
  },
  created_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model("handle_request", handleRequestSchema);
