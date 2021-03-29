const express = require('express');
const userController = require('../controllers/user.controller');
const checkAuth = require('../middleware/check-auth');
const { check, body } = require('express-validator');

const router = express.Router();

router.post('/sign-up',[body('email').isEmail(), body('password').not().isEmpty()], userController.signUp);
router.post('/login',[body('email').isEmail()], userController.login);
router.post('/Latlong',[body('id').not().isEmpty()], userController.Latlong);
router.post('/latlongOfficer',[body('id').not().isEmpty()], userController.latlongOfficer);
router.get('/getinfo/:id',checkAuth.checkAuth,userController.getinfo);
router.put('/reset', [body('password').not().isEmpty()], userController.reset);
router.post('/updateinfo', userController.updateinfo);



module.exports = router;
