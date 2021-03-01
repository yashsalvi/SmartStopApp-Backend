'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stoplog = sequelize.define('Stoplog', {
    firstname: DataTypes.STRING,
    middlename: DataTypes.STRING,
    lastname: DataTypes.STRING,
    drivinglicensestate: DataTypes.STRING,
    stoptime:DataTypes.STRING,
   
  
  }, {});
  Stoplog.associate = function(models) {
    // associations can be defined here
  };
  return Stoplog;
};