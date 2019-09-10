const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.get("/", todoController.getTodo);
// post todos to db
router.post("/", todoController.postTodo);
// shows new todo
router.get("/new", todoController.getNewTodo);
// get todo by ID
router.get("/:id", todoController.getTodoById);
// edit by ID
router.get("/:id/edit", todoController.editTodoByID);
// put route by ID
router.put("/:id", todoController.putsTodoByID);
// delete by ID
router.delete("/:id", todoController.deleteTodoByID);

module.exports = router;