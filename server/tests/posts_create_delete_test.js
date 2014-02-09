var app  = require(__dirname + '/../app.js'),
  port = 8888,
  assert = require('assert'),
  request = require('supertest');

describe('Posts', function () {
  var postId;

  before(function (done) {
    this.server = app.listen(port, function (err, result) {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });

  after(function () {
    this.server.close();
  });

  describe('POST/DELETE responses:', function () {

    describe('/posts', function () {

      it('create a "post" record, then "delete" it', function (done) {
        var id;
        request(app)
          .post('/posts')
          .send(newPost)
          .expect(200)
          .expect(function (res) {
            var post = res.body.posts[0];
            id = post.id;
            if (!post || post.title.match(/New Post/) === null) {
              throw new Error('post not created');
            }
          })
          .end(function (err, res) {
            request(app)
              .del('/posts/' + id)
              .expect(204)
              .end(handleDone(done));
          });
      });
    });
  });
});

var newPost = {
  post: {
    title: "New Post",
    author: { name: "bot" },
    date: Date.now,
    excerpt: "Nothing special.",
    body: "New post body content, blah, blah..." 
  }
};

function handleDone(done) {
  return function (err, res) {
    if (err) return done(err);
    done();
  };
}
