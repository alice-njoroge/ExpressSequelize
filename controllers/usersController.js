const db = require("../models");
const bcrypt = require('bcrypt');
const Joi = require('joi');

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
    db.users.findByPk(id, {attributes: ["name", "email", "createdAt"]})
        .then(user => {
            if(!user){
                return res.status(404).json({message:"not found"});
            }
            return res.json(user);
        })
        .catch(err => {
            return errHandler(err, res);
        });

};
const update = (req, res) => {
    const body = req.body;
    console.log(body);

    const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required()
    });
    const result = Joi.validate(body, schema);
    const {value, error} = result;
    const valid = error == null;

    if (!valid) {
        return res.status(400).json({message: "Bad request", error: error})
    }
    db.users.update(body,
        {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            db.users.findByPk(req.params.id, {attributes: ["name", "email", "createdAt"]})
                .then(user => {
                    if(!user){
                        return res.status(404).json({message:"not found"});
                    }
                    return res.json(user);
                })
        })
        .catch(err => errHandler(err, res))

};

module.exports = {
    index: index,
    create: create,
    show: show,
    update: update
};