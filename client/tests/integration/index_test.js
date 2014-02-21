(function (window) {

module('Index', {
  setup: function () {
    window.showdown = new Showdown.converter();
  },
  teardown: function () {
    unload('post');
    App.reset();
  }
});

var excerpt = '.Blog-content .Blog-excerpt';
var showMore = '.Blog-content .Blog-showMore';

test('Index template, lists (5) posts with link for more', function () {
  expect(7);
  visit('/').then(function () {
    ok(exists(excerpt), 'Index template has excerpt(s).');
    ok(exists(excerpt + ' .Blog-excerpt-title'), 'excerpt title exists');
    ok(exists(excerpt + ' .Blog-excerpt-title a'), 'excerpt title has anchor');
    ok(exists(excerpt + ' .Blog-excerpt-summary'), 'excerpt summary exists');
    ok(exists(excerpt + ' .u-button'), 'excerpt button exists');
    ok(exists(showMore), 'Show more link exists');
    equal(find(excerpt).length, 5, 'index page has five post excerpts');
  });
});

}(window));
