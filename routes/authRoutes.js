const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

console.log("EMpty Commit");


router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
