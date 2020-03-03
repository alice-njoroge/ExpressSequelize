module.exports = (sequelize, DataTypes)=>{
    const passReset = sequelize.define("passwordResets",{
        tokenHash:DataTypes.STRING,
        email:DataTypes.STRING

    });
    return passReset;

};
