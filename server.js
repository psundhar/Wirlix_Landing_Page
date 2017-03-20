var express = require('express');
var app = express();
var bodyParser  =   require("body-parser");
var mongoOp     =   require("./js/wirlix_mongo");
var router      =   express.Router();

//Store all HTML files in view folder.
app.use(express.static(__dirname + '/view'));

//Store all CSS in Scripts folder.
app.use(express.static(__dirname + '/css'));

//Store all JS in Scripts folder.
app.use(express.static(__dirname + '/js'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

// Index.html
router.get('/', function(req,res) {
    res.sendFile('index.html')
})

// Get All Users
router.route("/users").get(function(req,res) {
    var response = {};

    // Mongo command to fetch all data from collection.
    mongoOp.find({},function(err,data) {
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });
});

// Get/Update/Delete User by ID
router.route("/users/:id")
.get(function(req,res) {

})
.put(function(req,res) {

})
.delete(function(req,res) {
    var response = {};
    // find the data
    mongoOp.findById(req.params.id,function(err,data) {
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            // data exists, remove it.
            mongoOp.remove({_id : req.params.id},function(err) {
                if(err) {
                    response = {"error" : true,"message" : "Error deleting data"};
                } else {
                    response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                }
                res.json(response);
            });
        }
    });
})

app.use('/',router);

app.listen(3000);
console.log("Running at Port 3000");
