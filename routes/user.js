const express = require('express');
const userController = require('../controllers/user.controller');
const checkAuth = require('../middleware/check-auth');
const { check, body } = require('express-validator');

const router = express.Router();


/**
 * @type : POST
 * @access : -
 * @description : This route is used to register the user
 * @requires : * {
    "email" : "",
    "password" : ""
 */
router.post('/signUp',[body('email').isEmail(), body('password').not().isEmpty()], userController.signUp);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to Login
 * @requires :  {
    "email" : "",
    "password" : ""
    }
 */
router.post('/login',[body('email').isEmail()], userController.login);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to  add the Latitude and Longitude of the User
 * @requires : status :  {
    "id" : "",
      "Latitude" : "",
        "Longitude" : "",
    }
 */
router.post('/latLong',[body('id').not().isEmpty()] , userController.latLong);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to add the Latitude and Longitude of the Officer
 * @requires : status : {
    "id" : "",
      "Latitude" : "",
        "Longitude" : "",
    }
 */
router.post('/latLongOfficer',[body('id').not().isEmpty()], userController.latLongOfficer);

/**
 * @type : GET
 * @access : -user<Bearer token>
 * @description : This route is used to get the info about the User.
 * @requires :  id<params> 
 */
router.get('/getInfo/:id',checkAuth.checkAuth,userController.getInfo);

/**
 * @type : PUT
 * @access : --user<Bearer token>
 * @description : This route is used to reset the password of a User.
 * @requires :  {
    "password" : "",
    }
 */
router.put('/reset', [body('password').not().isEmpty()],checkAuth.checkAuth, userController.reset);

/**
 * @type : POST
 * @access : -user<Bearer token>
 * @description : This route is used to update the Information of the User
 * @requires : Any field related to the user
 */
router.post('/updateInfo', checkAuth.checkAuth,userController.updateInfo);



module.exports = router;
