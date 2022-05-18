const express = require('express');
const UserController = require('../controlers/userCont');
const productCont = require('../controlers/prodController');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
module.exports = router;