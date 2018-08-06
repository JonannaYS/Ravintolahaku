var express = require('express');
var router = express.Router();

// var ravintolaservice = require('./ravintolaservice');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.route('/')
    .get(function (req, res) {
        etsiKaikki(function(results){
            res.json(results)
        });
    });

router.get(function (req, res) {
        haeNimella(function(results){
            res.json(results)
        });
    });

router.get(function (req, res) {
    haeTyylilla(function(results){
        res.json(results)
    });
});


function etsiKaikki(callback) {
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/test';
    MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
        if (err != null) {
            console.log("Virhe yhteyden avaamisessa!" + err.message);
            throw err;
        }
        const dbo = db.db();
        console.log("Yhteys Mongoon saatu");
        const kokoelma = dbo.collection('restaurants');
        kokoelma.find({}).limit(100).toArray()
            .then((res) => {
                console.log("Viisi ensimmäistä ravintolaa: ", res);
                callback(res);
            });

    });
}

function etsiNimella(callback) {
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/harjoitus';
    MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
        if (err != null) {
            console.log("Virhe yhteyden avaamisessa!" + err.message);
            throw err;
        }
        const dbo = db.db();
        console.log("Yhteys Mongoon saatu");
        const kokoelma = dbo.collection('restaurants');
        kokoelma.find({}).toArray()
            .then((res)=> {
                console.log(res);
                callback(res);
            });

    });
}

module.exports = router;
