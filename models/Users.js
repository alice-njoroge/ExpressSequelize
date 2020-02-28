module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define("users", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        token: DataTypes.STRING
    });
    return User;

};