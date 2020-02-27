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
            return res.status(500).json({message: "there was an error", error: err})
        });

};

const show = (req, res) => {
    const task_id = req.params.id;
    db.todos.findByPk(task_id)
        .then(task => {
            if (!task) {
                return res.status(404).json({message: "task not available"});
            }
            return res.json(task);

        })
        .catch((err) => {
            return res.status(500).json({message: "there was an error", error: err})
        });


};
const update = (req, res) => {
    const task_id = req.params.id;
    const title = req.body.title;
    const completed = req.body.completed;

    db.todos.update({
            title: title,
            completed: completed
        },
        {
            where: {id: task_id},
        })
        .then(() => {
            db.todos.findByPk(task_id)
                .then(task => {
                    if (!task) {
                        return res.status(404).json({message: "task not available"});
                    }
                    return res.json(task)
                })
        })
        .catch((err) => {
            return res.status(500).json({message: "there was an error", error: err})
        });


};

const destroy = (req, res) => {

};

module.exports = {
    index: index,
    create: create,
    show: show,
    update: update,
    destroy: destroy

};
