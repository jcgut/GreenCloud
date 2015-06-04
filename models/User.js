 'use strict';
/* 
   Dependencies
*/
var mongoose = require('mongoose'),
     Schema = mongoose.Schema,
     passportLocalMongoose = require('passport-local-mongoose'),
     bcrypt   = require('bcrypt-nodejs');

/* 
   Define the schema for the mongo database
*/
 var userSchema = new Schema({
     username : {
         type: String,
         default: ''
     },
     password : {
         type: String,
         default: ''
     },
     domains: [{
        name:{
            type: String,
            default: ''
        },
        domain: {
            type: String,
            default: ''
        }
     }],
     type: {
        type: String,
        default: 'User' // User or Admin
     }
 });


/* 
   Methods to encode and compare the password
*/
// generating a hash
userSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

/* 
   Export module so it can be use on other pages
*/
 module.exports = mongoose.model('User', userSchema);