const express = require("express");
const Todo = require("./models/TodoItem");
const db = require("./utils/config");
const mongoose = require("mongoose");
const log = console.log;
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;

mongoose.connect(db.connection, { useNewUrlParser: true }).then(response => {
    log("Connected to DB");
});

// points to static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// pull todos from db
app.get("/", (req, res) => {
    Todo.find({}, ((err, allTodos) => {
        try {
            return res.status(200).send(allTodos);
        }
        catch (err) {
            log(`Get route Error: ${err}`);
        }
    }))
});
// post todos to db
app.post("/", (req, res) => {
    let todotext = req.body.todotext;
    let newTodo = { todotext: todotext }
    Todo.create(newTodo, (err, newTodo) => {
        try {
            return res.status(201).send("Created");
        } catch (err) {
            log(`Post route Error: ${err}`);
        }
    })
});
// shows new todo
app.get("/new", (req, res) => {
    return res.status(200).send("New Todo");
})
// get todo by ID
app.get("/:id", (req, res) => {
    Todo.findById(req.params.id, (err, foundTodo) => {
        try {
            return res.status(200).send({ todo: foundTodo });
        } catch (err) {
            log(`Get By ID Route: ${err}`);
            return res.status(404).redirect(`back`);
        }
    })
})
// edit by ID
app.get("/:id/edit", (req, res) => {
    Todo.findById(req.params.id, (err, foundTodo) => {
        try {
            return res.status(200).send({ todo: foundTodo });
        } catch (err) {
            log(`Edit Route: ${err}`);
        }
    })
});
// put route by ID
app.put("/:id", (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, (err, updatedTodo) => {
        try {
            return res.status(200).redirect(`/${req.params.id}`);
        } catch (err) {
            log(`Put route: ${err}`);
        }
    })
});
// delete by ID
app.delete("/:id", (req, res) => {
    Todo.findOneAndDelete({ _id: req.params.id }, (err) => {
        try {
            log(req.params.id);
            res.redirect("/");
        } catch (err) {
            log(`Delete Route: ${err}`);
            res.redirect("/");
        }
    })
});

app.listen(PORT, () => {
    log(`Server Started on port ${PORT}`);
});