var app  = require(__dirname + '/../app.js'),
  port = 8888,
  assert = require('assert'),
  request = require('supertest');

describe('Posts', function () {

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

  describe('PUT responses:', function () {

    describe('/posts/:id', function () {

      it('updates a "post" record, excerpt changed', function (done) {
        request(app)
          .get('/posts?order=desc')
          .end(function (err, res) {
            if (err) return done(err);
            var id = res.body.posts[0].id;
            var payload = { post: res.body.posts[0] };
            payload.post.excerpt += " [updatable]";
            delete payload.post.id;
            request(app)
              .put('/posts/'+id)
              .send(payload)
              .expect(200)
              .expect(function (res) {
                var post = res.body.posts[0];
                if (!post || post.excerpt.match(/\[updatable\]/) === null) {
                  throw new Error('post not updatable');
                }
              })
              .end(handleDone(done));
          });
      });
    });
  });
});

function handleDone(done) {
  return function (err, res) {
    if (err) return done(err);
    done();
  };
}
