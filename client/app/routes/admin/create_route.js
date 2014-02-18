'use-strict';

module.exports = App.AdminCreateRoute = Ember.Route.extend({
  model: function (params) {
    var post = this.store.createRecord('post');
    post.setProperties({
      'author': { name: 'pixelhandler' },
      'date': new Date()
    });
    return post;
  },

  actions: {
    save: function () {
      this.modelFor(this.get('routeName')).save().then(function (model) {
        this.transitionTo('admin');
      }.bind(this));
    },

    cancel: function () {
      this.modelFor(this.get('routeName')).deleteRecord();
      this.transitionTo('admin.index');
    }
  }
});
