'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false

      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token:{
        type: Sequelize.STRING
      },
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE,
    })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
