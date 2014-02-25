'use-strict';

module.exports = App.ApplicationController = Ember.ArrayController.extend({

  username: null,
  password: null,
  error: null,
  showLogin: false,
  isLoggedIn: false,

  actions: {
    enableAdmin: function () {
      this.set('showLogin', true);
      return false;
    },

    disableAdmin: function () {
      this.set('showLogin', false);
      return false;
    },

    login: function (view) {
      this.setProperties({
        username: view.$('input[name="username"]').val(),
        password: view.$('input[name="password"]').val()
      });
      return true;
    }
  }
});
