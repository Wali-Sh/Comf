const express = require('express');
const UserController = require('../controlers/userCont');
const productCont = require('../controlers/prodController');
const router = express.Router();

router.post('/login', UserController.findOne);
router.post('/register', UserController.create);
module.exports = router;