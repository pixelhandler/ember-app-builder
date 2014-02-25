var app  = require(__dirname + '/../app.js'),
  port = 8888,
  assert = require('assert'),
  request = require('supertest');

var config = require('../config')();

describe('Sessions', function () {

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

  it('cannot access restricted endpoint /restricted', function () {
    request(app)
      .post('/restricted')
      .expect(403);
  });

  var credentials = config.admin;

  it('POST /sessions w/ username & password', function (done) {
    request(app)
      .post('/sessions')
      .send(credentials)
      .expect(204)
      .end(done);
      // access restricted
      //.end(function (err, res) {
        //request(app)
          //.post('/restricted')
          //.withCredentials()
          //.expect(204)
          //.end(done);
      //});
      // logout at DELETE /sessions
      //.end(function (err, res) {
        //request(app)
          //.del('/sessions')
          //.withCredentials()
          //.expect(204)
          //.end(done);
        //});
  });

});
