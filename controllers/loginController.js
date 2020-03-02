const db = require("../models");
const bcrypt = require('bcrypt');
const JWT= require("../helpers/jWTtokens");

const login = async (req, res, next) => {
    const {email, password} = req.body;
    if (email && password) {
        const user = await db.users.findOne({where: {email: email}});
        if (!user) {
            return res.status(401).json({message: "User not found!"})
        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                if (!result) {
                    return res.status(401).json({message: "wrong credentials"})
                }
                const token = JWT.generateJWT(user.email, user.id);
                return res.status(200).json({message: "welcome", token:token, user:user});

            })
        }

    } else {
        return res.status(400).json({message: "You need to provide email and password"})
    }

};
module.exports.login = login;