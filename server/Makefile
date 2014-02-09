install:
	@npm install

db:
	@rethinkdb

seed:
	@./bin/create_blog_db.js
	@./bin/seed_blog_db.js

lint:
	@jshint lib/* app.js tests/*

test: lint seed
	@mocha --reporter spec tests/*

server:
	@DEBUG=* node app.js

.PHONY: install db lint test server
