const express = require("express");
const router = express.Router();

const { handleLogin, handleSignUpUser } = require("../controllers/auth");

router.route("/sign-up").post(handleSignUpUser);
router.route("/login").post(handleLogin);

module.exports = router;
