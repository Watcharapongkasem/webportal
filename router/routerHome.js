const express = require("express");
const router = express.Router();

router.get('/',(req,res)=>{
    res.end("hi from home")
})



module.exports = router;