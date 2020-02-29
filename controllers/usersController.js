const db = require("../models");
const bcrypt = require('bcrypt');

const errHandler = (err, res) => {
    res.status(500).json({message: "there is an error", error: err})
};

const index = (req, res) => {
    db.users.findAll({attributes: ["name", "email", "createdAt"]})
        .then(users => {
            res.json(users);
        }).catch(err => {
        return errHandler(err, res);
    })
};
const create = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    let hash = bcrypt.hashSync(password, 10);

    db.users.create({name: name, email: email, password: hash})
        .then(user => {
            return res.status(201).json({name: user.name, email: user.email, createdAt: user.createdAt});
        }).catch(err => {
        return errHandler(err, res);
    });

};
const show = (req, res) => {
   const id = req.params.id;
    db.users.findByPk(id,{attributes: ["name", "email", "createdAt"] })
        .then(user => {
            return res.json(user);
        })
        .catch(err => {
            return errHandler(err, res);
        });

};


module.exports = {
    index: index,
    create: create,
    show:show
};