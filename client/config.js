exports.config = {
  paths: {
    'public': 'public',
    watched: ['app', 'vendor']
  },
  files: {
    javascripts: {
      defaultExtension: 'js',
      joinTo: {
        'app.js': /^app/,
        'vendor.js': /^vendor\/.+\.js$/
      },
      order: {
        before: [
          'vendor/jquery.js',
          'vendor/handlebars.js',
          'vendor/ember-canary.js',
          'vendor/ember-data-canary.js',
          'app/app.js'
        ],
        after: []
      }
    },
    stylesheets: {
      joinTo: {
        'app.css': /^app\/stylesheets\/app.css$/,
        'normalize.css': /^app\/stylesheets\/normalize.css$/
      }
    },
    templates: {
      precompile: true,
      root: 'templates/',
      defaultExtension: 'hbs',
      joinTo: 'templates.js'
    }
  },
  conventions: {
    assets: /assets[\\/]/,
    ignored: /bower_components[\\/]/,//TODO allow _ prefix?
    vendor: /vendor[\\/]/
  },
  modules: {
    //wrapper: function(path, data) {
      //return ["\n(function (window) {","/* ", path, " */", "\n\n", data, "\n", "}(window))"].join('');
    //},
    wrapper: false,
    definition: false
    //addSourceURLs: false
  },
  optimize: false,
  sourceMaps: false,
  plugins: {
    autoReload: {
      enabled: true
    }
    // TODO add to package.json: "es6-module-transpiler-brunch": "*"
    //es6ModuleTranspiler: {
      //match: /^app/,
      //debug: true
    //}
  },
  server: {
    path: 'server.js',
    port: 8000
  },
  watcher: {
    usePolling: true
  },
  overrides: {
    production: {
      optimize: true,
      sourceMaps: false,
      files: {
        javascripts: {
          joinTo: {
            'app.min.js': /^app/,
            'vendor.min.js': /^vendor\/.+\.js$/
          }
        }
      },
      plugins: {
        autoReload: {
          enabled: false
        }
      }
    }
  }
};
