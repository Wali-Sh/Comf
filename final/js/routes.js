const express = require('express');
const UserController = require('./userCont');
const productCont = require('./prodController');
const router = express.Router();

router.post('/login', UserController.findOne);
router.post('/register', UserController.create);
module.exports = router;