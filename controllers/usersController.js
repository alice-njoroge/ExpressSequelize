const db = require("../models");

const index = (req, res) => {
    db.users.findAll()
        .then(users => {
            res.json(users);
        }).catch(err =>{
            res.status(500).json({message: "there is an error", error:err})
    })
};

module.exports = {
    index: index
};