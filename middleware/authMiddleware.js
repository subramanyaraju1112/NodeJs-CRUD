const generateToken = require("../utils/generateToken");

const checkForAuthentication = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  req.user = null;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    return next();
  }
  const token = authorizationHeader.split("Bearer ")[1];
  const user = generateToken(token);
  req.user = user;
  return next();
};

module.exports = checkForAuthentication;
