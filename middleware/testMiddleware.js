const testMiddleware = (req, res, next) => {
  console.log("MIDDLEWARE", req.body);
  return res.status(200).json({
    message: "No Authentication, Fuck off!"
  })
};

const testMiddleware2 = (req, res, next) => {
    console.log("MIDDLEWARE 2 ", req.body);
    next();
  };

module.exports = { testMiddleware, testMiddleware2 };
