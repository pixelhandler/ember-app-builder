'use-strict';

module.exports = App.ApplicationRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('post');
  }
});
