'use strict';

module.exports = (sequelize, DataTypes) => {
  const stopLog = sequelize.define('stopLog', {
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    drivingLicenseState: DataTypes.STRING,
    stopTime:DataTypes.STRING, 
  }, {});
  stopLog.associate = function(models) {
    // associations can be defined here
  };
  return stopLog;
};
