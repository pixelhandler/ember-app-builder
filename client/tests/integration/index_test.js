module('Index', {
  //setup: function () {},
  teardown: function () {
    unload('post');
    App.reset();
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
    equal(text('.text-warning'), 'Please select a post', 'Index text present.');
  });
});
