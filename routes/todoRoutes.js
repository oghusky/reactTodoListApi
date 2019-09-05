const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.get("/api", todoController.getTodo);
// post todos to db
router.post("/api", todoController.postTodo);
// shows new todo
router.get("/api/new", todoController.getNewTodo);
// get todo by ID
router.get("/api/:id", todoController.getTodoById);
// edit by ID
router.get("/api/:id/edit", todoController.editTodoByID);
// put route by ID
router.put("/api/:id", todoController.putsTodoByID);
// delete by ID
router.delete("/api/:id", todoController.deleteTodoByID);

module.exports = router;