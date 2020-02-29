module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define("users",

        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            token: DataTypes.STRING,

        });
    User.associate = (models) => {
        User.hasMany(models.todos, {foreignKey: "user_id", as: "tasks"});
    };
    return User;

};