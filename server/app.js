/**
  @module app
  @main app
**/
var express = require('express');
var cors = require('cors');
var debug = require('debug')('http');


/**
  Cors settings
**/
var options = {
  origin: function(origin, callback){
    var allowed = ['http://localhost:8000', 'http://localhost:7357'];
    var isAllowed = allowed.indexOf(origin) !== -1;
    callback(null, isAllowed);
  }
};


/**
  Configure application settings
  @config app
**/
var app = express();

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.options('*', cors(options)); // include before other routes
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


/**
  Load application routes
**/
require('./routes/ping')(app, cors(options));

require('./routes/posts')(app, cors(options));


/**
  Listen or export if required by testing
**/
if (!module.parent) {
  var port = process.env.SERVER_PORT || 8888;
  app.listen(port);
  console.log('CORS-enabled web server listening on port '+ port);
} else {
  module.exports = app;
}
