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
 * @description : This route is used to login the user
 * @requires :  {
    "email" : "",
    "password" : ""
    }
 */
router.post('/login',[body('email').isEmail()], userController.login);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to handle the status of whatsapp message status
 * @requires : status : [ accepted, queued, failed, sending, sent, receiving, received, delivered, undelivered ]
 */
router.post('/latLong',[body('id').not().isEmpty()], userController.latLong);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to handle the status of whatsapp message status
 * @requires : status : [ accepted, queued, failed, sending, sent, receiving, received, delivered, undelivered ]
 */
router.post('/latLongOfficer',[body('id').not().isEmpty()], userController.latLongOfficer);

/**
 * @type : GET
 * @access : -user<Bearer token>
 * @description : This route is used to handle the status of whatsapp message status
 * @requires : status : [ accepted, queued, failed, sending, sent, receiving, received, delivered, undelivered]
 */
router.get('/getInfo/:id',checkAuth.checkAuth,userController.getInfo);

/**
 * @type : PUT
 * @access : --user<Bearer token>
 * @description : This route is used to handle the status of whatsapp message status
 * @requires : id<params>
 */
router.put('/reset', [body('password').not().isEmpty()],checkAuth.checkAuth, userController.reset);

/**
 * @type : POST
 * @access : -user<Bearer token>
 * @description : This route is used to handle the status of whatsapp message status
 * @requires : status : [ accepted, queued, failed, sending, sent, receiving, received, delivered, undelivered]
 */
router.post('/updateInfo', checkAuth.checkAuth,userController.updateInfo);



module.exports = router;
