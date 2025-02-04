const express = require("express");
const cors = require("cors");
const { default: mongoose, Mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 3001;
const MONGO_URI = "mongodb+srv://jaydev:llm_teacher@llm-teacher.ngvct.mongodb.net/llm_teacher"

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // Adjust origin for frontend
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes)


// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Mongoose model
const { Schema, Types } = mongoose;

const Module = mongoose.model("generated_modules", new Schema({
  request_id: {
    type: Types.ObjectId
  },
  modules: [{
    module_name: String,
    description: String,
    module_id: String,
  }],
}));

const SubModule = mongoose.model("generated_submodules", new Schema({
  topic_id: String,
  module_id: String,
  revised: Boolean,
  submodules: [{
    sub_module_name: String,
    description: String,
    sub_module_id: String,
  }],
}));

const SubModuleContent = mongoose.model("generated_lesson_content", new Schema({
  sub_module_id: String,
  content: String,
}));

const HandleRequest = mongoose.model("handle_request", new mongoose.Schema({
  user_id: String,
  topic: String,
  current_status: Number,
  progress: {
    module_gen: Number,
    sub_module_gen: Number,
    revised_submodule: Number,
    content_gen: Number
  },
  created_at: Date,
  updated_at: Date
}));

// Function to save a HabdleRequest
async function saveHandleRequest(handleRequest) {
  try {
    const newHandleRequest = new HandleRequest(handleRequest);
    const response = await newHandleRequest.save();
    return response._id;
    // return newHandleRequest;
  } catch (error) {
    console.error("Error saving handleRequest:", error);
    throw error;
  }
}


// Function to find a document by requestId
async function findModuleByRequestId(requestId) {
  try {
    const module = await Module.findOne({ request_id: requestId });
    return module;
  } catch (error) {
    console.error("Error finding module:", error);
    throw error;
  }
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/api/search", async (req, res) => {
  const { search } = req.query;
  console.log("Search query:", search);
  
  // get the search query and create a HandleRequest object with topic as search query and save it to the database
  const handleRequest = {
    user_id: "123",
    topic: search,
    current_status: 1,
    progress: {
      module_gen: 0,
      sub_module_gen: 0,
      revised_submodule: 0,
      content_gen: 0
    },
    created_at: new Date(),
    updated_at: new Date()
  };
  const response = await saveHandleRequest(handleRequest);
  res.json({ requestId: `${response._id}` });
});

// create an api that will fetch handlerequest object using the id and return current_status
app.get("/api/getCurrentStatus", async (req, res) => {
  const { requestId } = req.query;
  console.log("ID:", requestId);
  const handleRequest = await HandleRequest.findById(requestId);
  console.log("HandleRequest:", handleRequest);
  res.json({ current_status: handleRequest.current_status });
});



app.get("/api/getSubmoduleContent", (req, res) => {
  const { submoduleId } = req.query;
  console.log("Submodule ID:", submoduleId);
  res.json({ content: "This is the content of the submodule" });
});

app.get("/api/getModules", async (req, res) => {
  const { requestId } = req.query;
  console.log("Request ID:", requestId);
  
  // const requestId = 1;
  const modules = await findModuleByRequestId(requestId);
  console.log("Modules:", modules);
  
  res.json({ modules });
});

app.get("/api/getSubModules", async (req, res) => {
  const { moduleId } = req.query;
  console.log("Module ID:", moduleId);
  
  const subModules = await SubModule.findOne({ module_id: moduleId });
  console.log("SubModules:", subModules);
  
  res.json({ subModules });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
