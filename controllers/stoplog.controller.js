const models = require('../models');

function stops(req, res){
    const stoplog = {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        drivinglicensestate:req.body.drivinglicensestate,
        stoptime:req.body.stoptime
    }
    models.Stoplog.create(stoplog).then(result => {
        res.status(201).json({
            message: "User added to the stopLog successfully",        
        });
    }).catch(error => {
        res.status(500).json({
            error:{
            message: "Invalid credentials",
            }
        });
    });
}

module.exports = {
    stops: stops,  
}
