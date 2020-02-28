'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('todos',{
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      title:{
        type:Sequelize.STRING,
        allowNull:false
      },
      completed:{
        type:Sequelize.BOOLEAN,
        allowNull:false
      },
      user_id :{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"users",
          key:"id"
        }
      },
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE,

    })
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("todos");
  }
};
