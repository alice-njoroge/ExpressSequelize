module.exports = (sequelize, DataTypes) =>{
    const todo = sequelize.define("todos",{
        title:DataTypes.STRING,
        completed:DataTypes.BOOLEAN,
        user_id:DataTypes.INTEGER
    });
    return todo;
};