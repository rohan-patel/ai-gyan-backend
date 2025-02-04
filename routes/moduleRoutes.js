const express = require("express");
const { moduleController } = require("../controllers/moduleController");

const router = express.Router();

router.get("/getModules", moduleController.findModuleByRequestId);

module.exports = router;
