const express = require("express");
const { createHandleRequest, getCurrentStatus } = require("../controllers/handleRequestController");

const router = express.Router();

router.get("/getSubmoduleContent", createHandleRequest);

module.exports = router;
