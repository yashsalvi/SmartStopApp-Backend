const express = require('express');

const stoplogController = require('../controllers/stoplog.controller');
const userController = require('../controllers/user.controller');
const router = express.Router();
router.post('/stops', stoplogController.stops);

module.exports = router;
