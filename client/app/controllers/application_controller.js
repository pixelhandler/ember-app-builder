'use-strict';

module.exports = App.ApplicationController = Ember.ArrayController.extend({

  isAdmin: function () {
    return window.sessionStorage.getItem('admin_key') === 'secret';
  }.property(),

  actions: {
    enableAdmin: function () {
      window.sessionStorage.setItem('admin_key', 'secret');
      this.notifyPropertyChange('isAdmin');
      return true; // bubble
    },

    disableAdmin: function () {
      window.sessionStorage.removeItem('admin_key');
      this.notifyPropertyChange('isAdmin');
      return true; // bubble
    }
  }
});
