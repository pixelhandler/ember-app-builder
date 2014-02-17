'use-strict';

module.exports = App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post');
  }//,
  //renderTemplate: function(controller, model) {
    //this._super(controller, model);
    //this.render('recent', { outlet: 'recent' });
  //}
});
