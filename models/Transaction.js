const mongoose =require("mongoose");

const TransactionSchema=new mongoose.Schema({
     school:{
        type: mongoose.Types.ObjectId,
        required:true
     },
     status:{
        type:String,
        required:true
     },
     amount:{
        type:Number,
        required:true
     },
     payment_mode:{
        type:String,
        required:true
     },
     schoolName:{
        type:String,
        required:true
    },
     desc:{
        type:String
     }

},{timestamps:true})

module.exports=mongoose.model("Transaction",TransactionSchema); 