module('Index', {
  //setup: function () {},
  teardown: function () {
    unload('post');
    App.reset();
  }
});

//test('Index redirects', function () {
  //expect(1);
  //visit('/').then(function () {
    //equal(path(), 'posts.index', 'Redirects to /#/posts');
  //});
//});

var excerpt = '.Blog-excerpt';

test('Index template, lists posts', function () {
  expect(5);
  visit('/').then(function () {
    ok(exists(excerpt), 'Index template has excerpt(s).');
    ok(exists(excerpt + ' .Blog-excerpt-title'), 'excerpt title exists');
    ok(exists(excerpt + ' .Blog-excerpt-title a'), 'excerpt title has anchor');
    ok(exists(excerpt + ' .Blog-excerpt-summary'), 'excerpt summary exists');
    ok(exists(excerpt + ' .u-button'), 'excerpt button exists');
  });
});

