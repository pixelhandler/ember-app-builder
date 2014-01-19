App.Slide = DS.Model.extend({
  iframeUrl: DS.attr('string'),
  filename: DS.attr('string'),
  milliseconds: DS.attr('number')
});