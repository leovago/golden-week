var bodyParser = require('body-parser');
var express = require('express');
var app = express();

console.clear();

app.use(function logger(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

app.use(bodyParser.urlencoded({ encoded:false }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/", express.static(__dirname + "/public"));

app.get("/now", function(req, res, next){
  req.time = new Date().toString();
  next();
}, function(req, res){
  res.json({
    "time":req.time
  });
});