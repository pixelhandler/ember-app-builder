'use-strict';

module.exports = App.AdminIndexRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('post');
  }
});
