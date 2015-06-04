/*
 * Greencloud v1.0.0 
 *
 * Copyright © 2015 greencloud
 * Licensed under AGPL 
 *
 */

'use strict';
/* 
   Dependencies
*/
var path = require('path'),
	rootPath = path.normalize(__dirname + '/..');

module.exports = {
	development: {
		port: 3001,
		db: 'mongodb://localhost/greencloud',
		root: rootPath,
		app: {
			name: 'Greencloud Database'
		}
	},
	production: {
		port: 3001,
		db: 'mongodb://localhost/greencloud_Prod',
		root: rootPath,
		app: {
			name: 'Greencloud Database'
		}
	}
};