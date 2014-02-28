/**
  @module app
  @submodule rethinkdb_adapter/find
  @requires rethinkdb, inflect, debug
**/
var r = require('rethinkdb');
var inflect = require('inflect');
var loginfo = require('debug')('rdb:info');
var logerror = require('debug')('rdb:error');

/**
  Exports {Function} - change an adapter's find method

  @param {Adapter} adapter
  @param {Function} connect - wrapper for the RethinkDB API `r.connect`
  @return {Function} adapter.find
**/
module.exports = function(adapter, connect) {
  var _adapter = adapter;
  var _connect = connect;
  /**
    @method find
    @param {String} type - name of resource
    @param {String} slug
    @param {Function} callback that accepts arguments: {Error} err, {Object} (JSON) result
    @async
  **/
  adapter.findBySlug = function (type, slug, callback) {
    var db = _adapter.db;
    loginfo('slug %s', slug);
    _connect(function (err, connection) {
      r.db(db).table(type)
        .filter({'slug': slug})
        .run(connection, function (err, cursor) {
          if (err) {
            findError(err, connection, callback);
          } else {
            findSuccess(type, cursor, connection, callback);
          }
        });
    });
  };
  return adapter.findBySlug;
};

/**
  Async success / error handlers
**/
function findError(err, connection, callback) {
  logerror("[ERROR][%s][find] %s:%s\n%s", connection._id, err.name, err.msg, err.message);
  callback(err, null);
  connection.close();
}

function findSuccess(type, cursor, connection, callback) {
  cursor.toArray(function(err, results) {
    var json = transform(results[0]);
    var payload = {};
    var rootKey = inflect.pluralize(type);
    payload[rootKey] = [ json ];
    if (json && json.slug) {
      loginfo("Success findSlug %s slug: %s, connection id: %s", type, json.slug, connection._id);
    }
    callback(null, payload);
    connection.close();
  });
}

function transform(payload) {
  return transformDate(payload);
}

function transformDate(payload) {
  if (!payload || !payload.date) return;
  if (payload.date) {
    payload.date = payload.date.toISOString();
  }
  return payload;
}
