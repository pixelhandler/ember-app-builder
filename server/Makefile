install:
	@npm install

db:
	@rethinkdb

lint:
	@jshint lib/* index.js tests/*

test: lint
	@mocha --reporter spec tests/*

server:
	@DEBUG=* node index.js

.PHONY: install db lint test server
