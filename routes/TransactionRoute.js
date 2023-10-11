const express=require("express");
const router=express.Router();

const {createNewSchool,createnewTransaction,getAllSchools,
    updateTransactionOnreconcile,getTransactionForReconcile,getASchool,deleteTransaction,previousTransaction}=require("../controllers/transactionController");

router.post("/createASchool",createNewSchool);
router.post("/createTransaction",createnewTransaction);

router.get("/getAllSchools",getAllSchools)
router.get("/getSchool/:id",getASchool)
router.get("/transactionforReconcile",getTransactionForReconcile);
router.get("/reconciledTransaction",previousTransaction);


router.put("/reconcileTransaction/:transactionId",updateTransactionOnreconcile);

router.delete("/deleteTransaction/:transactionId",deleteTransaction);



module.exports=router;