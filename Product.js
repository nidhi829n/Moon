const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },

    images:[ 
        {
        url: String,
        filename: String
    },
 ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    stock: {
        type: Number,
        default: 0
    },
    variants: [String]

},
{timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);