var http = require("http"),
  url = require("url"),
  path = require("path"),
  fs = require("fs"),
  express = require('express'),
  bodyParser = require('body-parser');

var app = express();

var filename = "chats.json";
var data;
fs.readFile(filename, function (err, tempData) {
  if (err) {
    tempData = JSON.stringify({
      results: []
    });
  }
  data = JSON.parse(tempData);
});

app.use(express.static('../client'));

app.use(bodyParser.json());

app.options('/*', function (req, res){
  handleResponse(res, 200)

});

app.get('/classes/*', function(req, res){
  handleResponse(res, 200, JSON.stringify(data))

});

app.post('/classes/*', function (req, res){
  data.results.push(req.body);
  var stringifiedData = JSON.stringify(data)
  fs.writeFile(filename, stringifiedData, function (err) {});
  handleResponse(res, 201, stringifiedData);
});

function handleResponse(res, status, data) {
  res.writeHead(status, defaultCorsHeaders);
  res.end(data);
};

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Allow": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
