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
      
      const payload = {
        _id: user._id,
        FirstName: user.FirstName,
        LastName: user.LastName,
      }
      let token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: 1440
      })
      res.json({ token: token });
    }
  });
  
});

infoRoutes.route('/getInfos').get(function(req, res){
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

  Info.findOne({
    _id: decoded._id
  }).then(user => {
      if (user) {
        res.json(user);
      } else {
        res.json('User does not exist');
      }
    })
    .catch(err => {
      res.send(err);
    })
});

infoRoutes.route('/update').post(function(req, res){
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
  
    Info.findById(decoded._id, function(err, user) {
      if (!user)
        res.status(404).send("Record not found");
      else {
        user.FirstName = req.body.FirstName;
        user.LastName = req.body.LastName;
        user.Age = req.body.Age;
        user.Family=req.body.Family;
        user.Role=req.body.Role;
  
        user.save().then(user => {
            res.json('OK');
        })
        .catch(err => {
              res.status(400).send("Unable");
        });
      }
    });
});

infoRoutes.route('/getFriends').get(function(req, res){
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
 
  Info.findOne({
    _id: decoded._id
  }).then(user => {
      if (user) {
        Info.find({_id:{$in:user.Friends_id}},function(err,friends){
          
          if(typeof friends != 'undefined' && friends.length > 0)
            res.json(friends);
          else
            res.json("No friends");
        })
      } else {
        res.json('User does not exist');
      }
    })
    .catch(err => {
      res.send(err);
    })
});
infoRoutes.route('/deleteFriend').post(function(req,res){
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
  Info.findById(decoded._id,function(err,user){
    if(!user)
      res.status(404).send("User does not exist");
    else{
      user.Friends_id.pull(req.body._id);
      user.save().then(r => {
        res.json('OK');
      })
      .catch(err => {
        res.status(400).send("Unable");
      });
    }
  })
});

infoRoutes.route('/getUnFriends').get(function(req, res){
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
  
  Info.findOne({
    _id: decoded._id
  }).then(user => {
      if (user) {
        user.Friends_id.push(decoded._id);//add but not save
        Info.find({_id:{$nin:user.Friends_id}},function(err,unfriends){
          if(typeof unfriends !== 'undefined' && unfriends.length > 0)
          res.json(unfriends);
          else
          res.json("AllFriends");
        })
      } else {
        res.json('User does not exist');
      }
    })
    .catch(err => {
      res.send(err);
    })
});

infoRoutes.route('/addFriend').post(function(req,res){
  
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
  Info.findById(decoded._id,function(err,user){
    if(!user)
      res.status(404).send("User does not exist");
    else{
      user.Friends_id.push(req.body._id);
      
      user.save().then(r => {
        res.json('OK');
      })
      .catch(err => {
        res.status(400).send("Unable");
      });
    }
  })
});

infoRoutes.route('/addAutre').post(function(req,res){
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
  var info=new Info(req.body);
  info.save();
  
  Info.findById(decoded._id,function(err,user){
    if(!user)
    res.status(404).send("User does not exist");
    else{
      user.Friends_id.push(info._id);
      user.save().then(r => {
        res.json('OK');
      })
      .catch(err => {
        res.status(400).send("Unable");
      });
    }

  })
})

module.exports = infoRoutes;