const express = require("express");
const { connectDB } = require("./connection");
const taskRoutes = require("./routes/task");

const app = express();
const PORT = 3000;

connectDB("mongodb://localhost:27017/crud-data")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.use(express.urlencoded({ extended: false }));

app.use("/api/task", taskRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
