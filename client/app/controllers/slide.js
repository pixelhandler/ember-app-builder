App.SlideController = Ember.Controller.extend({
  actions: {
    // left = 37, up = 38, right = 39, down = 40
    updateKey: function (code) {
      if (code === 37) {
        this.get('target').send('previous');
      } else if (code === 39) {
        this.get('target').send('next');
      } else if (code === 38) {
        this.get('target').send('first');
      } else if (code === 40) {
        this.get('target').send('last');
      }
    }
  }
});