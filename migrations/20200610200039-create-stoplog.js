'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Stoplog', {
   
      firstname: {
        allowNull: false,
        type: Sequelize.STRING
        
      },
      middlename: {
        allowNull: false,
        type: Sequelize.STRING
        
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING
        
      },
     
      drivinglicensestate: {
        allowNull: false,
        type: Sequelize.STRING
        
      },
      Stoptime: {
        allowNull: false,
        type: Sequelize.DATETIME
        
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
        
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
     
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Stoplog');
  }
};