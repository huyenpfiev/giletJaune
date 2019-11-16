const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Info = new Schema({
  FirstName: {
    type: String
  },
  LastName: {
    type: String
  },
  Age: {
    type: Number
  },
  Family:{
      type: String
  },
  Role:{
      type:String
  },
  Username:{
      type:String
  },
  Password:{
      type:String
  }
},{
    collection: 'Info'
});

module.exports = mongoose.model('Info', Info);