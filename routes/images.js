const express = require('express');
const userController = require('../controllers/user.controller');
const imageController = require('../controllers/image.controller');
const imageUploader = require('../helpers/image-uploader');


const router = express.Router();

/**
 * @type : POST
 * @access : -
 * @description : This route is used to upload the Images
 * @requires : id<params>
 */
router.post('/upload/:id', imageUploader.upload.fields([{
    name: 'drivingLicense', maxCount: 1
  }, {
    name: 'handgunLicense', maxCount: 1
  }, {
    name: 'insurance', maxCount: 1
  },{
    name: 'profileimage', maxCount: 1
  }]),imageController.upload);
module.exports = router;


// module.exports = router;


