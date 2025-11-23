const express = require("express");
const { connectDB } = require("./connection");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const adminRoutes = require("./routes/admin");
const {
  testMiddleware,
  testMiddleware2,
} = require("./middleware/testMiddleware");
const {
  checkForAuthentication,
  userOnly,
} = require("./middleware/authMiddleware");
require("dotenv").config();


const app = express();
const PORT = 3000;

connectDB("mongodb://localhost:27017/crud-data")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/tasks", checkForAuthentication, userOnly, taskRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
