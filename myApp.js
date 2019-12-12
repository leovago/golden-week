/*
API Project: Timestamp Microservice
User Stories (WIP):

The API endpoint is GET [project_url]/api/timestamp/:date_string?

A date string is valid if can be successfully parsed by new Date(date_string).
Note that the unix timestamp needs to be an integer (not a string) specifying milliseconds.
In our test we will use date strings compliant with ISO-8601 (e.g. "2016-11-20") because this will ensure an UTC timestamp.

If the date string is empty it should be equivalent to trigger new Date(), i.e. the service uses the current timestamp.

If the date string is valid the api returns a JSON having the structure
{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
e.g. {"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}

If the date string is invalid the api returns a JSON having the structure
{"error" : "Invalid Date" }.

Example Usage:
[project url]/api/timestamp/2015-12-25
[project url]/api/timestamp/1450137600
Example Output:
{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}

by freeCodeCamp
*/

var bodyParser = require('body-parser');
var express = require('express');
var app = express();

//console.clear();

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


app.get("/api/timestamp", function(req, res){
  res.json({
    "unix": Date(),
    "utc": Date().toUTCString()
  });
});


app.get("/api/timestamp/:date_string", function(req, res){
  let newDate = new Date(req.params.date_string);
  console.log(newDate);
  res.json({
    "unix":newDate.getTime(),
    "utc":newDate.toUTCString()
  });
});


