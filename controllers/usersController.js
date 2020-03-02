const db = require("../models");
const bcrypt = require('bcrypt');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const JWT = require('../helpers/jWTtokens');

const errHandler = (err, res) => {
    res.status(500).json({message: "there is an error", error: err})
};

const index = async (req, res) => {
    try {
        const users = await db.users.findAll({attributes: ["name", "email", "createdAt"], include: "tasks"});
        return res.json(users);
    } catch (e) {
        return errHandler(e, res);
    }

};

const create = async (req, res) => {
    const body = req.body;

    const name = body.name;
    const email = body.email;
    const password = body.password;

    const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    const newPass = passwordComplexity().validate(password);
    if (newPass.error) {
        return res.status(400).json({message: "Bad request", error: newPass.error})
    }
    const hash = bcrypt.hashSync(password, 10);

    const result = Joi.validate(body, schema);
    const valid = result.error == null;
    if (!valid) {
        return res.status(400).json({message: "Bad request", error: result.error})
    }
    try {
        const mailExists = await db.users.findOne({
            where: {
                email: email
            }
        });
        if (mailExists) {
            return res.status(400).json({message: "that Email exists already"})
        }
    } catch (e) {
        return errHandler(e, res);
    }


    try {
        const user = await db.users.create({name: name, email: email, password: hash});
        const token = JWT.generateJWT(user.email, user.id);
        return res.status(201).json({name: user.name, email: user.email, createdAt: user.createdAt, token: token});
    } catch (e) {
        return errHandler(e, res);
    }


};
const show = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await db.users.findByPk(id, {attributes: ["name", "email", "createdAt"]});
        if (!user) {
            return res.status(404).json({message: "not found"});
        }
        return res.json(user);
    } catch {
        return errHandler(err, res);
    }
};
const update = async (req, res) => {
    const body = req.body;

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
    try {
        await db.users.update(body, {where: {id: req.params.id}});

        const user = await db.users.findByPk(req.params.id, {attributes: ["name", "email", "createdAt"]});
        if (!user) {
            return res.status(404).json({message: "not found"});
        }
        return res.json(user);
    } catch (e) {
        return errHandler(e, res)
    }

};
const destroy = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await db.users.findByPk(id);
        if (!user) {
            return res.status(404).json({message: "not found"})
        }


        await db.users.destroy({
            where: {id: id}
        });
        return res.json({message: "deleted successfully"})
    } catch (e) {
        return errHandler(e, res);
    }

};

const profile = async (req, res) => {
    const user_id = req.user_id;
    try {
        const user = await db.users.findByPk(user_id, {attributes:["name","id", "email"]});
        return res.json(user);
    } catch (e) {
        return errHandler(e, res);
    }
};
module.exports = {
    index: index,
    create: create,
    show: show,
    update: update,
    destroy: destroy,
    profile: profile
};