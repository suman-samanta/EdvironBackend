const mongoose =require("mongoose");



const SchoolSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true,
    },
    school_type:{
        type:String,
        required:true
    },
    
    student_count:{
        type:Number,
        required:true
    },
    fee_frequency:{
        type:String,
        required:true
    },
    address: {
        street: String,
        city: String,
        state: String,
        pin: String
    }
    

},{timestamps:true})

module.exports=mongoose.model("School",SchoolSchema); 