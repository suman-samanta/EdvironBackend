const mongoose =require("mongoose");

const PropertiesSchema=new mongoose.Schema({
    propertyOwner:{
        type:String,
        required:true
    },
    propertyName:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    availableDate:{
        type:String,
        required:true
    },
    areaInMeterSq:{
        type:String,
        required:true
    },
    bedRoom:{
        type:Number,
        required:true,
        min:1
    },
    bathRoom:{
        type:Number,
        required:true,
        min:1
    },
    propertiesStaus:{
        type:Boolean
    }
    
},{timestamps:true})

module.exports=mongoose.model("Properties",PropertiesSchema); 