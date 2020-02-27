'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('todos',{
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
        type:DataTypes.BOOLEAN,
        allowNull:false
      },
      createdAt:DataTypes.DATE,
      updatedAt:DataTypes.DATE,

    })
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("todos");
  }
};
