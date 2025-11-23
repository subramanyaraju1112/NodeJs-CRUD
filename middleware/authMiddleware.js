const jwt = require("jsonwebtoken");
const User = require("../models/users");

const checkForAuthentication = async (req, res, next) => {
  try {
    // Check Authorization Header
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      return res.status(401).json({ message: "No Token Provided" });
    }
    // Check if Token exists
    const token = authorizationHeader.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token Not Found" });
    }
    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const userExists = checkUserInDB(req.user.id);
    if (!userExists) {
      return res.status(401).json({ message: "User Not Found" });
    }
    // All Good? -> Continue
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: error.message });
  }
};

const checkUserInDB = async (userId) => {
  try {
    const user = await User.findById({ userId });
    console.log("Check User", user);
    return true;
  } catch (error) {
    return false;
  }
};

const userOnly = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Access Denied!. Users Only" });
  }
  next();
};

module.exports = { checkForAuthentication, userOnly };
