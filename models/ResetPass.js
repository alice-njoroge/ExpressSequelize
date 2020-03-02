module.exports = (sequelize, DataTypes)=>{
    const passReset = sequelize.define("passwordResets",{
        tokenHash:DataTypes.STRING,
        generatedAt:DataTypes.INTEGER,
        email:DataTypes.STRING

    });
    return passReset;

};
