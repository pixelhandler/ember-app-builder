'use-strict';

module.exports = App.AdminCreateController = Ember.ObjectController.extend({
  isPreviewing: false,

  actions: {
    edit: function () {
      this.set('isPreviewing', false);
    },

    preview: function () {
      this.set('isPreviewing', true);
    },

    save: function () {
      this.set('isEditing', false);
      return true; // bubble
    }
  }
});
