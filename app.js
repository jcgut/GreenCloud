'use strict';
/* 
	Dependencies
*/
var express = require('express'),
	http = require('http'),
	mongoose = require('mongoose'),
	passport = require('passport');
/* 
	Environment configuration 
*/
var	env = process.env.NODE_ENV || 'development',
	config = require('./config/config')[env]

/* 
	Connect to the database with Mongoose
*/
mongoose.connect(config.db,function(err){
	if(!err){
		console.log('Connect to greencloud');
	}else{
	 throw err;
	}
});

/*
 	Initial configuration
*/
require('./config/passport')(passport);

var app = express();
require('./config/express')(app, config, passport);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

/*
 	Socket configuration
*/
var io = require('socket.io').listen(server);

require('./routes/index')(app,io);