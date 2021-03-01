'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    middlename: DataTypes.STRING,
    lastname: DataTypes.STRING,
    Occupation:DataTypes.STRING,
    drivinglicensestate:DataTypes.STRING,
    specialConsideration:DataTypes.STRING,
    Birthdate:DataTypes.STRING,
    drivinglicenseno:DataTypes.STRING,
    race:DataTypes.STRING,
    Badgeno:DataTypes.STRING,
    drivinglicense:DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    insurance: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    handgunlicense:DataTypes.STRING,
    PoliceStationName: DataTypes.STRING,
    Rank: DataTypes.STRING,
    profileimage: DataTypes.STRING,
    Latitude: DataTypes.STRING,
    Longitude: DataTypes.STRING,
    isPolice: DataTypes.BOOLEAN
  
  }, {});
  User.associate = function(models) {
   
  };
  return User;
};