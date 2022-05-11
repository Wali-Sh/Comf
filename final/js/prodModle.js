let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
    
});
const prodModel = new mongoose.model('products', schema);
module.exports = prodModel;