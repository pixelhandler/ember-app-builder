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

  describe('GET responses:', function () {

    describe('/posts', function () {

      describe('root key of payload', function () {

        it('is "posts"', function (done) {
          request(app)
            .get('/posts')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/posts/)
            .expect(function (res) {
              var posts = res.body.posts;
              if (!posts) throw new Error('expected posts');
            })
            .end(handleDone(done));
        });

        it('sorts in DESC order of "date" property by default', function (done) {
          request(app)
            .get('/posts')
            .expect(function (res) {
              var posts = res.body.posts;
              if (posts[0].date.match(/2012-12-27/) === null) throw new Error('expected desc order (2012-12-27)');
              if (posts[1].date.match(/2012-12-24/) === null) throw new Error('expected desc order (2012-12-24)');
            })
            .end(handleDone(done));
        });

        it('has an array of posts with keys for author, body, date, excerpt, title, id', function (done) {
          request(app)
            .get('/posts')
            .expect(/author/).expect(/body/).expect(/date/).expect(/excerpt/).expect(/title/).expect(/id/)
            .expect(function (res) {
              var posts = res.body.posts;
              if (posts[0].title !== 'Rails is Omakase') throw new Error('expected 1st post title');
              if (posts[1].title !== 'The Parley Letter') throw new Error('expected 1st post title');
            })
            .end(handleDone(done));
        });

        it('includes two (2) posts (from seed data)', function (done) {
          request(app)
            .get('/posts')
            .expect(function (res) {
              var posts = res.body.posts;
              if (posts.length !== 2) throw new Error('expected 2 posts');
            })
            .end(handleDone(done));
        });
      });

      describe('meta data in payload', function () {

        it('includes keys: limit, offset, total, order, sortBy', function (done) {
          request(app)
            .get('/posts')
            .expect(/meta/)
            .expect(/limit/).expect(/offset/).expect(/total/)
            .expect(/order/).expect(/sortBy/)
            .expect(function (res) {
              var meta = res.body.meta;
              if (!meta) throw new Error('expected meta');
              if (meta.total !== 2) throw new Error('expected total of 2');
            })
            .end(handleDone(done));
        });
      });

      describe('query parameters', function () {

        describe('default sortBy setting is the "date" key', function () {

          it('sorts DESC order with "order=desc" param', function (done) {
            request(app)
              .get('/posts?order=desc')
              .expect(function (res) {
                var posts = res.body.posts;
                if (posts[0].title !== 'Rails is Omakase') throw new Error('expected 1st post title');
                if (posts[0].date.match(/2012-12-27/) === null) throw new Error('expected desc order (2012-12-27)');
                if (posts[1].title !== 'The Parley Letter') throw new Error('expected 2nd post title');
                if (posts[1].date.match(/2012-12-24/) === null) throw new Error('expected desc order (2012-12-24)');
              })
              .end(handleDone(done));
          });

          it('sorts ASC order with "order=asc" param', function (done) {
            request(app)
              .get('/posts?order=asc')
              .expect(function (res) {
                var posts = res.body.posts;
                if (posts[0].date.match(/2012-12-24/) === null) throw new Error('expected asc order (2012-12-24)');
                if (posts[1].date.match(/2012-12-27/) === null) throw new Error('expected asc order (2012-12-27)');
              })
              .end(handleDone(done));
          });

          it('limits records using "limit=" param', function (done) {
            request(app)
              .get('/posts?limit=1')
              .expect(function (res) {
                var posts = res.body.posts;
                if (posts.length !== 1) throw new Error('expected 1 of 2 records');
                if (posts[0].date.match(/2012-12-27/) === null) throw new Error('expected 2012-12-27');
              })
              .end(handleDone(done));
          });

          it('skips records using "offset=" param', function (done) {
            request(app)
              .get('/posts?offset=1')
              .expect(function (res) {
                var posts = res.body.posts;
                if (posts.length !== 1) throw new Error('expected 1 of 2 records');
                if (posts[0].date.match(/2012-12-24/) === null) throw new Error('expected 2012-12-24');
              })
              .end(handleDone(done));
          });
        });

        describe('sortBy param', function () {

          describe('default order is DESC', function () {

            it('can sortBy "title" key (instead of default "date" key)', function (done) {
              request(app)
                .get('/posts?sortBy=title')
                .expect(function (res) {
                  var posts = res.body.posts;
                  if (posts[0].title !== 'The Parley Letter') throw new Error('expected 1st post title');
                  if (posts[1].title !== 'Rails is Omakase') throw new Error('expected 2nd post title');
                })
                .end(handleDone(done));
            });
          });

        });
      });
    });

    describe('/posts/:id', function () {

      it('includes one "post" record in the payload', function (done) {
        request(app)
          .get('/posts?order=desc')
          .end(function (err, res) {
            if (err) return done(err);
            var id = res.body.posts[0].id;
            request(app)
              .get('/posts/' + id)
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(200)
              .expect(/posts/)
              .expect(/author/).expect(/body/).expect(/date/).expect(/excerpt/).expect(/title/).expect(/id/)
              .expect(function (res) {
                if (res.body.posts.length > 1) throw new Error('expected one record');
                var post = res.body.posts[0];
                if (!post) throw new Error('expected post id: ' + id);
                if (post.title !== 'Rails is Omakase') throw new Error('expected 1st post title');
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
