module('Posts', {
  //setup: function () {},
  teardown: function () {
    unload('post');
    App.reset();
  }
});

var list = '.Blog-nav-list:eq(0)';
var heading = '.Blog-nav h4:eq(0)';
var links = list + ' .Blog-nav-list-item a';

test('Posts list', function () {
  expect(4);
  visit('/posts').then(function () {
    equal(text(heading), 'Recent Posts', 'Posts heading present');
    equal(find(links).length, 2, 'Two posts listed');
    equal(text(links + ':eq(0)'), 'Rails is Omakase', '1st post title and author listed');
    equal(text(links + ':eq(1)'), 'The Parley Letter', '2nd post title and author listed');
  });
});

//var excerpt = '.Blog-excerpt';

//test('Posts Index template', function () {
  //expect(5);
  //visit('/posts').then(function () {
    //ok(exists(excerpt), 'Index template has excerpt(s).');
    //ok(exists(excerpt + ' .Blog-excerpt-title'), 'excerpt title exists');
    //ok(exists(excerpt + ' .Blog-excerpt-title a'), 'excerpt title has anchor');
    //ok(exists(excerpt + ' .Blog-excerpt-summary'), 'excerpt summary exists');
    //ok(exists(excerpt + ' .u-button'), 'excerpt button exists');
  //});
//});
