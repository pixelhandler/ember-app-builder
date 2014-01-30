var express = require('express'),
  app = express(),
  db = require('./lib/rethinkdb_adapter'),
  whitelist = ['http://localhost:8000'],
  cors = require('cors'),
  options = {
    origin: function(origin, callback){
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
    }
  },
  debug = require('debug')('http');

// Config
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.options('*', cors(options)); // include before other routes
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db.setup('blog', { catalogs: 'id', posts: 'id' });
});

app.get('/ping', cors(options), function (req, res) {
  res.send('pong');
});

app.get('/posts', cors(options), function (req, res) {
  db.findQuery('posts', req.query, function (err, payload) {
    if (err) {
      debug(err);
      res.send(500);
    } else {
      res.send(payload);
    }
  });
});

app.get('/posts/:id', cors(options), function (req, res) {
  db.find('posts', req.params.id, function (err, payload) {
    if (err) {
      debug(err);
      res.send(500);
    } else {
      res.send(payload);
    }
  });
});

app.put('/posts/:id', cors(options), function (req, res) {
  db.updateRecord('posts', req.params.id, req.body.post, function (err, payload) {
    if (err) {
      debug(err);
      res.send(500);
    } else {
      res.send(payload);
    }
  });
});

if (!module.parent) {
  app.listen(8888);
  console.log('CORS-enabled web server listening on port 8888');
} else {
  module.exports = app;
}
