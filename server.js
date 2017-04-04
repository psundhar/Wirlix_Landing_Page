var express = require('express');
var app = express();
var bodyParser = require("body-parser");

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/wirlix';

var OpenTok = require('opentok');
var apiKey = '';
var apiSecret = '';
opentok = new OpenTok(apiKey, apiSecret);
var router = express.Router();

//Store all HTML files in view folder.
app.use(express.static(__dirname + '/view'));

//Store all CSS in Scripts folder.
app.use(express.static(__dirname + '/css'));

//Store all JS in Scripts folder.
app.use(express.static(__dirname + '/js'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    "extended": false
}));

// Index.html
router.get('/', function(req, res) {
    res.sendFile('index.html')
})

//gallery.html
router.get('/gallery', function(req, res) {
    res.sendFile('gallery.html')
})

//upcoming.html
router.get('/upcoming', function(req,res) {
    res.sendFile('upcoming.html')
})

router.get('/about', function(req, res) {
    res.sendFile('about.html')
})

router.post('/registerUser', function(req, res) {
    var status = true;

    console.log(req.body);
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
        status = false;
      } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', url);

        // Get the documents collection
        var doc = req.body;
        var collection = db.collection('user');
        collection.insertOne(doc, function (err, result) {
            if (err) {
                console.log(err);
                status = false;
            } else {
                console.log('Successfully inserted user!!!');
                status = true;
            }
        });

        //Close connection
        db.close();
      }
    });

    res.send(status);
})

router.post('/loginUser', function(req, res) {
    console.log(req.body);
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        var status = '';
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            status = 'ERROR';

            //Close connection
            db.close();
            console.log(status);
            res.send(status);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);
            var doc = req.body;
            console.log(doc.password);

            // Get the documents collection
            var collection = db.collection('user');
            collection.findOne({'email':doc.email, 'password':doc.password}, function(err, document) {
                var status = '';
                if (err) {
                    status = 'ERROR';
                } else {
                    if(document != null) {
                        console.log(document.firstname);
                        var status = new Object();
                        status['firstname'] = document.firstname;
                        status['email'] = document.email;
                        status = JSON.stringify(status);
                    } else {
                        status = 'ERROR';
                    }
                }

                //Close connection
                db.close();
                console.log(status);
                res.send(status);
            });
        }
    });
})

router.post('/debate', function(req, res) {
    console.log(req.body);
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        var status = '';
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            status = 'ERROR';

            //Close connection
            db.close();
            res.send(status);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);
            var doc = req.body;

            // Get the documents collection
            var collection = db.collection('debate');
            collection.insertOne(doc, function (err, result) {
                var status = '';
                if (err) {
                    console.log(err);
                    status = 'ERROR';
                } else {
                    console.log('Successfully inserted debate topic!!!');
                    status = 'SUCCESS';
                }

                //Close connection
                db.close();
                res.send(status);
            });
        }
    });
})

app.use('/', router);
app.listen(3000);
console.log("Running at Port 3000");
