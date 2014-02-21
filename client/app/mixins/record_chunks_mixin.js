'use-strict';

module.exports = App.RecordChunksMixin = Ember.Mixin.create({
  /**
    Prototype using mixin must define resourceName and controllerName, the
    controller must also be defined, can't rely on auto generation

    @prop {String} resourceName - name of record type used to lookup via store
    @prop (String) controllerName - name of controller to set `hasMore` flag on
  **/
  resourceName: null,
  controllerName: null,
  /**
    Prototype using mixin may redefine limit and offset as needed.
  **/
  limit: 5,
  offset: -5,

  beforeModel: function () {
    this.offset = this.offset + this.limit;
  },

  model: function () {
    var query = { offset: this.offset, limit: this.limit };
    return this.store.find(this.resourceName, query);
  },

  afterModel: function (collection) {
    this.set('meta', this.store.metadataFor(this.resourceName));
    collection.mapBy('id').forEach(function (id) {
      this.loadedIds.push(id);
    }.bind(this));
    this.controllerFor(this.controllerName).set('hasMore', this.get('hasMore'));
    return collection;
  },

  meta: null,
  loadedIds: [],

  setupController: function (controller) {
    var collection = [];
    this.get('loadedIds').forEach(function (id) {
      var model = this.store.getById(this.resourceName, id);
      if (model) {
        collection.push(model);
      }
    }.bind(this));
    this._super(controller, collection);
  },

  hasMore: function () {
    return this.loadedIds.length < this.get('meta.total');
  }.property('meta.total').volatile()
});
