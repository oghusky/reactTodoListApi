const Todo = require("../models/TodoItem");
const log = console.log;
exports.getTodo = async (req, res) => {
    await Todo.find({}, ((err, allTodos) => {
        try {
            return res.status(200).send(allTodos);
        }
        catch (err) {
            log(`Get route Error: ${err}`);
        }
    }))
}
exports.postTodo = async (req, res) => {
    let todotext = req.body.todotext;
    let details = req.body.details;
    let isComplete = req.body.isComplete;
    let newTodo = { todotext: todotext, details: details, isComplete: isComplete }
    await Todo.create(newTodo, (err, newTodo) => {
        try {
            return res.status(201).send("Created");
        } catch (err) {
            log(`Post route Error: ${err}`);
        }
    })
}
exports.getNewTodo = async (req, res) => {
    return res.status(200).send("New Todo");
}
exports.getTodoById = async (req, res) => {
    await Todo.findById(req.params.id, (err, foundTodo) => {
        try {
            return res.status(200).send({ todo: foundTodo });
        } catch (err) {
            log(`Get By ID Route: ${err}`);
            return res.status(404).redirect(`back`);
        }
    })
}
exports.editTodoByID = async (req, res) => {
    await Todo.findById(req.params.id, (err, foundTodo) => {
        try {
            return res.status(200).send({ todo: foundTodo });
        } catch (err) {
            log(`Edit Route: ${err}`);
        }
    })
}
exports.putsTodoByID = async (req, res) => {
    await Todo.findByIdAndUpdate(req.params.id,
        {
            todotext: req.body.todotext,
            isComplete: req.body.isComplete
        },
        (err, updatedTodo) => {
            try {
                return res.status(200).send({ updatedTodo });
            } catch (err) {
                log(`Put route: ${err}`);
            }
        })
}
exports.deleteTodoByID = async (req, res) => {
    await Todo.findOneAndDelete({ _id: req.params.id }, (err) => {
        try {
            res.redirect("/");
        } catch (err) {
            log(`Delete Route: ${err}`);
            res.redirect("/");
        }
    })
}