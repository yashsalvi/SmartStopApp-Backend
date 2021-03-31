const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
var haversine = require("haversine-distance");

//Sign up
function signUp(req, res){
    // Validation Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }     
    models.User.findOne({where:{email:req.body.email}}).then(result => {
        if(result){
            res.status(403).json({
                error:{
                message: "Email already exists!",
                }
            });
        }else{
          
            var is_police = false;
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                     if(req.body.password=="test210152"){
                        is_police = true;
                    }
                    const user = {
                        firstName: req.body.firstName,
                        middleName: req.body.middleName,
                        lastName: req.body.lastName,
                        Occupation: req.body.Occupation,
                        specialConsideration: req.body.specialConsideration,
                        email: req.body.email,
                        phoneNumber:req.body.phoneNumber,
                        drivingLicense:req.body.drivingLicense,
                        PolicestationName:req.body.PolicestationName,
                        Rank:req.body.Rank,
                        badgeNo:req.body.badgeNo,
                        Birthdate:req.body.Birthdate,
                        drivingLicenseState:req.body.drivingLicenseState,
                        drivingLicenseno:req.body. drivingLicenseno,
                        race:req.body.race,
                        isPolice : is_police,
                        password: hash        
                    }

                    models.User.create(user).then(result => {
                        const token = jwt.sign({
                            name: req.body.name,
                            phoneNumber:req.body.phoneNumber,
                            email: user.email,
                            userId: user.id
                       }, process.env.JWT_KEY, function(err, token){
                           res.status(200).json({
                               success:{    
                                userId: result.id,        
                                message: "User registered successfully",
                                token: token,
                                is_Police :is_police 
                               }
                           });
                       });
                               
                   }).catch(error => {
                       res.status(500).json({
                          
                           message: error,
                        
                       });
                   });
               });
           });
       }
   }).catch(error => {
       res.status(500).json({
           message: error,
       });
   });
}


//GPS

function latLong(req, res){

     var lat1= req.body.Latitude;
     var lng1= req.body.Longitude;
     var driverId = req.body.id;
    models.User.findOne({where:{id:driverId}}).then(driver_result => {
   if(driver_result.isPolice == false){

    if(driver_result){
            models.User.findOne(      
                { 
                  where: {id : req.body.id}
              
              }).then(function (record) {
                return record.update({Latitude:req.body.Latitude,Longitude:req.body.Longitude});
              
                }).then(function (record) {

                    models.User.findAll({where:{isPolice:1},  attributes: ['id','Latitude','Longitude']}).then(result => {
                        
                        const arr = [];
                        const id= [];
                        const distance = [];                     
                        result.forEach(element => { 
                           arr.push(element)        
                          }); 
                          arr.forEach(element=> {

                            var OfficerId= element.id
                            var lat2= element.Latitude
                            var lng2= element.Longitude
                            var point1 = {lat:lat1, lng:lng1}
                            var point2 = {lat:lat2, lng:lng2}
                            var haversine_m = haversine(point1, point2);   
                            console.log("distance (in meters): " + haversine_m + "m");                 
                            distance.push(
                                   haversine_m  
                             )                    
                            id.push(
                                OfficerId,
                             )                    

                          });
                          var distanceid;
                          var minValue = Math.min.apply(null, distance);
                          if(minValue < 100)
                          {             
                                     console.log(minValue);

                                     var a = distance.indexOf(minValue);

                                     for (let index = 0; index < id.length; index++) {
                                        if(index = a){                 
                                         distanceid = id[index]                            
                                         break;
                                        }
                          }
                          console.log(distanceid);

                          models.User.findOne({where:{id:distanceid}}).then(success => {
                                           if(success){                
                                            res.status(200).json({
                                               success:{
                                                    firstName:success.firstName,
                                                   middleName:success.middleName,
                                                   lastName:success.lastName,
                                                    id:success.id,
                                                    email:success.email
                                               }
                                              
                                            });
                                         

                                           }else{

                                            res.status(404).json({
                                                error:{
                                                message: "There are no such id.",
                                                }
                                            });
                                           
                                           }
                              
                                }).catch(error => {
                               res.status(404).json({
                              error:{
                               message: "There is no such information about the officer",
                                    }
                              });
                          });                        

                                     console.log(a);
                          }
                          
                          else{    
                                    res.status(404).json({
                                        error:{
                                        message: "There are no officer's nearby.",
                                        }
                                    });

                          }
                                     for (let index = 0; index < id.length; index++) {
                                                   if(index = a){
                                                    distanceid = id[index]
                                                    break;
                                                   }
                                                   
                                     }
                                          console.log(distanceid);
                         
                        }).catch(error => {
                        res.status(404).json({
                            error:{
                            message: " police officer doesn't exist",
                            }
                        });
                    });

              });

        }else{
            res.status(404).json({
                error:{
                message: "The user ID does not exist",
                }
            });

        }      
    }else{
            res.status(500).json({
                error:{
                message: "This is not a driver",
                }
            });

        }

    }).catch(error => {
        res.status(500).json({
            error:{
            message: "Invalid credentials",
            }
        });
        });

    
}


