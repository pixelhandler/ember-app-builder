App.SlidesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('slide');//App.Slide.find();
  }
});