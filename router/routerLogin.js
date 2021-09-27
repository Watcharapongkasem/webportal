const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

require("dotenv").config();
//connect to DB
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}
//new Schema
const infoUser = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  authorPage: Boolean
});

//new model for infoUser
const userAndPass = mongoose.model("userAndPass", infoUser);

router.post("/", express.urlencoded({ extended: false }), (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 5;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    const newUser = new userAndPass({
      username,
      password: hash,
      authorPage:false
    });
    newUser.save((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  });
});

const getUSer = (req, res, next) => {

  userAndPass.findOne({ username: req.query.username })
    .exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        bcrypt.compare( req.query.password,  data.password, async function (err, result) {
            // result == truex
            if (result) {
              data.authorPage=true;
              await data.save();
              res.json({result:'pass'});
            } else {
              res.json({result:'not pass'});
            }
          }
        );
      }
    });
};
router.get("/getUser",getUSer);

router.get('/user/:username',(req,res)=>{    
    userAndPass.findOne({username: req.params.username}).exec((err,data)=>{        
        if(data){
            res.json({username:data.username})
        }else{
            res.json({username:"Not Found"})
        }       
    })
});

module.exports = router;
