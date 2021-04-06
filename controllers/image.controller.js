const models = require('../models');
function upload(req, res){
  const id = req.params.id;
  if(req.method == 'POST'){
    if(req.files.drivingLicense || req.files.handgunLicense || req.files.insurance || req.files.profileImage)
    {
      let handgun = true;
      if(req.files.handgunLicense)
        handgun = true;
      else
        handgun = false;
      const drivingLicense = 'http://localhost:8086/uploads/' + req.files.drivingLicense[0].filename;
      const profileImage = 'http://localhost:8086/uploads/' + req.files.profileImage[0].filename;
      const insurance = 'http://localhost:8086/uploads/' + req.files.insurance[0].filename;
      let handgunLicense = null;
      if(handgun)
      {
        handgunLicense = 'http://localhost:8086/uploads/' + req.files.handgunLicense[0].filename;
      }
      models.User.findByPk(id)
      .then(result => {
        if(result){
          if(result.isPolice == false){
              res.status(200).json({
                        success:
                          {        
                            message:"Image uploaded and stored successfully!",
                            handgunLicense,                
                            drivingLicense,                
                            insurance
                          }
                  });
          models.User.findOne({ where: {id : req.params.id}})
          .then(function (record) {
              return record.update({handgunLicense:(handgun?handgunLicense:"NULL"),drivingLicense:drivingLicense,insurance:insurance});
            });
          }
        else{

          res.status(200).json({
            success:
              {        
                message:"Image uploaded and stored successfully!",
                profileimage,
              }
      });

          models.User.findOne({ where: {id : req.params.id}})
          .then(function (record) {
              return record.update({ profileimage:profileimage });
            });

          }
        }
      })
      .catch(error => {
        res.status(500).json({
          error:{
            message: "There is no such id",
          }
        });
      });
    }
    else{
      res.status(500).json({
        error:{
        message: "Please insert images"
        }
      })
    }
  }
  else{
    res.status(500).json({
      error:{
      message: "Error in uploading images"
      }
    })
  }
}

module.exports = {
    upload:upload,
    
}















































