module('Admin', {
  setup: function () {
    window.sessionStorage.removeItem('admin_key');
  },
  teardown: function () {
    unload('post');
    App.reset();
    window.sessionStorage.removeItem('admin_key');
  }
});

var enableAdmin = '.u-enableAdmin';
var disableAdmin = '.u-disableAdmin';

test('Admin must be enabled', function () {
  expect(1);

  visit('/admin').then(function () {
    equal(path(), 'index', 'Redirects to / if admin is not enabled');
  });
});

test('Admin index available when enabled', function () {
  expect(1);

  visit('/').then(function () {
    click(enableAdmin).then(function () {
      equal(path(), 'admin.index', 'Redirects to /admin when enabled');
    });
  });
});

test('Admin can be disabled', function () {
  expect(1);
  window.sessionStorage.setItem('admin_key', 'secret');

  visit('/admin').then(function () {
    click(disableAdmin).then(function () {
      equal(path(), 'index', 'Redirects to / when disabled');
    });
  });
});
