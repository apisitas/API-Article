const Article = require("../models/article");
const asyncHanlder = require("express-async-handler");

const getTodos = asyncHanlder(async (req, res) => {
    res.status(200).json({ message: "Get todos" });
});

const setTodo = asyncHanlder(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add text field");
    }
    const query = await Article.create({
        text: req.body.text,
    });
    res.status(200).json(query);
});

const updateTodo = (req, res) => {
    res.status(200).json({ message: `Update todo ${req.params.id}` });
};

const deleteTodo = (req, res) => {
    res.status(200).json({ message: `Delete todo ${req.params.id}` });
};

module.exports = {
    getTodos,
    setTodo,
    updateTodo,
    deleteTodo,
};
