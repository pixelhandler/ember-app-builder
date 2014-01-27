/**
  @module db
  @submodule setup
**/

var r = require('rethinkdb'),
  assert = require('assert'),
  logdebug = require('debug')('rdb:debug'),
  logerror = require('debug')('rdb:error');

// RethinkDB database settings. Defaults can be overridden using environment variables.
var dbConfig = {
  host: process.env.RDB_HOST || 'localhost',
  port: parseInt(process.env.RDB_PORT) || 28015,
  db  : process.env.RDB_DB || 'blog',
  tables: {
    'catalogs': 'id',
    'posts': 'id'
  }
};

/**
  @method setup

  Connect to RethinkDB instance and perform a basic database setup:

  - create the `RDB_DB` database (defaults to `blog`)
  - create tables `catalogs`, `posts` in this database
**/
module.exports.setup = function() {
  r.connect({host: dbConfig.host, port: dbConfig.port }, connectCallback);
};

// Callbacks

function connectCallback(err, connection) {
  assert.ok(err === null, err);
  r.dbCreate(dbConfig.db).run(connection, function dbCreateCallback(err, result) {
    if (err) {
      createDbError(err);
    } else {
      createDbSuccess();
    }
    for (var tableName in dbConfig.tables) {
      createDbTable(connection, tableName);
    }
  });
}

function createDbTable(connection, tableName) {
  var settings = { primaryKey: dbConfig.tables[tableName] };

  r.db(dbConfig.db).tableCreate(tableName, settings).run(connection, createDbTableCallback);
}

function createDbTableCallback(err, result) {
  if (err) {
    createTableError(err);
  } else {
    createTableSuccess(tableName);
  }
}

// Logging Callbacks

function createDbError(err) {
  logdebug("[DEBUG] RethinkDB database '%s' already exists (%s:%s)\n%s", dbConfig.db, err.name, err.msg, err.message);
}

function createDbSuccess() {
  logdebug("[INFO ] RethinkDB database '%s' created", dbConfig.db);
}

function createTableError(err, tableName) {
  logdebug("[DEBUG] RethinkDB table '%s' already exists (%s:%s)\n%s", tableName, err.name, err.msg, err.message);
}

function createTableSuccess(tableName) {
  logdebug("[INFO ] RethinkDB table '%s' created", tableName);
}


/**
  Query methods
**/

/**
  @method findPosts
  @param {Number} maxResults
  @param {Function} callback(err, results)
**/
module.exports.findPosts = function (query, callback) {
  var metaPartial = buildMeta(query);
  onConnect(function (err, connection) {
    if (err) logerror(err);
    posts = r.db(dbConfig.db).table('posts');
    posts.count().run(connection, function (err, results) {
      if (err) logerror(err);
      var meta = metaPartial(results);
      logdebug('Total Posts: ' + meta.total);
      posts.orderBy(r[meta.order](meta.sortBy))
        .skip(meta.offset)
        .limit(meta.limit)
        .run(connection, function (err, cursor) {
          if (err) {
            findError(err, connection, callback);
          } else {
            findPostsSuccess(cursor, connection, callback, meta);
          }
        });
    });
  });
};

/**
  @method findPost
  @param {String} id
  @param {Function} callback(err, result)
**/
module.exports.findPost = function (id, callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig.db)
      .table('posts')
      .get(id)
      .run(connection, function (err, post) {
        if (err) {
          findError(err, connection, callback);
        } else {
          findPostSuccess(post, connection, callback);
        }
      });
  });
};


function buildMeta(query) {
  query.limit = (query.limit)? parseInt(query.limit, 10) : 10;
  query.offset = (query.offset)? parseInt(query.offset, 10) : 0;
  query.sortBy = query.sortBy || 'date';
  query.order = query.order || 'desc';
  return function metaPartial(total) {
    return {
      limit: query.limit,
      offset: query.offset,
      sortBy: query.sortBy,
      order: query.order,
      total: total
    };
  };
}

function findError(err, connection, callback) {
  logerror("[ERROR][%s][find] %s:%s\n%s", connection._id, err.name, err.msg, err.message);
  callback(null, []);
  connection.close();
}

function findPostsSuccess(cursor, connection, callback, meta) {
  cursor.toArray(function(err, results) {
    if (err) {
      logerror("[ERROR][%s][find][toArray] %s:%s\n%s", connection._id, err.name, err.msg, err.message);
      callback(null, []);
    } else {
      callback(null, { posts: results, meta: meta });
    }
    connection.close();
  });
}

function findPostSuccess(json, connection, callback) {
  callback(null, { posts: [ json ] });
  connection.close();
}

/**
  A wrapper function for the RethinkDB API `r.connect`
  to keep the configuration details in a single function
  and fail fast in case of a connection error.
**/
function onConnect(callback) {
  var settings = { host: dbConfig.host, port: dbConfig.port };
  r.connect(settings, function (err, connection) {
    assert.ok(err === null, err);
    connection._id = Math.floor(Math.random() * 10001);
    callback(err, connection);
  });
}

/**
  Connection management

  This application uses a new connection for each query needed to serve
  a user request. In case generating the response would require multiple
  queries, the same connection should be used for all queries.

  Example:

      onConnect(function (err, connection)) {
        if (err) { return callback(err); }
        query1.run(connection, callback);
        query2.run(connection, callback);
      }
**/
