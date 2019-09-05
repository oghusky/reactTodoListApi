const mongoose = require("mongoose");

const todoItem = new mongoose.Schema({
    todotext: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: false
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});
module.exports = mongoose.model("Todo", todoItem);