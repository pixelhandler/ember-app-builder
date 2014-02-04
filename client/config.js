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
        after: [
          'app/init.js'
        ]
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
      joinTo: 'app.js'
    }
  },
  conventions: {
    assets: /assets[\\/]/,
    ignored: /bower_components[\\/]/,
    vendor: /vendor[\\/]/
  },
  optimize: false,
  sourceMaps: false,
  plugins: {
    autoReload: {
      enabled: true
    }
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
