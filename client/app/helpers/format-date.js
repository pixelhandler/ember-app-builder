'use-strict';

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});
