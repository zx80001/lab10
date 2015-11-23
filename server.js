var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MONGODBURL = 'mongodb://localhost/test';

var restaurantSchema = require('./models/restaurant');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/restaurant/name/:x', function(req,res) {
	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		//Kitten.find({name: new RegExp(req.params.x)},function(err,results){
		Restaurant.find({name: req.params.x},function(err,results){
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

/*app.get('/kitty/age/:x', function(req,res) {
	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Kitten = mongoose.model('Kitten', kittySchema);
		//Kitten.find({name: new RegExp(req.params.x)},function(err,results){
		Kitten.find({age: req.params.x},function(err,results){
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

app.get('/kitty/month/:x', function(req,res) {
	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Kitten = mongoose.model('Kitten', kittySchema);
		//Kitten.find({name: new RegExp(req.params.x)},function(err,results){
		Kitten.find({'birthday.month': req.params.x},function(err,results){
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

app.get('/kitty/birthday/:attrib/:attrib/:attrib_value', function(req,res) {
	var criteria = {};
	criteria["birthday."+req.params.attrib] = req.params.attrib_value;

	mongoose.connect(MONGODBURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Kitten = mongoose.model('Kitten', kittySchema);
		Kitten.find(criteria,function(err,results){
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
*/
app.post('/restaurant/name', function(req,res) {
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
