# Ember App Builder - Client

One repository for end-to-end JavaScript application development using two apps.

This is the toolset for client-side application development.


## Getting Started

* Execute `make install` to fetch dependendies.

### Directories

* [app](app) - Source files for the app
* [app/assets](app/assets) - html, images, etc. (e.g. index.html)
* [tests](tests) - support files and integration tests directory

The file structure of the app directory is flexible as modules can
require any other modules as a dependency.

### Modules

Source files use CommonJS `module.exports = ` which are converted into
AMD modules for use in the browser. Use `require()` for loading
dependent modules as needed.

### Templates

The [app/templates](app/templates) directory is not flexible, as the
Handlebars (.hbs) files will be precompiled from this directory only.

### [app/init.js](app/init.js)

A module used to initialize the application.

### Static File Server

* Execute `make server` to launch a static file server for the client
  app. Files in the app and vendor directories are watched for
  referching your browser after each change triggers a build.


## Makefile

See [Makefile](Makefile) for tasks

* `make install` - fetch dependencies and setup
* `make build` = Build app using Brunch.io
* `make server` - Starts server for client app
* `make test` - Launch Testem to execute tests, see testem.json


## Build

Use `make build` (default is 'development')

* See [config.js](config.js)


## Depedencies

* [bower.json](bower.json)
* [package.json](package.json)

### Vendor

Uses a shell script [bin/vendor.sh](bin/vendor.sh) to copy specific
files from your 'bower_components' directory into your 'vendor'
directory.

### Canary

Uses a shell script [bin/canary.sh](bin/canary.sh) to fetch Ember Canary
and Ember Data Canary (in 'vendor/development/'); also removes copied
vendor file for Ember and Ember Data.


## Testing

1. Start db, see Makefile in server directory
1. Start API server, (see ^), If needed, seed the db first
1. `make test` launches testem and browsers to test in dev


## Vim tools

* File generators using [portkey]
* [ember.vim]
* [pixelhandler/vim-config]

[portkey]: https://github.com/dsawardekar/portkey
[ember.vim]: https://github.com/dsawardekar/ember.vim
[pixelhandler/vim-config]: https://github.com/pixelhandler/vim-config


## Code Quality

* [jshint options]

[jshint options]: http://jshint.com/docs/options/


## Links

* [Brunch config]

[Brunch config]: https://github.com/brunch/brunch/blob/master/docs/config.md


## Thanks

... for providing examples of building with Ember.js:

* [mutewinter/tapas-with-ember]
* [gcollazo/ember-bloggr]

[mutewinter/tapas-with-ember]: https://github.com/mutewinter/tapas-with-ember
[gcollazo/ember-bloggr]: https://github.com/gcollazo/ember-bloggr
