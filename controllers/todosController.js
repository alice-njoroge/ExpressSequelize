const db = require("../models");

const index = (req,res)=>{
 db.todos.findAll().then((todos)=>{
     res.json(todos);
 });
};
module.exports.index = index;