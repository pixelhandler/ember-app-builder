var enableAdmin = '.u-enableAdmin';
var disableAdmin = '.u-disableAdmin';

module('Admin Index', {
  setup: function () {
    window.sessionStorage.removeItem('admin_key');
    visit('/').then(function () {
      click(enableAdmin);
    });
  },
  teardown: function () {
    visit('/').then(function () {
      click(disableAdmin);
      unload('post');
      App.reset();
    });
  }
});

var list = '.Blog-content .Blog-list';
var date = '.Blog-content .Blog-list-date';
var link = '.Blog-content .Blog-list-link a';

test('Admin Index template lists posts', function () {
  expect(3);
  visit('/admin').then(function () {
    ok(exists(list), 'Admin index template has list of post(s).');
    ok(exists(date), 'post date exists');
    ok(exists(link), 'post link exists');
  });
});
