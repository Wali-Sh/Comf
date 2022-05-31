const { date } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let feedbackSchems = new Schema(
    {
       experience: {
        type: String,
        required: true,
       },
       name: {
           type: String,
           required: true,
       },
       email: {
           type: String,
           required: true,
       },
       massage: {
           type: String,
           require: true,
           minlength: 10,
           maxlength: 100
       },
       date: {
           type: Date,
           required: true,
           default: Date.now()
       }

    }  
);

module.exports = mongoose.model("users-feedbacks", feedbackSchems);