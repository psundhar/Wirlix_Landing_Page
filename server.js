var express = require('express');

var bodyParser = require('body-parser');
//opentok library.
var OpenTok = require('opentok');
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
// api key , api secret based on the profle created for testing
// please create your paid profile and create a project & apiKey , apiSecret
// with it.
var apiKey = '45812952'; //'3250192';
var apiSecret = '076c01947512aa994bdc042816e7a11813c6970a'; //'999f4ae23b820d498150d7ad896df8ed7d3afa66';
var opentok = new OpenTok(apiKey, apiSecret);
var bodyParser = require("body-parser");
var app = express();
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
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/', router);


// Create a session and store it in the express app
opentok.createSession({
    mediaMode: 'routed'
}, function (err, session) {
    if (err) throw err;
    app.set('sessionId', session.sessionId);
    // We will wait on starting the app until this is done
    startServer();
});



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

router.post('/loginUser', function (req, res) {
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
            collection.findOne({
                'email': doc.email,
                'password': doc.password
            }, function (err, document) {
                var status = '';
                if (err) {
                    status = 'ERROR';
                } else {
                    if (document != null) {
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

router.post('/debate', function (req, res) {
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


// get default session id
// http method : post
// usage http://localhost:3000/getSession
router.get('/getSession', function (req, res) {
    console.log(app.get('sessionId'));
})

// create a session id
// http method : post
// usage http://localhost:3000/createSession/<debate_id>
router.get('/createSession/:debate_id', function (req, res) {
    opentok.createSession({
        mediaMode: 'routed'
    }, function (err, session) {
        if (err) throw err;
        console.log(req.params.debate_id+'_sessionId');
        app.set(req.params.debate_id+'_sessionId', session.sessionId);
        res.json({
        debate: req.params.debate_id,
        });
    });

})

// generating a token 
// http method : post
// usgae http://localhost:3000/generateToken/<sessionId>
router.get('/generateToken', function (req, res) {
    var token = opentok.generateToken(app.get('sessionId'));
    console.log(token);
    res.json({
        token: token
    });
})

// generating a token 
// http method : post
// usgae http://localhost:3000/generateToken/<sessionId>
router.get('/generateToken/:debate_id', function (req, res) {
    var token = opentok.generateToken(app.get(req.params.debate_id+'_sessionId'));
    console.log(token);
    res.json({
        debate:req.params.debate_id,
        token: token
    });
})


// joining a debate
// joining a session
// http method : post
// usgae http://localhost:3000/generateToken/<sessionId>
router.get('/connectSession', function (req, res) {
    console.log(req.params.sessionId);
    console.log(req.params.token);
    var session;
    var sessionId = req.params.sessionId;
    var token = req.params.token;
    var connectionCount = 0;
    var connectionEstablished = false;
    // Replace apiKey and sessionId with your own values:
    session = OT.initSession(apiKey, sessionId);
    session.on({
        connectionCreated: function (event) {
            connectionCount++;
            console.log(connectionCount + ' connections.');
        },
        connectionDestroyed: function (event) {
            connectionCount--;
            console.log(connectionCount + ' connections.');
        },
        sessionDisconnected: function sessionDisconnectHandler(event) {
            // The event is defined by the SessionDisconnectEvent class
            console.log('Disconnected from the session.');
            document.getElementById('disconnectBtn').style.display = 'none';
            if (event.reason == 'networkDisconnected') {
                alert('Your network connection terminated.')
            }
        }
    });
    // Replace token with your own value:
    session.connect(token, function (error) {
        if (error) {
            console.log('Unable to connect: ', error.message);
        } else {
            document.getElementById('disconnectBtn').style.display = 'block';
            console.log('Connected to the session.');
            connectionCount = 1;
            connectionEstablished = true;
        }
    });
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        connectionCount: connectionCount,
        connectionEstablished: connectionEstablished
    }));
})


function startServer() {

    app.listen(3000);
    console.log("Running at Port 3000");

}
