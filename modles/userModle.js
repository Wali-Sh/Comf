let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        default: ''
    },
    password: {
        type: String,
        required:true
    },
    confirmPassword: {
        type: String,
        required: true
    }
    
});
const userModel = new mongoose.model('User', schema);
module.exports = userModel;