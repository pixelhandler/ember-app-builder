module('Index', {
  //setup: function () {},
  teardown: function () {
    unload('post');
    App.reset();
  }
});

//test('Index redirects', function () {
  //expect(1);
  //visit('/').then(function () {
    //equal(path(), 'posts.index', 'Redirects to /#/posts');
  //});
//});
