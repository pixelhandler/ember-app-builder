App.PostRoute = Ember.Route.extend({
  model: function (params) {
    return this.store.find('post', params.post_id);
  },
  actions: {
    doneEditing: function () {
      this.modelFor(this.get('routeName')).save();
    }
  }
});
