module('Posts', {
  //setup: function () {},
  teardown: function () {
    unload('post');
    App.reset();
  }
});

test('Posts list', function () {
  expect(4);
  visit('/posts').then(function () {
    var tableHeader = 'table thead';
    equal(text(tableHeader), 'Recent Posts', 'Posts heading present');
    var postLinks = 'table tbody tr td a',
      firstPostLink = find(postLinks + ':eq(0)'),
      secondPostLink = find(postLinks + ':eq(1)');
    equal(find(postLinks).length, 2, 'Two posts listed');
    equal(text(firstPostLink), 'Rails is Omakase by d2h', '1st post title and author listed');
    equal(text(secondPostLink), 'The Parley Letter by d2h', '2nd post title and author listed');
  });
});
