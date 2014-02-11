# Ember App Builder

Project goals:

* Author Web applications with simple tooling
* Minimistic approach to API development
  * Map routes to db adapter, send JSON response
* End-to-end integration testing
  * Test API request/response in server app
  * Seed database for testing
* Use modules for developing on client and server
* Ember Test helpers used for integration testing
  * Connect to live api during tests
* Tasks simply listed in Makefile
  * E.g. `make db`, `make server`, `make test`
  * Automate tasks w/ shell scripts, Bash / Javascript (node)
    * `make canary` update and replace Ember / Ember Data  
* Code quality encorced w/ jshint, `make lint`
* Client application build tools
  * Compile Handlebars templates
* Manage dependencies using bower.json and package.json files
  * Shell script copies source from bower dir to vendor
  * Option to overwrite w/ canary versions using shell script
* Vim tooing, Use portkey.json for generators and [ember.vim](https://github.com/dsawardekar/ember.vim)

Sample app:

Bloggr app (by Tilde.io) is setup in the [client](client) directory. The supporting `post` (resource) routes are in the [server/routes](server/routes) directory. Seed database with shell script and a module [server/seeds/posts.js](server/seeds/posts.js)

* Server runs on port 8888, client on 8000 (using CORS)

## Directories

### [client](client)

* See: [client/README.md](client/README.md), [client/package.json](client/package.json),  [client/bower.json](client/bower.json)

### [server](server)

* See: [server/README.md](server/README.md), [server/package.json](server/package.json)


## Setup

* `cd client && npm install && bower install`
* `cd server && npm install`

## Tasks / Commands

### Client-side

* See [client/Makefile](client/Makefile)

`cd client`, then watch, build and reload using `make server`

### Server-side

* See the [server/Makefile](server/Makefile)

`cd server`, `make db`, `make server`

## Screencasts

<iframe src="//player.vimeo.com/video/86430034" width="500" height="313" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="http://vimeo.com/86430034">Install tasks for ember-app-builder project</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

<iframe src="//player.vimeo.com/video/86432032" width="500" height="313" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="http://vimeo.com/86432032">Overview of end-to-end (integration) testing with ember-app-builder</a> on <a href="https://vimeo.com">Vimeo</a>.</p>
