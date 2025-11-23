const Task = require("../models/task");

const createTask = async (req, res) => {
  const { taskName } = req.body;
  if (!taskName) {
    return res.status(400).json({ message: "Task name is required" });
  }
  try {
    const task = await Task.create({ taskName, userId: req.user.id });
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    if (tasks.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res
      .status(200)
      .json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting tasks", error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskName } = req.body;
    const tasks = await Task.findByIdAndUpdate(
      { _id: id, userId: req.user.id },
      { taskName },
      { new: true }
    );
    console.log("Tasks", tasks);
    if (!tasks) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Task updated successfully", updatedTask: tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Updating Task", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Task deleted successfully", deletedTask: task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Deleting Task", error: error.message });
  }
};

module.exports = { createTask, getAllTasks, updateTask, deleteTask };
