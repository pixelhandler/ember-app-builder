'use-strict';

module.exports = App.ApplicationSerializer = DS.RESTSerializer.extend({
  /**
    @method normalize - swap id w/ slug
  **/
  normalize: function(type, hash) {
    if (!hash) { return hash; }
    this.applyTransforms(type, hash);
    var slug = hash.slug;
    hash.slug = hash.id;
    hash.id = slug;
    return hash;
  },

  /**
    @method serialize - swap id back to slug
  **/
  serialize: function (record, options) {
    var json = this._super.apply(this, arguments);
    if (!json) { return json; }
    json.slug = record.get('id');
    if (json.id) { json.id = record.get('slug'); }
    return json;
  }
});
