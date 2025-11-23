const User = require("../models/users");

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
    return res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
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
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
};
