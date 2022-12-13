// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

// Challenge solutions ========================================================

// handle date request with date parameter 
app.get("/api/:date", (req, res) => {
  //create date object using string in date paramater
  let date = new Date(req.params.date);
  // check if the date paramater is a valid date string by checking if the date object is valid
  if (!(date instanceof Date) || isNaN(date))
    // create a new date object using the date paramater as an integer
    date = new Date(parseInt(req.params.date));
  // check if the date paramater is a valid date value by checking if the date object is valid
  if (!(date instanceof Date) || isNaN(date))
    // return an object indicating an error if the date paramater is not a valid date string or value
    res.json({ error: "Invalid Date" });
  else
    // return a object with unix and utc time if the date paramater is a valid date string or value
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// Handle empty date parameter
// returns current time 
app.get("/api/", (req, res) => {
  // create a date object with the current time
  const date = new Date();
  // return an object containing the current time as a unix timestamp and UTC time string
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
