'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
      Occupation: {
        allowNull: false,
        type: Sequelize.STRING
        
      },
      specialConsideration: {
        allowNull: false,
        type: Sequelize.STRING
        
      },
      race: {
        allowNull: false,
        type: Sequelize.STRING
        
      },
      Badgeno: {
        allowNull: false,
        type: Sequelize.STRING
        
      },
      email: {
        type: Sequelize.STRING
      },
      Rank: {
        type: Sequelize.STRING
      },
      drivinglicensestate: {
        type: Sequelize.STRING
      },
      drivinglicenseno: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      Birthdate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phonenumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      PoliceStationName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isPolice: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      Longitude: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Latitude: {
        allowNull: false,
        type: Sequelize.STRING
      },
      drivingLicense: {
        allowNull: false,
        type: Sequelize.STRING
      },
      handgunLicense: {
        allowNull: false,
        type: Sequelize.STRING
      },
     
      insurance: {
        allowNull: false,
        type: Sequelize.STRING
      },
     
      profileimage: {
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
    return queryInterface.dropTable('Users');
  }
};