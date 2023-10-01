const express=require("express");
const router=express.Router();

const {createNewUser,loginUser}=require("../controllers/authController");

router.post("/signup",createNewUser);
router.post("/login",loginUser);

module.exports=router;