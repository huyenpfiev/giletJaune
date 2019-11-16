const express = require('express');
const app = express();
const infoRoutes = express.Router();


let Info = require('../models/Info');


infoRoutes.route('/register').post(function (req, res) {
  console.log("hhhhh");
  let info = new Info(req.body);
  
  Info.find({Username:req.body.Username},function (err, user){
    if(err){
      res.send(err);
    }
    if(user.length==1) {
      res.send("Existed");
    }
    else{
        info.save()
        .then(info => {
        res.status(200).json({'Account': 'Account has been added successfully'});
        })
        .catch(err => {
        res.status(400).send("unable to save to database");
        });
    }
  });
  
});





module.exports = infoRoutes;