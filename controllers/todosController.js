const db = require("../models");

const index = (req, res) => {
    db.todos.findAll().then((todos) => {
        return res.json(todos);
    });
};

const create = (req, res) => {
    const title = req.body.title;
    db.todos.create({title: title, completed: false})
        .then((todo) => {
            return res.status(201).json(todo);
        })
        .catch((err) => {
            return res.status(500).json({message: "there was an error", error : err})
        });

};

module.exports = {
    index: index,
    create: create
};
