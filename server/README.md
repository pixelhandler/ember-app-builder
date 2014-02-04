# Ember App Builder - Server

One repository for end-to-end JavaScript application development using two apps.

This is the toolset for server-side application development.


## Getting Started

* See [package.json](package.json])
* Execute `make install` to fetch dependendies.
* Commands to start up: `make db` and `make server`


## Makefile

* See the [Makefile](Makefile)
* Has commands to launch db, server and execute tests


## Directories

* [bin] - shell scripts (bash or js)
* [lib] - has adapter for db
* [tests] - has mocha test files


## Database

Using [RethinkDB] with JavaScript [driver].

1. Install rethink and driver
1. Use `make db` to launch the database

A directory will be created `rethinkdb_data` for your database files

### Seed the data

* In the [bin](bin) directory are files to seed the database
  * Execute `make seed` to drop db, create tables and seed the db

[RethinkDB]: http://www.rethinkdb.com
[driver]: http://www.rethinkdb.com/api/javascript/


## Testing

1. Launch the database with `make db`
1. Execute the test suite with `make test`
   - The server cannot run on the same port when executing the specs

Uses Mocha with supertest to test API endpoints.

### Client testing

The client test suite, needs the database seeded and API server running
as it is configured as an integration testing suite.
