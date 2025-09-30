const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity:{
                type: Number,
                required: true
            },
            priceAtPurchase: {   
                type: Number,
                required: true
            },
            subtotal: {          
                type: Number,
                required: true
            }
        
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },

     discount: {            
        type: Number,
        default: 0
    },

    finalAmount: {              
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["online" , "cod"],
        default: "cod"
    },

    status:{
        type: String,
        enum: ["pending", "shipped" , "in-transit" , "delivered"],
        default: "pending"
    },
    
    deliveryAddress: {     
        type: String,
        required: true
    },

    deliveryPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Order" , orderSchema);
