'use strict';
/* 
    Dependencies
*/
var flash = require('connect-flash'),
	express = require('express');

module.exports = function (app, config, passport) {

/* 
   Express setup
*/
	app.set('showStackError', true);

	//Compress needs to be called high in the stack
	app.use(express.compress ({
		filter: function(req, res) {
			return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	app.use(express.favicon(config.root + '/public/images/favicon.ico'));
	app.use(express.static(config.root + '/public'));

	app.use(express.logger('dev'));

	app.set('views', config.root + '/views');
	app.set('view engine', 'jade');

	app.configure(function () {
		app.set('port', process.env.PORT || 3002);
		app.use(express.json());
		app.use(express.bodyParser());
		app.use(express.cookieParser());
		app.use(express.methodOverride());
		app.use(express.session({ secret: 'SECRET' }));
		app.use(flash());

		/* 
		   Use Passport Session
		*/
		app.use(passport.initialize());
		app.use(passport.session());

		app.use(app.router);

		/* 
		   Enviroment's error handler setup
		*/
		app.configure('development', function () {
			app.locals.pretty = true;
    		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
		});

		app.configure('production', function(){
		    app.use(express.errorHandler());
		});
	});
};