module.exports = (sequelize, DataTypes) =>{
    const todo = sequelize.define("todos",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
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