let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName:  {
       type: String,
       default: ''
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    }
    
});
let userModel = new mongoose.model('User', schema);
module.exports = userModel;