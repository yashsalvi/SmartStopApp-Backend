// const fs = require("fs");
const models = require('../models');
function upload(req, res){
  const id = req.params.id;
  if(req.method == 'POST'){
    if(req.files.drivingLicense || req.files.handgunLicense || req.files.insurance || req.files.profileimage)
    {
      let handgun = true;
      if(req.files.handgunLicense)
        handgun = true;
      else
        handgun = false;

      const drivingLicense = 'http://localhost:8086/uploads/' + req.files.drivingLicense[0].filename;
      const profileimage = 'http://localhost:8086/uploads/' + req.files.profileimage[0].filename;
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
              return record.update({handgunlicense:(handgun?handgunLicense:"NULL"),drivinglicense:drivingLicense,insurance:insurance});
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

            // res.status(500).json({
            //   message: "Invalid credentials"
            // })
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


// function updatedocs(req,res){
//   const id = req.params.id;
//   if(req.method == 'POST'){
//     if(req.files.drivingLicense || req.files.handgunLicense || req.files.insurance)
//     {
//       let handgun = true;
//       if(req.files.handgunLicense)
//         handgun = true;
//       else
//         handgun = false;

//       const drivingLicense = 'http://localhost:8086/uploads/' + req.files.drivingLicense[0].filename;
//       const insurance = 'http://localhost:8086/uploads/' + req.files.insurance[0].filename;
//       let handgunLicense = null;
//       if(handgun)
//       {
//         handgunLicense = 'http://localhost:8086/uploads/' + req.files.handgunLicense[0].filename;
//       }
//       models.User.findByPk(id)
//       .then(result => {
//         if(result){
//           if(result.isPolice == false){
//               res.status(200).json({
//                         success:
//                           {        
//                             message:"Image uploaded and stored successfully!",
//                             handgunLicense,                
//                             drivingLicense,                
//                             insurance
//                           }
//                   });
//           models.User.findOne({ where: {id : req.params.id}})
//           .then(function (record) {
//               return record.update({handgunlicense:(handgun?handgunLicense:"NULL"),drivinglicense:drivingLicense,insurance:insurance});
//             });
//           }
//         else{
//             res.status(500).json({
//               message: "Invalid credentials"
//             })
//           }
//         }
//       })
//       .catch(error => {
//         res.status(500).json({
//             message: "There is no such id",
//         });
//       });
//     }
//     else{
//       res.status(500).json({
//         message: "Please insert images"
//       })
//     }
//   }
//   else{
//     res.status(500).json({
//       message: "Error in uploading images"
//     })
//   }



// }



module.exports = {
    upload:upload,
    // updatedocs:updatedocs
    
}














































// // const { values } = require("sequelize/types/lib/operators");



// function upload(req, res){

// const id = req.params.id;

//   if(req.method == 'POST'){

  
//   const urls= [];
  
//   req.files.forEach((e) => {
//      urls.push('http://localhost:8086/uploads/' + e.filename);
//          });
//     if(urls.length > 0){

//     models.User.findByPk(id).then(result => {
//     if(result){
//       if(result.isPolice == false){
       
//          res.status(200).json({
//               success:
//                 {                              
//                   message:"Image uploaded and stored successfully !!",
//                   handgunlicense:urls[0] ,                
//                   drivinglicense:urls[1] ,                
//                   insurance:urls[2] ,         
//                 }
              
//          });

//          count = 0
//          urls.forEach(element => {
//           if(count == 0){
//             handgunlicense = element

//           }else if(count == 1){
           
//             drivinglicense= element
             
//           }else{
//             insurance = element
//           }

//           count++;
//          });
//          models.User.findOne(
               
//           { 
//             where: {id : req.params.id}
        
//         })
//         .then(function (record) {
//           return record.update({handgunlicense:handgunlicense,drivinglicense:drivinglicense,insurance:insurance});
      
//          });
     
//         }else{
            
//                 res.status(200).json({
//                    success:
//                  {        
//                   message:"Image uploaded and stored successfully !!",
//                    profileimage: urls
//                  }
     
//              });

//              profileimage = urls[0]
//              console.log(profileimage)

//              models.User.findOne(
               
//               { 
//                 where: {id : req.params.id}
            
//             })
//             .then(function (record) {
//               return record.update({profileimage:profileimage});
          
//              });
         

//         }

//     }else{


//       res.status(500).json({
//         error:{
//         message: "Invalid credentials",
//         }
//     });
        

//       }

//         }).catch(error => {
//           res.status(500).json({
             
//               message: "There is no such id",
           
//           });
//       });
//         }else{
//           res.status(500).json({
//             error:{
//               mesaage: "Please insert images!"
//           }
//           });

//         }

//    }
  
//   else{
//     res.status(500).json({
//             error:{
//               mesaage: "Error uploading image!"
//           }
//           });
//   }
  
// }

// module.exports = {
//     upload: upload
// }





// const db = require("../models");

// const Image = db.users;



// function upload(req, res){
//   if(req.method == 'POST'){
//     //${result.path}
//   var urls= [];

//   var fileKeys = Object.values(req.files);
 
    
//   fileKeys.forEach((key)=>{
//   // var result =`${req.files[key.path]}`
  
     
// urls.push('http://localhost:8086/uploads/' + key.filename );

//     //  urls.push(result);
  
       
//     });


  


  
//     if(urls.length > 0){
//     res.status(201).json({
//               success:
//                 {                  
//                   message:"Image uploaded and stored successfully !!",
//                   data:urls          
//                 }
              
//          });
//         }else{
//           res.status(500).json({
//             error:{
//               mesaage: "Please insert images!"
//           }
//           });


//         }
    
  


//   }else{
//     res.status(500).json({
//             error:{
//               mesaage: "Error uploading image!"
//           }
//           });

//   }
  
// }

// module.exports = {
//     upload: upload
// }