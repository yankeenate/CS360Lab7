var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile('weather.html', { root: 'public' });
});

router.get('/test1.html', function(req, res, next) {
	res.sendFile('html/test1.html', { root: 'public' });
});

router.get('/test2.txt', function(req, res, next) {
        res.sendFile('html/test2.txt', { root: 'public' });
});

router.get('/test3.gif', function(req, res, next) {
        res.sendFile('html/test3.gif', { root: 'public' });
});

router.get('/test4.jpg', function(req, res, next) {
        res.sendFile('html/test4.jpg', { root: 'public' });
});

router.get('/getcity', function(req, res, next) {
	console.log("In getcity route");
	fs.readFile(__dirname + '/cities.dat.txt', function(err, data) {
		if(err) throw err;
		var cities = data.toString().split("\n");
		var jsonresult = [];
		for(var i = 0; i < cities.length; i++) {
			var myRe = new RegExp("^" + req.query.q);
        	        var result = cities[i].search(myRe);
                	if (result != -1) {
				jsonresult.push({city:cities[i]});
                	}
		}
		res.status(200).json(jsonresult);
	});	
});

router.get('/getname', function(req, res, next) {
	console.log("In getname route");
	fs.readFile(__dirname + '/names.dat.txt', function(err, data) {
		if(err) throw err;
		var names = data.toString().split("\n");
		var jsonresult = [];
		for(var i = 0; i < names.length; i++) {
			var myRe = new RegExp("^" + req.query.q);
			var result = names[i].search(myRe);
			if (result != -1) {
				var rank = i + 1;
				jsonresult.push({name:names[i], rank:rank});
			}
		}
		res.status(200).json(jsonresult);
	});
});

module.exports = router;
