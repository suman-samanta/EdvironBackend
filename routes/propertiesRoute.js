const express=require("express");
const router=express.Router();

const {createNewProperty,updateProperty,deleteProperty,getOwnerProperty,getAllProperty,filterProperty}=require("../controllers/propertiesController");

router.post("/property",createNewProperty);
router.put("/property/:id",updateProperty);
router.delete("/property/:id",deleteProperty);
router.get("/property",getOwnerProperty);
router.get("/getAllProperty",getAllProperty);
router.post("/filter/property",filterProperty);

module.exports=router;