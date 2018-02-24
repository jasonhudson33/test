var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://adminUse:Notmyweek20!@cluster0-b9ew8.mongodb.net/application";
var mongoose = require('mongoose');
var children = require('./models/children');
var db = require('../config/db');
var Promise = require('promise');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests

	app.get('/api/children/get', function(req, res) {
		// console.log('getting')
		// mongoose.connect(uri);
		//  console.log('Inside')
		// return children.find(function(err, children) {
		// 	console.log('more inside')
		// 	if ( err ) {
		// 		throw err;
		// 	} else {
		// 		console.log(children);	
		// 		console.log('ok')
		// 		return children;
		// 	}
		// })
		
		MongoClient.connect(uri).then(function(dbo) {
			var db = dbo.db('application')
			var results = db.collection('children').find({}).toArray();
			dbo.close();
			return results;
		}).then(function(items) {
			console.log(items);
			res.send(items)
		});
		// return new Promise(function(resolve, reject) {
		// 	children.find(function(err, children) {
		// 		if ( err ) {
		// 			reject(err);
		// 		} else {
		// 			resolve(children);	
		// 		}
				
		// 	})
		// })
		
	});

	app.post('/api/children/save', function(req, res) {
		var child = new children(req.body);
		console.log(child)
		return new Promise(function(resolve, reject) {
			children.save(child, function(err, children) {
				if ( err ) {
					reject(err);
				} else {
					resolve(children);
				}
				
			})
		})
		
	});
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};