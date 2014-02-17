'use-strict';

module.exports = App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post');
  }
});
