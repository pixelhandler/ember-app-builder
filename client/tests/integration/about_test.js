module('About', {
  //setup: function () {},
  teardown: function () {
    unload('post');
    App.reset();
  }
});

test('Route /about', function () {
  expect(1);
  visit('/about').then(function () {
    equal(path(), 'about', '/about route works.');
  });
});

test('About template', function () {
  expect(3);
  visit('/about').then(function () {
    ok(exists('.about'), 'About template text exists.');
    ok(hasText('.about:eq(0)', 'hacking on open source'), 'hacking text present');
    ok(hasText('.about:eq(1)', 'JavaScript framework'), 'framework text present');
  });
});
