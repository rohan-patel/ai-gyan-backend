const HandleRequest = require("../models/handleRequest");

exports.createHandleRequest = async (req, res) => {
  const { search } = req.query;

  try {
    const handleRequest = new HandleRequest({
      user_id: "123",
      topic: search,
      current_status: 1,
      progress: { module_gen: 0, sub_module_gen: 0, revised_submodule: 0, content_gen: 0 },
      created_at: new Date(),
      updated_at: new Date(),
    });

    const savedRequest = await handleRequest.save();
    res.json({ requestId: savedRequest._id });
  } catch (error) {
    res.status(500).json({ error: "Error saving handle request" });
  }
};

exports.getCurrentStatus = async (req, res) => {
  const { requestId } = req.query;

  try {
    const handleRequest = await HandleRequest.findById(requestId);
    res.json({ current_status: handleRequest.current_status });
  } catch (error) {
    res.status(500).json({ error: "Error fetching status" });
  }
};
