const jwt = require("jsonwebtoken");
const config = require(__dirname + '/../config/config.json');

const auth = (req, res, next) => {

    let authHeader = req.header('Authorization');
    if (authHeader) {
        let token = authHeader.replace("Bearer ", "");
        try {
            const data = jwt.verify(token,config.secret_key);
            req.user_id = data.id;
            next();
        }
        catch (err){
            return  res.status(500).json({message:err.message});
        }

    }
   else {
        return res.status(401).json({message: "not logged in"});
    }
};

module.exports = auth;