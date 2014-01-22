var express = require('express'),
  app = express(),
  db = require('./lib/db'),
  whitelist = ['http://localhost:8000'],
  cors = require('cors'),
  options = {
    origin: function(origin, callback){
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
    }
  };

// Config
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.options('*', cors(options)); // include before other routes
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db.setup();
});

app.get('/ping', cors(options), function (req, res) {
  res.send('pong');
});

app.get('/posts', cors(options), function (req, res) {
  db.findPosts(10, function (err, posts) {
    if (!err && posts.length > 0) {
      res.send({ posts: posts});
    }
  });
});

if (!module.parent) {
  app.listen(8888);
  console.log('CORS-enabled web server listening on port 8888');
} else {
  module.exports = app;
}
