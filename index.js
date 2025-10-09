const express = require("express");
const { connectDB } = require("./connection");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const adminRoutes = require("./routes/admin");

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

app.use("/api/task", taskRoutes);
app.use("/auth", userRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
