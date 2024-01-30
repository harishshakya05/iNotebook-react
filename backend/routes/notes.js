const express = require("express");
const router = express.Router();

router.get("/notes",(req,res)=>{
    res.send("notes router working")
})

module.exports  = router;