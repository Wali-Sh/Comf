let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
    
});
const userModel = new mongoose.model('User', schema);

module.exports = userModel
