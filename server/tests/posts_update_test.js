var app = require(__dirname + '/../index.js'),
  port = 8888,
  assert = require('assert'),
  request = require('supertest');

describe('Posts', function () {
  var originalPayload, postId;

  before(function (done) {
    this.server = app.listen(port, function (err, result) {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });

  after(function (done) {
    var server = this.server;
    if (originalPayload && postId) {
      request(app)
        .put('/posts/'+postId)
        .send(JSON.parse(originalPayload))
        .end(function (err, res) {
          if (err) done(err);
          server.close();
          done();
        });
    } else {
      server.close();
    }
  });

  describe('PUT responses:', function () {

    describe('/posts/:id', function () {

      it('updates a "post" record, title changed', function (done) {
        request(app)
          .get('/posts?order=desc')
          .end(function (err, res) {
            if (err) return done(err);
            var id = res.body.posts[0].id;
            postId = id;
            var payload = { post: res.body.posts[0] };
            originalPayload = JSON.stringify(payload);
            payload.post.title += " updated";
            delete payload.post.id;
            request(app)
              .put('/posts/'+id)
              .send(payload)
              .expect(200)
              .expect(function (res) {
                var post = res.body.posts[0];
                if (!post || post.title.match(/updated/) === null) {
                  throw new Error('post not updated');
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
