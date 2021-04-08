'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Stoplog', {
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
        
      },
      middleName: {
        allowNull: false,
        type: Sequelize.STRING
        
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
        
      },
     
      drivingLicenseState: {
        allowNull: false,
        type: Sequelize.STRING
        
      },
      stopTime: {
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
