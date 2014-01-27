build: lint
	@brunch b

clean:
	@rm -f ./public/*.js
	@rm -f ./public/*.css

dist: clean build prod

doc:
	@yuidoc ./app/* -c yuidoc.json --server 3333

docfiles: lint
	@yuidoc ./app/* -c yuidoc.json

install:
	@npm install
	@npm install grunt-blanket-qunit --save-dev
	@bower install

lint:
	@jshint app/*

prod: lint
	@brunch build --production

test: lint
	@open http://localhost:7357/
	@testem

coverage: lint
	@open http://localhost:8080/tests/coverage.html?coverage=true
	@python -m SimpleHTTPServer 8080

ci: dist
	@grunt blanket_qunit --verbose

server: lint
	@brunch watch --server

.PHONY: build clean dist doc docfiles install lint prod test coverage ci server
