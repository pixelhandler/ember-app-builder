/**
  @module rethinkdb_adapter
**/

var r = require('rethinkdb'),
  db = require('./db_adapter'),
  assert = require('assert'),
  logdebug = require('debug')('rdb:debug'),
  logerror = require('debug')('rdb:error');

// Callbacks

function connectCallback(err, connection) {
  assert.ok(err === null, err);
  r.dbCreate(adapter.db).run(connection, function dbCreateCallback(err, result) {
    if (err) {
      createDbError(err);
    } else {
      createDbSuccess();
    }
    for (var tableName in adapter.tables) {
      createDbTable(connection, tableName);
    }
  });
}

function createDbTable(connection, tableName) {
  var settings = { primaryKey: adapter.tables[tableName] };

  r.db(adapter.db).tableCreate(tableName, settings).run(connection, createDbTableCallback);
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
  logdebug("[DEBUG] RethinkDB database '%s' already exists (%s:%s)\n%s", adapter.db, err.name, err.msg, err.message);
}

function createDbSuccess() {
  logdebug("[INFO] RethinkDB database '%s' created", adapter.db);
}

function createTableError(err, tableName) {
  logdebug("[DEBUG] RethinkDB table '%s' already exists (%s:%s)\n%s", tableName, err.name, err.msg, err.message);
}

function createTableSuccess(tableName) {
  logdebug("[INFO] RethinkDB table '%s' created", tableName);
}


/**
  Query methods
**/


/**
  @method findQuery
  @param {String} type - name of resource
  @param {Object} query - key/value pairs
  @param {Function} callback(err, results) - Callback args: Error, Results Array
**/
db.Adapter.prototype.findQuery = function (type, query, callback) {
  var metaPartial = buildMeta(query);
  onConnect(function (err, connection) {
    if (err) logerror(err);
    posts = r.db(adapter.db).table(type);
    posts.count().run(connection, function (err, results) {
      if (err) logerror(err);
      var meta = metaPartial(results);
      posts.orderBy(r[meta.order](meta.sortBy))
        .skip(meta.offset)
        .limit(meta.limit)
        .run(connection, function (err, cursor) {
          if (err) {
            findError(err, connection, callback);
          } else {
            findQuerySuccess(cursor, connection, callback, meta);
          }
        });
    });
  });
};

/**
  @method find
  @param {String} type - name of resource
  @param {String} id
  @param {Function} callback(err, result) - Callback args: Error, JSON Result
**/
db.Adapter.prototype.find = function (type, id, callback) {
  onConnect(function (err, connection) {
    r.db(adapter.db)
      .table(type)
      .get(id)
      .run(connection, function (err, record) {
        if (err) {
          findError(err, connection, callback);
        } else {
          findSuccess(record, connection, callback);
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

function findQuerySuccess(cursor, connection, callback, meta) {
  cursor.toArray(function(err, results) {
    if (err) {
      logerror("[ERROR][%s][find][toArray] %s:%s\n%s", connection._id, err.name, err.message);
      callback(null, []);
    } else {
      callback(null, { posts: results, meta: meta });
    }
    connection.close();
  });
}

function findSuccess(json, connection, callback) {
  callback(null, { posts: [ json ] });
  connection.close();
}


/**
  @method updateRecord
  @param {String} type
  @param {String) id
  @param {Object} record
  @param {Function} callback(err, results) - Callback args: Error, Results Array
**/
db.Adapter.prototype.updateRecord = function (type, id, record, callback) {
  var payload = record;
  onConnect(function (err, connection) {
    r.db(adapter.db)
      .table(type)
      .get(id)
      .update(payload, {return_vals: true})
      .run(connection, function (err, result) {
        if (err) {
          findError(err, connection, callback);
        } else {
          var post = result.new_val;
          callback(null, { "post": post });
        }
      });
  });
};


/**
  A wrapper function for the RethinkDB API `r.connect`
  to keep the configuration details in a single function
  and fail fast in case of a connection error.
**/
function onConnect(callback) {
  var settings = { host: adapter.host, port: adapter.port };
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


// RethinkDB database settings.
// Defaults can be overridden using environment variables.
var adapter = new db.Adapter({
  host: process.env.RDB_HOST || 'localhost',
  port: parseInt(process.env.RDB_PORT) || 28015,
  db: process.env.RDB_DB
});

// export find method
module.exports.find = adapter.find;

// export findQuery method
module.exports.findQuery = adapter.findQuery;

// export updateRecord method
module.exports.updateRecord = adapter.updateRecord;

/**
  @method setup

  Connect to RethinkDB instance and perform a basic database setup:

  - create the `RDB_DB` database (defaults to `blog`)
  - create tables `catalogs`, `posts` in this database

  @param {String} db (optional) - database name
  @param {Object} tables (optional) - table names as properties
    with primary key assigned to name
**/
module.exports.setup = function(db, tables) {
  adapter.db = db || adapter.db;
  adapter.tables = tables || adapter.tables;
  r.connect({host: adapter.host, port: adapter.port }, connectCallback);
};
