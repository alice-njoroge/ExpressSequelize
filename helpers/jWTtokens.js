const jwt = require('jsonwebtoken');
const config = require(__dirname + '/../config/config.json');

const generateJWT = (email, user_id)=>{
    return jwt.sign({
        email:email,
        id:user_id
    },config.secret_key, {expiresIn: config.tokenLife});
};

module.exports ={
    generateJWT:generateJWT
};