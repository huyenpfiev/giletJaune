const express = require('express');
const app = express();
const infoRoutes = express.Router();

let Info = require('../models/Info');

infoRoutes.route('/register').post(function (req, res) {
  
  let info = new Info(req.body);

  Info.findOne({Username:req.body.Username},function (err, user){
    if(err){
      res.send(err);
    }
    if(user) {
      res.json({'Account':'Account existed'});
    }
    else{
        info.save()
        .then(info => {
        res.status(200).json({'Account': 'Account has been added successfully'});
        })
        .catch(err => {
        res.status(400).send("Unable to save to database");
        });
    }
  });
  
});

infoRoutes.route('/login').post(function (req, res) {
  
  Info.findOne({Username:req.body.Username,Password:req.body.Password},function (err, user){
    if(err){
      res.send(err);
    }
    if(!user) {
      res.json({'Account':'Incorrect'});
    }
    else{
      res.status(200).json({'Account':'Login successfully'});
        
    }
  });
  
});





module.exports = infoRoutes;