const express = require('express');
const app = express();
const infoRoutes = express.Router();
const jwt = require('jsonwebtoken');
let Info = require('../models/Info');

process.env.SECRET_KEY = 'secret';

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
        res.status(200).json({'Account': 'Success'});
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
      //res.status(200).json({'Account':'Login successfully'});
      const payload = {
        _id: user._id,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Age: user.Age,
        Family:user.Family,
        Role:user.Role
      }
      let token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: 1440
      })
      res.json({ token: token });
    }
  });
  
});





module.exports = infoRoutes;