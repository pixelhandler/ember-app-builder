# Ember App Builder

## Directories

### client

See: client/package.json and client/bower.json

### server

See: server/package.json

## Setup

* `cd client && npm install && bower install`
* `cd server && npm install`

## Commands

### client-side

The client directory has a Makefile with many commands

`cd client`

Watch, build and reload: `make server`

Start (server) API script: `make api`

### server-side

* `cd server`
* `node index.js`