var attr = DS.attr;

App.PostModel = DS.Model.extend({
  title: attr('string'),
  author: attr(),
  date: attr('date'),
  excerpt: attr('string'),
  body: attr('string')
});
