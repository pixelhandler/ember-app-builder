module('Index', {
  setup: function () {
    App.reset();
  },
  teardown: function () {
    //Ember.run(App, 'destroy');
  }
});

test('Index redirects', function () {
  expect(1);
  visit('/').then(function () {
    equal(path(), 'posts.index', 'Redirects to /#/posts');
  });
});

test('Index template', function () {
  expect(2);
  visit('/posts').then(function () {
    ok(exists('.text-warning'), 'Index template text exists.');
    equal($.trim(find('table thead').text()), 'Recent Posts', 'Posts heading present');
  });
});
