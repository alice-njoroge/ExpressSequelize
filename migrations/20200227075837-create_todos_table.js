'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('todos',{
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
