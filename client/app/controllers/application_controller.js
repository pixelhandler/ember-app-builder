'use-strict';

module.exports = App.ApplicationController = Ember.ArrayController.extend({

  isAdmin: function () {
    return window.sessionStorage.getItem('admin_key') === 'ok';
  }.property(),

  sessionUrl: 'http://localhost:8888/sessions',

  actions: {
    enableAdmin: function () {
      var creds = { username: 'admin', password: 'admin'};
      Ember.$.post(this.get('sessionUrl'), creds)
        .done(function (data, status, xhr) {
          window.sessionStorage.setItem('admin_key', 'ok');
          this.notifyPropertyChange('isAdmin');
        }.bind(this))
        .fail(function (xhr, status, error) {
          window.alert('Unable to login. ' + error);
        });

      return true; // bubble
    },

    disableAdmin: function () {
      Ember.$.ajax({ url: this.get('sessionUrl'), type: 'DELETE' })
        .done(function (data, status, xhr) {
          document.cookie = 'connect.sess=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          window.sessionStorage.removeItem('admin_key');
          this.notifyPropertyChange('isAdmin');
        }.bind(this))
        .fail(function (xhr, status, error) {
          window.alert('Unable to logout. ' + error);
        });

      return true; // bubble
    }
  }
});
