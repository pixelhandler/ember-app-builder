'use-strict';

module.exports = App.ApplicationRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('post');
  },

  actions: {
    enableAdmin: function () {
      this.transitionTo('admin.index');
    },

    disableAdmin: function () {
      this.transitionTo('index');
    }
  }
});
