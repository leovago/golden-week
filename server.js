console.clear();
// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// developer endpoint
app.get("/api/developer", function(req, res){
  res.json({
    "developer":"Leo Vargas",
    "company":"Magno Technologies"
  });
});

// Empty date string
app.get("/api/timestamp/", function(req, res){
  let newDate = new Date();
  res.json(getJSON(newDate));
});

app.get("/api/timestamp/:date_string", function(req, res){
  let dateString = req.params.date_string;
  let date = new Date();
  (isNaN(dateString)) ? date = new Date(dateString) : date = new Date(Number(dateString));
  (date == 'Invalid Date') ? res.json({"error":"Invalid Date"}) : res.json(getJSON(date));
});

function getJSON(date){
  return ({
    "unix": date.valueOf(),
    "utc": date.toUTCString()
  });
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});