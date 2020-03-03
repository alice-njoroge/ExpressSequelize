const db = require("../models");
const bcrypt = require('bcrypt');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const JWT = require('../helpers/jWTtokens');
const nodemailer = require("nodemailer");
const config = require(__dirname + '/../config/config.json');
const crypto = require('crypto');
const resetPassHtml = require('../emails/resetPass');


const errHandler = (err, res) => {
    res.status(500).json({message: "there is an error", error: err})
};

const index = async (req, res) => {
    try {
        const users = await db.users.findAll({attributes: {exclude: ['password']}, include: "tasks"});
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
        const user = await db.users.findByPk(user_id, {attributes: ["name", "id", "email"]});
        return res.json(user);
    } catch (e) {
        return errHandler(e, res);
    }
};

const resetPassword = async (req, res) => {
    let mail = req.body.email;
    if (!mail) {
        return res.status(400).json({message: "the email must be provided"})
    }
    const mailExists = await db.users.findOne({
        where: {
            email: mail
        }
    });
    if (!mailExists) {
        return res.status(404).json({message: "a user with such a mail seems to be non existent"})
    }
    const token =  await generateToken();
    try{
        await db.passwordResets.create({email:mail,tokenHash:token })
        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: config.email.user,
                pass: config.email.pass
            }

        });

        transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: mail, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Please click the link below to change your password ", // plain text body
            html: resetPassHtml()


        }).then(info => {
            console.log("Message sent: %s", info.messageId);
        });

        return res.json({message: "mail sent"});


    }catch (e) {
        return errHandler(e, res);
    }

};

async function generateToken() {
   const token = crypto.randomBytes(52).toString('hex');
    while (await db.passwordResets.findOne({where: {tokenHash: token}})){
        await generateToken();
    }
    return token;
}

module.exports = {
    index: index,
    create: create,
    show: show,
    update: update,
    destroy: destroy,
    profile: profile,
    resetPassword: resetPassword
};