function updateInfo(req, res){

    models.User.findOne({where:{id:req.body.id,isPolice:false}}).then(result => {

        if(result){

            models.User.findOne(
                { 
                  where: {id:req.body.id}

              }).then(function (record) {                      
                return record.update({firstName:req.body.firstName,middleName:req.body.middleName,lastName:req.body.lastName,email:req.body.email,phoneNumber:req.body.phoneNumber,Rank:req.body.Rank});                    
                })
              .then(function (record) {    
                res.status(200).json({
                    success:{
                    message: "User info has been updated successfully ",
                    }
                });                                                         
                })

        }else{                           
            res.status(403).json({
                error:{
                message: "That's not a driver ",
                }
            });
        }
 


    }).catch(error => {
        res.status(404).json({
            error:{
            message: "UserId doesn't exist",
            }
        });
        });

}

//Login

function login(req, res){
    var DeviceId =req.body.DeviceId;

        models.User.findOne({where:{email: req.body.email}}).then(user => {
        console.log(user);
        if(user === null){
            res.status(401).json({
                message: "Invalids credentials!";  
            });
        }else{

                bcryptjs.compare(req.body.password, user.password, function(err, result,){
                    if(result){
                     
                        if(req.body.password == "test210152" ){         
                   models.User.findOne(
                    { 
                      where: {email : req.body.email}   
                  }).then(function (record) {
                    return record.update({DeviceId: req.body.DeviceId});
                  }).then(function (record) {
                   
                    res.status(200).json({
                          success:{        
                        message:"Device Id added !"
                          }
                      })
                    })                                          
                        const token = jwt.sign({
                            email: user.email,
                            userId: user.id                  
                        }, process.env.JWT_KEY, function(err, token){
                            res.status(200).json({
                                success:{
                                message: " Authentication successfull!",
                                userId: user.id,      
                                token: token,
                                is_Police : true
                                }
                            });
                        });
                    }else{
                                 
                        models.User.findOne({ 
                              where: {email : req.body.email}              
                          }).then(function (record) {
                            return record.update({DeviceId: req.body.DeviceId});
                          }).then(function (record) {                
                            res.status(200).json({
                                  success:{
                                message:"Device Id added !"
                                  }
                              })
                            })
                            const token = jwt.sign({
                            email: user.email,
                            userId: user.id
                        }, process.env.JWT_KEY, function(err, token){
                            res.status(200).json({
                                success:{   
                                message: " Authentication successfull!",
                                userId: user.id,
                                token: token,
                                is_Police : false
                                }
                            });
                        });
                    }
                    }
                 
                    else{                      
                        res.status(401).json({
                            error:{                             
                            message: "Invalid password!",
                            }
                        });
                    }
                });
            }

    }).catch(error => {
        res.status(403).json({
            message: "Invalid Credentials!",
        });
    });
}


//Reset password

 function reset(req,res){
    models.User.findOne({where:{email:req.body.email}}).then(result => {
        if(result){  
            var newPassword= req.body.newPassword;
             var confirmPassword =req.body.confirmPassword;
                    
            if(newPassword != confirmPassword){
                res.status(200).json({
                  error:{
                  "message":"Confirm password doesn't  match"
                  }
                  })
                
            }else{
                bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.newPassword, salt, function(err, hash){       
                models.User.findOne(              
                    { 
                     where: {email : req.body.email}
                            
                  }).then(function (record) {
                    return record.update({password: hash});
                  }).then(function (record) {
                   
                    res.status(200).json({
                          success:{            
                        "message":"Your Password has been changed successfully !"
                          }
                      })
                  });
                });                                                                          
                });                                                                                    
            }
            
        }else{
            res.status(404).json({
                error:{
                message: "The email does not exist",
                }
            });

        }
    }).catch(error => {
        res.status(403).json({
            error:{
            message: "Something went wrong!",
            }
        });
    });
    
}


function getInfo(req,res){
  
    const id = req.params.id;
    models.User.findByPk(id).then(success => {   
        if(success){       
            res.status(200).json({
                success:{
                    images:{ 
                    inurance:success.insurance,
                    drivinglicense:success.drivinglicense,
                    handgunlicense:success.handgunlicense
                    },
                    textdata:{
                     firstname:success.firstname,
                     middlename:success.middlename,
                     lastname:success.lastname,
                     email:success.email
                    }
                }
            });
           
        }else{
            res.status(404).json({
                error:{
                message: " There is no police officer with that email ID !! ",
                }
            });
        }

    }).catch(error => {
        res.status(403).json({
            error:{
            message: "Invalid credentials !",
            }
        });
    });

}
    
function latLongOfficer(req,res){
    models.User.findOne({where:{id:req.body.id,isPolice:true}}).then(result => {
                if(result){
                    models.User.findOne(
                        { 
                          where: {id:req.body.id}
                      }).then(function (record) {                      
                        return record.update({Latitude:req.body.Latitude,Longitude:req.body.Longitude});                    
                        })
                      .then(function (record) {    
                        res.status(200).json({
                            success:{
                            message: "Officer Lat and long has been updated successfully ",
                            }
                        });                                                         
                        })
                }else{                           
                    res.status(403).json({
                        error:{
                        message: "That's not an officer",
                        }
                    });
                }
        }).catch(error => {
            res.status(404).json({
                error:{
                message: "Id does not exist",
                }
            });
        });
}

module.exports = {
    signUp: signUp,
    login: login,
    latLongOfficer: latLongOfficer,
    getInfo: getInfo,
    updateInfo: updateInfo,
    latLong: latLong,
    reset:reset
} 
