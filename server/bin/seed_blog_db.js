#!/usr/bin/env node

var r = require('rethinkdb'),
  posts = require(__dirname + '/../seeds/posts.js');

r.connect({ host: 'localhost', port: 28015}, function (err, conn) {
  if (err) throw err;

  conn.use('blog');
  r.table('posts').insert(posts).run(conn, logResult);
});

function logResult(err, result) {
  if (err) throw err;
  console.log(JSON.stringify(result));
  process.exit();
}
