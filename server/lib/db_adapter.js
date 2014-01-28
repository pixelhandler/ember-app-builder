/**
  @module db_adapter

  Abstract Interface to use for db adapters
**/

/**
  @class Adapter
  @constructor
  @param {Object} options - host, port, db, tables
**/
var Adapter = function (options) {

  /**
    @property host
    @type String
  **/
  this.host = options.host || 'localhost';

  /**
    @property port
    @type Number
  **/
  this.port = options.port || 28015;

  /**
    @property db - Name of database
    @type String
  **/
  this.db = options.db || '';

  /**
    @property tables
    @type Object - {String} resource : {String} primaryKey
  **/
  this.tables = options.tables || {};

  return this;
};

module.exports.Adapter = Adapter;

/**
  @method find
  @param {String} type - name of resource
  @param {String} id
  @param {Function} callback(err, result) - Callback args: Error, JSON Result
**/
Adapter.prototype.find = function (type, id, callback) {};

/**
  @method findQuery
  @param {String} type - name of resource
  @param {Object} query - key/value pairs
  @param {Function} callback(err, results) - Callback args: Error, Results Array
**/
Adapter.prototype.findQuery = function (type, query, callback) {};

/**
  @method findMany
  @param {String} type - name of resource
  @param {Array} ids
  @param {Function} callback(err, results) - Callback args: Error, Results Array
**/
Adapter.prototype.findMany = function (type, ids, callback) {};

/**
  @method findAll
  @param {String} type - name of resource
  @param {Function} callback(err, results) - Callback args: Error, Results Array
**/
Adapter.prototype.findAll = function (type, callback) {
  return Adapter.prototype.find.call(this, type, null, callback);
};

/**
  @method createRecord
  @param {String} type
  @param {Object} record
  @param {Function} callback(err, results) - Callback args: Error, Results Array
**/
Adapter.prototype.createRecord = function (type, record) {};

/**
  @method updateRecord
  @param {String} type
  @param {Object} record
  @param {Function} callback(err, results) - Callback args: Error, Results Array
**/
Adapter.prototype.updateRecord = function (type, record) {};

/**
  @method deleteRecord
  @param {String} type
  @param {Object} record
  @param {Function} callback(err, results) - Callback args: Error, Results Array
**/
Adapter.prototype.deleteRecord = function (type, record) {};
