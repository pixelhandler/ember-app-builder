#!/usr/bin/env node

var r = require('rethinkdb'),
  posts = require(__dirname + '/../seeds/posts.js');

var settings = {
  host: process.env.RDB_HOST || 'localhost',
  port: parseInt(process.env.RDB_PORT) || 28015,
  db: process.env.RDB_DB
};

r.connect(settings, function (err, conn) {
  if (err) throw err;

  conn.use('blog');
  r.table('posts').insert(posts).run(conn, logResult);
});

function logResult(err, result) {
  if (err) throw err;
  console.log(JSON.stringify(result));
  process.exit();
}
