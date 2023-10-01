const express=require("express");
const app=express();
const dotenv= require("dotenv");
const mongoose=require("mongoose");
const bodyParser = require('body-parser');

const authroute=require("./routes/authRoute");
const propertyRoute=require("./routes/propertiesRoute");
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

dotenv.config();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(allowCrossDomain);


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
.then(()=>console.log("connection successful...Mongodb Database connected successfully"))
.catch((err)=>console.log(err));


app.use("/api",authroute);
app.use("/api",propertyRoute);


module.exports=app;
