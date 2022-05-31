const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./userModle");

let cartSchema = new Schema(
    {
      
        email: {
            type: String,
            required: true,
            unique: true
        },
        Item:[{
            name: { type: String, required: true, minlength: 4, maxlength: 50 },
            description: { type: String, required: true },
            price: { type: Number, required: true },
            inStock: { type: Boolean, required: true },
            img: {type: String}
        }]
    }
);

module.exports = mongoose.model("add-to-cart", cartSchema);