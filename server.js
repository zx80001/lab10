var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MONGODBURL = 'mongodb://localhost/test';

var restaurantSchema = require('./models/restaurant');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/restaurant/:attrib/:attrib_value', function(req,res) {
	console.log("find with one attrib");
	var criteria = {};
	criteria[req.params.attrib] = req.params.attrib_value;

	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find(criteria,function(err,results){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				db.close();
				console.log('Found: ',results.length);
				res.json(results);
			}
		});
	});
});
app.get('/restaurant/:attrib/:attrib_value/:attrib/:attrib_value', function(req,res) {
	console.log("find with 2 attrib");
	var criteria = {};
	criteria[req.params.attrib] = req.params.attrib_value;

	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find(criteria,function(err,results){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				db.close();
				console.log('Found: ',results.length);
				res.json(results);
			}
		});
	});
});

		
app.get('/restaurant/address/:attrib/:attrib_value', function(req,res) {
	console.log("find address/")
	var criteria = {};
	criteria["address."+req.params.attrib] = req.params.attrib_value;

	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find(criteria,function(err,results){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				db.close();
				console.log('Found: ',results.length);
				res.json(results);
			}
		});
	});
});

app.get('/restaurant/address/:attrib/:attrib_value/:attrib_value', function(req,res) {
	console.log("find coord with two value/")
	var criteria = {};
	criteria["address."+req.params.attrib] = req.params.attrib_value;

	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find(criteria,function(err,results){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				db.close();
				console.log('Found: ',results.length);
				res.json(results);
			}
		});
	});
});

app.post('/restaurant', function(req,res) {
	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var k = new Restaurant(req.body);
		k.save(function(err,results){
			if (err) {
				res.end(err.message,500);
			}
			else {
				db.close();
				res.end('Done',200);
				console.log("add successful")
			}
		});
	});
});

/*app.put('/kitty/:name/:attrib/:attrib_value', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib] = req.params.attrib_value;

	console.log(criteria);
	
	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Kitten = mongoose.model('Kitten', kittySchema);
		Kitten.update({name:req.params.name},{$set:criteria},function(err){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				db.close();
				res.end('Done',200);
			}
		});
	});
});
*/
app.listen(process.env.PORT || 8099);
