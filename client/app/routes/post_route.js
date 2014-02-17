'use-strict';

module.exports = App.PostRoute = Ember.Route.extend({
  model: function (params) {
    return this.store.find('post', params.post_id);
  },
  actions: {
    doneEditing: function () {
      this.modelFor(this.get('routeName')).save();
    }
  }//,
  //renderTemplate: function(controller, model) {
    //this.render('recent', { outlet: 'recent' });
    //return this._super(controller, model);
  //}
});
