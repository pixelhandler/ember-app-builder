(function (window) {

var enableAdmin = '.u-enableAdmin';
var disableAdmin = '.u-disableAdmin';

module('Admin Edit', {
  setup: function () {
    window.showdown = new Showdown.converter();
    window.sessionStorage.setItem('admin_key', 'secret');
    return visit('/admin');
  },
  teardown: function () {
    App.reset();
    window.sessionStorage.removeItem('admin_key');
  }
});

var content = '.Blog-content';
var editPost = content + ' .Blog-list-item .u-edit:eq(0)';

test('Menu has link to edit new post', function () {
  expect(1);
  click(editPost).then(function () {
    equal(path(), 'admin.edit', 'links to Admin page to edit a post');
  });
});

var inputs = {
  title: '.Admin-form-title input[type="text"]',
  excerpt: '.Admin-form-excerpt textarea',
  body: '.Admin-form-body textarea'
};

var editButton = '.Blog-content .u-edit:eq(0)';

test('Form to edit post has title, excerpt, body fields', function () {
  expect(3);

  visit(hyperlink(editPost)).then(function () {
    click(editButton).then(function () {
      var selector;
      for (var input in inputs) {
        if (inputs.hasOwnProperty(input)) {
          selector = inputs[input];
          ok(exists(selector), 'Admin edit form has ' + input + ' field');
        }
      }
    });
  });
});

var buttons = {
  save: '.u-save',
  cancel: '.u-cancel',
  preview: '.u-preview',
  destroy: '.u-destroy'
};

test('Form to edit a post has buttons for save, cancel, preview', function () {
  expect(3);

  visit(hyperlink(editPost)).then(function () {
    click(editButton).then(function () {
      var selector, expectedButtons = Ember.String.w('save cancel preview');
      expectedButtons.forEach(function (button) {
        selector = buttons[button];
        ok(exists(selector), button + ' button exists');
      });
    });
  });
});

var template = {
  title: content + ' h1',
  excerpt: content + ' .intro',
  body: content + ' .below-the-fold',
  authorName: content + ' .author',
  date: content + ' .date'
};

test('Preview of edited post', function () {
  expect(1);

  visit(hyperlink(editPost)).then(function () {
    click(editButton).then(function () {
      var promises = [];
      var field = 'excerpt';
      var ogExcerpt = $(inputs[field]).val();
      var excerptText = ogExcerpt + Date.now().toString();

      fillIn(inputs[field], excerptText).then(function () {
        click(buttons.preview).then(function () {
          var selector = template[field];
          var previewText = $(window.showdown.makeHtml(excerptText)).text();
          ok(hasText(selector, previewText.slice(-13)), 'Edited post ' + field + ' has text: "' + excerptText + '"');
        });
      });
    });
  });
});


test('Save edited post, success redirects to index', function () {
  expect(2);

  var href = hyperlink(editPost);
  var id = href.slice(href.lastIndexOf('/') + 1);

  visit(href).then(function () {
    click(editButton).then(function () {
      var promises = [];
      var field = 'excerpt';
      var ogExcerpt = $(inputs[field]).val();
      var excerptText = ogExcerpt + Date.now().toString();

      fillIn(inputs[field], excerptText).then(function () {
        click(buttons.save).then(function () {
          equal(path(), 'admin.index', 'Successfully saving an edited post redirects to Admin index');
          visit('/posts/' + id).then(function () {
            var selector = template[field];
            var postText = $(window.showdown.makeHtml(excerptText)).text();
            ok(hasText(selector, postText.slice(-13)), 'Saved edit to ' + field + ' has text: "' + excerptText + '"');
          });
        });
      });
    });
  });
});

}(window));
