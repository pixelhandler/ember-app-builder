// Router
App.Router.map(function() {
  this.resource('/');
  this.resource('slides');
  this.resource('slide', { path: '/slides/:slide_id' });
});