const express = require("express");
const router = express.Router();

const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task");

router.route("/").post(createTask).get(getAllTasks);
router.route("/:id").patch(updateTask).delete(deleteTask);

module.exports = router;
