'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    Occupation:DataTypes.STRING,
    drivingLicenseState:DataTypes.STRING,
    specialConsideration:DataTypes.STRING,
    Birthdate:DataTypes.STRING,
    drivingLicenseno:DataTypes.STRING,
    race:DataTypes.STRING,
    badgeNo:DataTypes.STRING,
    drivingLicense:DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    insurance: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    handgunLicense:DataTypes.STRING,
    policeStationName: DataTypes.STRING,
    Rank: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    Latitude: DataTypes.STRING,
    Longitude: DataTypes.STRING,
    isPolice: DataTypes.BOOLEAN
  }, {});
  
  User.associate = function(models) {
  };
  return User;
};
