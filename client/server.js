var staticServer = require('node-static');
var createServer = require('http').createServer;

// Create a node-static server instance to serve the './public' folder
exports.startServer = function (port, publicPath, log) {
  port = port || process.env.CLIENT_PORT || 8000;
  publicPath = publicPath || './public';

  var file = new staticServer.Server(publicPath);

  createServer(function (request, response) {

    request.addListener('end', function () {
      file.serve(request, response);
    }).resume();

  }).listen(port);
};
