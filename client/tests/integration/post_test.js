module('Post', {
  setup: function () {
    window.showdown = new Showdown.converter();
  },
  teardown: function () {
    unload('post');
    App.reset();
  }
});

var postAttrs = {
  title: '.span9 h1',
  author: '.span9 h2',
  date: '.span9 .muted',
  excerpt: '.span9 .intro',
  body: '.span9 .below-the-fold'
};

test('First Post', function () {
  expect(9);

  visit('/posts').then(function () {
    var postLink = 'table tbody tr td a:eq(0)';

    visit(hyperlink(postLink)).then(function () {
      for (var attr in postAttrs) {
        if (postAttrs.hasOwnProperty(attr)) {
          ok(exists(postAttrs[attr]), ['1st post', attr, 'element exists'].join(' '));
        }
      }

      var postContent = {
          title: 'Rails is Omakase',
          author: 'd2h',
          excerpt: 'software environments',
          body: 'Rails is not that. Rails is omakase'
        },
        selector,
        matching;

      for (var content in postContent) {
        if (postContent.hasOwnProperty(content)) {
          selector = postAttrs[content];
          matching = postContent[content];
          ok(hasText(selector, matching), '1st post has text: ' + matching);
        }
      }
    });
  });
});

test('Second Post', function () {
  expect(9);

  visit('/posts').then(function () {
    var postLink = 'table tbody tr td a:eq(1)';

    click(postLink).then(function () {
      for (var attr in postAttrs) {
        if (postAttrs.hasOwnProperty(attr)) {
          ok(exists(postAttrs[attr]), ['2nd post', attr, 'element exists'].join(' '));
        }
      }

      var postContent = {
          title: 'The Parley Letter',
          author: 'd2h',
          excerpt: 'Ruby Rogues podcast',
          body: 'oldest Rails app in the world'
        },
        selector,
        matching;

      for (var content in postContent) {
        if (postContent.hasOwnProperty(content)) {
          selector = postAttrs[content];
          matching = postContent[content];
          ok(hasText(selector, matching), '2nd post has text: ' + matching);
        }
      }
    });
  });
});
