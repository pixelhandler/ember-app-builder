App.SlidesController = Ember.ArrayController.extend({
  sortProperties: ['id'],
  actions: {
    begin: function () {
      window.document.location = '#/slides/0';
    }
  }
});