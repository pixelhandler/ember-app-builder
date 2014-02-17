'use-strict';

//App.Router.reopen({ location: 'history' });

module.exports = App.Router.map(function () {
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
});
