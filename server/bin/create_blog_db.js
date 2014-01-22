#!/usr/bin/env node

var r = require('rethinkdb');

r.connect({ host: 'localhost', port: 28015}, function (err, conn) {
  if (err) throw err;

  var name = 'blog';
  // drop blog db
  r.dbDrop(name).run(conn, function (err, callback) {
    if (err) throw err;
    // create blog dB
    r.dbCreate('blog').run(conn, function (err, callback) {
      if (err) throw err;
      // catalog table; list of collections
      r.db('blog').tableCreate('catalogs').run(conn, function (err, callback) {
        if (err) throw err;
        // posts table
        r.db('blog').tableCreate('posts').run(conn, function (err, callback) {
          if (err) throw err;
          process.exit();
        });
      });
    });
  });
});
