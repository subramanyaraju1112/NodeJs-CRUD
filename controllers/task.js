const Task = require("../models/task");

const createTask = async (req, res) => {
  const { taskName } = req.body;
  if (!taskName) {
    return res.status(400).json({ message: "Task name is required" });
  }
  try {
    const task = await Task.create({ taskName });
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    res.status(500).json({ message: "Error getting tasks", error });
  }
};

module.exports = { createTask, getAllTasks };
