const Properties = require("../models/Properties");

exports.createNewProperty=async(req,res)=>{

    const {propertyOwner,propertyName,location,price,availableDate,areaInMeterSq,bedRoom,bathRoom}=req.body;

    if(!propertyOwner){
        return res.status(401).json("There is No property owner");
    }

    if(!location){
        return res.status(401).json("Please Enter The Location");
    }
    if(!price){
        return res.status(401).json("Please Enter The Price of the Property");
    }
    if(!availableDate){
        return res.status(401).json("Please Enter The Available Date");
    }
    if(!areaInMeterSq){
        return res.status(401).json("Please Enter The area of the Property");
    }
    if(!bedRoom){
        return res.status(401).json("Please Enter No of The BedRoom present");
    }

    if(!bathRoom){
        return res.status(401).json("Please Enter No of The BathRoom present");
    }

    try{

        const property=new Properties({
            propertyOwner,
            propertyName,
            location,
            price,
            availableDate,
            areaInMeterSq,
            bedRoom,
            bathRoom,
            propertiesStaus:true
        })

        const savedProperty=await property.save();

        res.status(200).json(savedProperty);

    }catch(err){
        res.status(500).json(err);
    }
}

exports.updateProperty=async(req,res)=>{

    try{
        const {propertyOwner,propertyName,location,price,availableDate,areaInMeterSq,bedRoom,bathRoom}=req.body;

        if(!propertyOwner){
            return res.status(401).json("There is No property owner.");
        }

        const checkres=await Properties.findById(req.params.id);

        if(checkres.propertyOwner!=propertyOwner){
            return res.status(401).json("You Are Not the owner of this Property.You can't update it.")
        }

        const Updated=await Properties.findOneAndUpdate(
            {_id:req.params.id },{
                $set:{
                    propertyName,
                    location,
                    price,
                    availableDate,
                    areaInMeterSq,
                    bedRoom,
                    bathRoom
                }
            }  
          )

          const result=await Properties.find({_id:req.params.id});

          res.status(200).json(result);
    
    }catch(err){
        res.status(500).json(err);
    }
    
}


exports.deleteProperty=async(req,res)=>{
    try{
        const {propertyOwner}=req.body;

        if(!propertyOwner){
            return res.status(401).json("There is No property owner.");
        }

        const checkres=await Properties.findById(req.params.id);

        if(checkres.propertyOwner!=propertyOwner){
            return res.status(401).json("You Are Not the owner of this Property.You can't update it.")
        }

        const Updated=await Properties.deleteOne({_id:req.params.id})

        res.status(200).json("Property has been deleted");
    
    }catch(err){
        res.status(500).json(err);
    }
}


exports.getOwnerProperty=async(req,res)=>{

    const {propertyOwner}=req.body;
    try{
        const result=await Properties.find({propertyOwner:propertyOwner});
        res.status(200).json(result);
    }catch(err){
        res.status(401).json(err);
    }
}

exports.getAllProperty=async(req,res)=>{

    
    try{
        const result=await Properties.find();
        res.status(200).json(result);
    }catch(err){
        res.status(401).json(err);
    }
}

exports.filterProperty=async(req,res)=>{
    const {cityName,availableDate,minPrice,maxPrice,propertyType}=req.body;

    console.log(availableDate);

            const parts = availableDate.split("-");
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // Months are zero-based in JavaScript
            const day = parseInt(parts[2], 10);
            
            const updatedDate = new Date(year, month, day);

    
    
    try{
        const result=await Properties.find({location:cityName,bedRoom:propertyType,price:{$gt:minPrice,$lt:maxPrice}});

        const finalRes=[];
        let k=0;
        // let propertyAvailable=false;

        for(var i=0;i<result.length;i++){
            const dateToCheck=result[i].availableDate

            const parts = dateToCheck.split("-");
            const year = parseInt(parts[2], 10);
            const month = parseInt(parts[1], 10) - 1; // Months are zero-based in JavaScript
            const day = parseInt(parts[0], 10);
            
            const UpdatedDateToCheck = new Date(year, month, day);

            if(updatedDate>=UpdatedDateToCheck){
                finalRes[k++]=result[i]
            }

        }


        res.status(200).json(finalRes);
    }catch(err){
        res.status(401).json(err);
    }
}

// function convertToDate(dateStr){
//      // const dateStr = "13-09-2023";
//      const parts = dateStr.split("-");
//      const year = parseInt(parts[2], 10);
//      const month = parseInt(parts[1], 10) - 1; // Months are zero-based in JavaScript
//      const day = parseInt(parts[0], 10);
     
//      const updatedDate = new Date(year, month, day);

//      return updatedDate;
// }
