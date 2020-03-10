const db = require("../models");

const index = (req, res) => {
    db.todos.findAll({
        where: {
            user_id: req.user_id
        },
        include: "user"
    }).then((todos) => {
        return res.json(todos);
    });
};

const create = (req, res) => {
    const title = req.body.title;
    const user_id = req.body.user_id;
    db.todos.create({title: title, completed: false, user_id: user_id})
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
            if (task.user_id !== req.user_id) {
                return res.status(403).json({message: "forbidden"});
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
    const id = req.params.id;

    db.todos.findByPk(id)
        .then(task => {
            if (!task) {
                return res.status(404).json({message: "task not available"});
            }
            db.todos.destroy({where: {id: id}})
                .then(() => {
                    return res.status(200).json({message: "task deleted successfully!"})
                })
        })
        .catch((err) => {
            return res.status(500).json({message: "there was an error", error: err})
        });

};

module.exports = {
    index: index,
    create: create,
    show: show,
    update: update,
    destroy: destroy

};
