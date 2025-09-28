if(process.env.NODE_ENV != "production"){
    require('dotenv').config();

}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
passport = require("passport");
const LocalStrategy= require("passport-local");
const {parser} = require("./cloudConfig.js");

const User = require("./models/User.js");
const Product = require("./models/Product.js");



const MONGO_URL="mongodb://127.0.0.1:27017/Moon";

main().then(()=>{
    console.log("connected to DB");
}).catch(err=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.use(express.urlencoded({extended: true}));
const sessionOptions = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: false
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({usernameField: 'email'} , User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

app.get("/" , (req, res)=>{
    res.send("Hi the server is working!");
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = new User({ name, email, role }); 
        await User.register(user, password);
        res.send("User registered! Please login.");
    } catch (e) {
        console.log(e);
        res.send("Error registering user");
    }
});

app.post("/products", parser.array('images', 5), async (req, res) => {
    try {
        const { name, description, price, category, stock, variants } = req.body;
        const images = req.files.map(file => ({ url: file.path, filename: file.filename }));

        const product = new Product({
            name,
            description,
            price,
            category,                 
            stock: stock || 0,
            variants: variants ? variants.split(",") : [], 
            images
        });

        await product.save();
        res.send("Product uploaded successfully!");
    } catch (e) {
        console.log(e);
        res.send("Error uploading product");
    }
});


app.listen(8080 , ()=>{
    console.log("server listening to port 8080");
});
