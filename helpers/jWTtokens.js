const jwt = require('jsonwebtoken');
const config = require(__dirname + '/../config/config.json');

const generateJWT = (email, user_id)=>{
    return jwt.sign({
        email:email,
        id:user_id,
        exp:86400
    },config.secret_key);
};

module.exports ={
    generateJWT:generateJWT
};