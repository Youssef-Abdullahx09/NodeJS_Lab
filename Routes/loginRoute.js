const express = require("express");
const loginController = require("./../Controller/loginController")
const router = express.Router();
router.route("/login")
    .post(loginController);
module.exports = router;