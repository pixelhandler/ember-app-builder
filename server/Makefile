install:
	@npm install

db:
	@rethinkdb

seed:
	@./bin/create_blog_db.js
	@./bin/seed_blog_db.js

lint:
	@jshint lib/* index.js tests/*

test: lint
	@mocha --reporter spec tests/*

server:
	@DEBUG=* node index.js

.PHONY: install db lint test server
