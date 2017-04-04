var express = require('express');
var app = express();

var OpenTok = require('opentok');

// api key , api secret based on the profle created for testing
// please create your paid profile and create a project & apiKey , apiSecret
// with it.
var apiKey = '45812802'; //'3250192';
var apiSecret = '6ae1f60a6ccd99465ea86b17b7c45e45e1b96b91'; //'999f4ae23b820d498150d7ad896df8ed7d3afa66';
opentok = new OpenTok(apiKey, apiSecret);

var bodyParser = require("body-parser");

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/wirlix';

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
router.get('/', function (req, res) {
    res.sendFile('index.html')
})

//tokbox.html
router.get('/tokbox', function (req, res) {
    res.sendFile(__dirname + '/view/tokbox.html')
})


//gallery.html
router.get('/gallery', function (req, res) {
    res.sendFile('gallery.html')
})

//upcoming.html
router.get('/upcoming', function (req, res) {
    res.sendFile('upcoming.html')
})

router.get('/about', function (req, res) {
    res.sendFile('about.html')
})

router.post('/registerUser', function (req, res) {
    console.log(req.body);
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        var status = true;
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            status = false;

            //Close connection
            db.close();
            res.send(status);
        } else {
            console.log('Connection established to', url);

            // Get the documents collection
            var doc = req.body;
            var collection = db.collection('user');
            collection.insertOne(doc, function (err, result) {
                var status = '';

                if (err) {
                    console.log(err);
                    status = false;
                } else {
                    console.log('Successfully inserted user!!!');
                    status = true;
                }

                //Close connection
                db.close();
                res.send(status);
            });
        }
    });
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

                    //Close connection
                    db.close();
                    res.send(status);
                }
            });
        }
    });
})

// create a session id
// http method : post
// usage http://localhost:3000/createSession
router.get('/createSession', function (req, res) {
    //console.log(opentok);
    opentok.createSession(function (err, session) {
        if (err) {
            console.log(err);
            //res.send('Error creating session!!!');
        } else {
            // store the session Id in mongo db here or after the api is called.
            console.log(session.sessionId);
            res.send(session.sessionId);
        }
    });
})

// generating a token 
// http method : post
// usgae http://localhost:3000/generateToken/<sessionId>
router.post('/generateToken/:sessionId', function (req, res) {
    console.log(req.params.sessionId);
    var token = opentok.generateToken(req.params.sessionId);
    console.log(token);
    res.send(token);
})

app.use('/', router);
app.listen(3000);
console.log("Running at Port 3000");
