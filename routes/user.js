const express = require("express");
const router = express.Router();

const { handleSignUp, handleLogin } = require("../controllers/users");

router.route("/sign-up").post(handleSignUp);
router.route("/login").post(handleLogin);

module.exports = router;
