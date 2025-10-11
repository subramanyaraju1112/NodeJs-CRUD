const User = require("../models/users");
const generateToken = require("../utils/generateToken");

const handleSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if ((!username, !email, !password)) {
      return res.status(400).json({ message: "All Fields Required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      await User.create({ username, email, password });
      return res.status(201).json({ message: "Account created successfully" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating account", error: error.message });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      return res.status(400).json({ message: "All fields required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    console.log("Token", token);
    return res.status(200).json({ message: "Login Successfull", token });
  } catch (error) {
    return res.status(500).json({ error: "Error Logging In" });
  }
};

module.exports = { handleSignUp, handleLogin };
