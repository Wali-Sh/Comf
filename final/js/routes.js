const express = require('express');
const UserController = require('./userCont');
const router = express.Router();
//router.get('/:id', UserController.findOne);
router.post('/login', UserController.findOne);
router.post('/register', UserController.create);
module.exports = router;