'use-strict';

module.exports = App.PostsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post');
  }
});
