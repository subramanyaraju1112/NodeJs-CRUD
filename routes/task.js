const express = require("express");
const router = express.Router();

const { createTask, getAllTasks } = require("../controllers/task");

router.route("/").post(createTask).get(getAllTasks);

module.exports = router;
