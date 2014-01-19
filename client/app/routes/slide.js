App.SlideRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('slide', params.slide_id);//App.Slide.find(params.slide_id);
  },
  actions: {
    previous: function () {
      var id = '' + (+this.get('currentModel.id') - 1);
      window.document.location = '#/slides/' + id;
    },
    next: function () {
      App.stateMachine.send('next', this);
    },
    first: function () {
      window.document.location = '#/slides/' + 0;
    }
  }
});