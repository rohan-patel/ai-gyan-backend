const express = require("express");
const { createHandleRequest, getCurrentStatus } = require("../controllers/handleRequestController");

const router = express.Router();

router.get("/search", createHandleRequest);
router.get("/getCurrentStatus", getCurrentStatus);

module.exports = router;
