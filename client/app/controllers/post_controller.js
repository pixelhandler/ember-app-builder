'use-strict';

module.exports = App.PostController = Ember.ObjectController.extend({
  isEditing: false,

  actions: {
    edit: function() {
      this.set('isEditing', true);
    },

    doneEditing: function () {
      this.set('isEditing', false);
      return true; // bubble up
    }
  }
});
