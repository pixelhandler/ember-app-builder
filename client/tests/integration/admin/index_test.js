(function (window) {

var enableAdmin = '.u-enableAdmin';
var disableAdmin = '.u-disableAdmin';

module('Admin Index', {
  setup: function () {
    window.showdown = new Showdown.converter();
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
var item = list + '-item';
var date = list + '-date';
var title = item + '-title';
var editButton = item + ' .u-edit';
var deleteButton = item + ' .u-destroy';

test('Admin Index template lists posts', function () {
  expect(6);
  visit('/admin').then(function () {
    ok(exists(list), 'Admin index template has list of post(s).');
    ok(exists(date), 'post date exists');
    ok(exists(item), 'post item exists');
    ok(exists(title), 'post title exists');
    ok(exists(editButton), 'post edit button exists');
    ok(exists(deleteButton), 'post delete button exists');
  });
});

}(window));
