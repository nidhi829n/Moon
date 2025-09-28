const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    paymentId: String,
    amount: {
        type: Number,
        required: true,
    },
    method: {
        type: String,
        enum: ["paypal", "cod", "razorpay"],
        default: "cod",
    },

    status:{
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },

},
{timestamps: true}
);

module.exports = mongoose.model("Payment", paymentSchema);