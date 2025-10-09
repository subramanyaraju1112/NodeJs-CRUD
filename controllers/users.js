const User = require("../models/users");

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
    return res.status(200).json({ message: "Login Successfull" });
  } catch (error) {
    return res.status(500).json({ error: "Error Logging In" });
  }
};

const handleGetAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "All users fetched", users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed fetching users", error: error.message });
  }
};

const handleGetUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user, req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Fetched user by Id", user });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching user" });
  }
};

const handleUpdateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedUser) {
      res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating the user", error: error.message });
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = {
  handleSignUp,
  handleLogin,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
};
