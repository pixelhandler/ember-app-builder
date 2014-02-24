/**
  @module app
  @submodule routes/posts
  @requires app, rethinkdb_adapter
**/

/**
  Setup database
**/
var db = require('../lib/rethinkdb_adapter');
db.setup('blog', { catalogs: 'id', posts: 'id' });


/**
  Exports {Function} routes for Post resource

  @main routes/posts
  @param {Object} app - express application instance
  @param {Function} options - middleware callback (cors options)
**/
module.exports = function(app, cors, restrict) {

  /**
    Create a post

    Route: (verb) POST /posts
    @async
  **/
  app.post('/posts', cors, restrict, function (req, res) {
    db.createRecord('posts', req.body.post, function (err, payload) {
      if (err) {
        debug(err);
        res.send(500);
      } else {
        res.send(payload);
      }
    });
  });

  /**
    (Read) Find posts accepts query object

    Route: (verb) GET /posts
    @async
  **/
  app.get('/posts', cors, function (req, res) {
    db.findQuery('posts', req.query, function (err, payload) {
      if (err) {
        debug(err);
        res.send(500);
      } else {
        res.send(payload);
      }
    });
  });

  /**
    (Read) Find a post by id

    Route: (verb) GET /posts/:id
    @async
  **/
  app.get('/posts/:id', cors, function (req, res) {
    db.find('posts', req.params.id, function (err, payload) {
      if (err) {
        debug(err);
        res.send(500);
      } else {
        res.send(payload);
      }
    });
  });

  /**
    Update a post by id

    Route: (verb) PUT /posts/:id
    @async
  **/
  app.put('/posts/:id', cors, restrict, function (req, res) {
    db.updateRecord('posts', req.params.id, req.body.post, function (err, payload) {
      if (err) {
        debug(err);
        res.send(500);
      } else {
        res.send(payload);
      }
    });
  });

  /**
    Delete a post by id

    Route: (verb) DELETE /posts/:id
    @async
  **/
  app.del('/posts/:id', cors, restrict, function (req, res) {
    db.deleteRecord('posts', req.params.id, function (err) {
      if (err) {
        debug(err);
        res.send(500);
      } else {
        res.send(204); // No Content
      }
    });
  });

};
