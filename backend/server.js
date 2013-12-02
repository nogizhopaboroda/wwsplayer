var static = require('node-static');
var express = require('express');
var app = express();

var file = new static.Server('../../wwsplayer/');

app.get('/*', function(req, res, next){

  console.log(req.params);
  file.serve(req, res);
});

app.listen(8080);
