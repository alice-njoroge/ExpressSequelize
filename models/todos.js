module.exports = (sequelize, DataTypes) =>{
    const todo = sequelize.define("todos",{
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        completed:{
            type:DataTypes.BOOLEAN

        }
    });
    return todo;
};