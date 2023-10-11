const School = require("../models/School");
const Transaction = require("../models/Transaction");

exports.createNewSchool=async(req,res)=>{

    const {name,email,phone_number,school_type,student_count,fee_frequency,city,state,street,pin}=req.body;
 

    if(!name){
        return res.status(401).json("Please Enter the School Name");
    }

    if(!email){
        return res.status(401).json("Please Enter the School Email");
    }

    if(!phone_number){
        return res.status(401).json("Please Enter the School Phone Number");
    }

    if(!school_type){
        return res.status(401).json("Please Enter the School Type");
    }

    if(!student_count){
        return res.status(401).json("Please Enter the School student count");
    }
    if(!fee_frequency){
        return res.status(401).json("Please Enter the School Fee Frequency");
    }

    if(!city){
        return res.status(401).json("Please Enter the School City name");
    }

    if(!state){
        return res.status(401).json("Please Enter the School state name");
    }

    if(!street){
        return res.status(401).json("Please Enter the School stree Name");
    }
    if(!pin){
        return res.status(401).json("Please Enter the School pin code");
    }
    
    try{

        const upaddress={
            city:city,
            street:street,
            state:state,
            pin:pin
        }

        const newSchool=new School({
            name,
            email,
            phone_number,
            school_type,
            student_count,
            fee_frequency,
            address:upaddress
        });
        const school=await newSchool.save();
        res.status(200).json(school);

    }catch(err){
        res.status(500).json(err);
    }
}

exports.getAllSchools=async(req,res)=>{
    try{
        const result=await School.find();
        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err);
    }
}

exports.getASchool=async(req,res)=>{
    const id=req.params.id;
    try{
        const result=await School.findById({_id:id});
        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err);
    }
}


exports.createnewTransaction=async(req,res)=>{
   const {school,status,schoolName,amount,payment_mode,desc}=req.body;

   if(!school){
    return res.status(401).json("Please Enter School Name");
   }
   
   if(!status){
    return res.status(401).json("Error");
   }

   if(!amount){
    return res.status(401).json("Please Enter The Amount to disburst");
   }
   if(!payment_mode){
    return res.status(401).json("Enter Payment mode");
   }


   try{

    const newTransaction=new Transaction({
        school,
        schoolName,
        status,
        amount,
        payment_mode,
        desc
    })

    const savedTransaction=await newTransaction.save();

    res.status(200).json(savedTransaction);
   }catch(err){
    res.status(500).json(err);
   }
}


exports.getTransactionForReconcile=async(req,res)=>{
    try{
        const result=await Transaction.find({status:"FALSE"});
        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err);
    }
}

exports.previousTransaction=async(req,res)=>{
    try{
        const result=await Transaction.find({status:"RECONCILED"});
        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err);
    }
}


exports.updateTransactionOnreconcile=async(req,res)=>{
    const transactionId=req.params.transactionId;

    try{
        const updatedTransaction=await Transaction.findByIdAndUpdate({_id:transactionId},{
            $set:{
                status:"RECONCILED"
            }
        })

        const result=await Transaction.find({status:"FALSE"});

        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err)
    }
}


exports.deleteTransaction=async(req,res)=>{
    const transactionId=req.params.transactionId;

    try{
        const updatedTransaction=await Transaction.findByIdAndDelete({_id:transactionId})

        const result=await Transaction.find({status:"FALSE"});

        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err)
    }
}