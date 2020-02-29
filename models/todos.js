module.exports = (sequelize, DataTypes) =>{
    const todo = sequelize.define("todos",{
        title:DataTypes.STRING,
        completed:DataTypes.BOOLEAN,
        user_id:DataTypes.INTEGER

    });
    todo.associate = (models) => {
        todo.belongsTo(models.users, {foreignKey: "user_id",as:'user'} );
    };
    return todo;
};