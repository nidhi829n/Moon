const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },

    role: {
        type: String,
        enum: ["customer", "admin", "delivery"],
        default: "customer"
    },
    address: String,
    phone: String,

},
{timestamps: true}
);

userSchema.plugin(passportLocalMongoose , {usernameField : "email"});

module.exports = mongoose.model("User" , userSchema);