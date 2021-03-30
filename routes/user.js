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
router.post('/sign-up',[body('email').isEmail(), body('password').not().isEmpty()], userController.signUp);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to login the user
 * @requires : * @requires : * {
    "email" : "",
    "password" : ""
 */
router.post('/login',[body('email').isEmail()], userController.login);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to handle the status of whatsapp message status
 * @requires : status : [ accepted, queued, failed, sending, sent, receiving, received, delivered, undelivered ]
 */
router.post('/Latlong',[body('id').not().isEmpty()], userController.Latlong);

/**
 * @type : POST
 * @access : -
 * @description : This route is used to handle the status of whatsapp message status
 * @requires : status : [ accepted, queued, failed, sending, sent, receiving, received, delivered, undelivered ]
 */
router.post('/latlongOfficer',[body('id').not().isEmpty()], userController.latlongOfficer);

/**
 * @type : GET
 * @access : -user<Bearer token>
 * @description : This route is used to handle the status of whatsapp message status
 * @requires : status : [ accepted, queued, failed, sending, sent, receiving, received, delivered, undelivered]
 */
router.get('/getinfo/:id',checkAuth.checkAuth,userController.getinfo);

/**
 * @type : PUT
 * @access : --user<Bearer token>
 * @description : This route is used to handle the status of whatsapp message status
 * @requires : status : [ accepted, queued, failed, sending, sent, receiving, received, delivered, undelivered ]
 */
router.put('/reset', [body('password').not().isEmpty()],checkAuth.checkAuth, userController.reset);

/**
 * @type : POST
 * @access : -user<Bearer token>
 * @description : This route is used to handle the status of whatsapp message status
 * @requires : status : [ accepted, queued, failed, sending, sent, receiving, received, delivered, undelivered]
 */
router.post('/updateinfo', checkAuth.checkAuth,userController.updateinfo);



module.exports = router;
