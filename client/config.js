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
          //'app/helpers/format-date.js',
          //'app/helpers/format-markdown.js',
          'app/app.js'
          //'app/adapters/applications.js',
          //'adp/models/post.js',
          //'app/router.js',
          //'app/routes/posts.js',
          //'app/routes/post.js',
          //'app/controllers/post.js'
        ],
        after: [
          //'app/fixtures.js'
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
            'app.min.js': /^app/
            //'vendor.min.js': /^bower_components\/(jquery|handlebars|ember|ember-data)\/(jquery|handlebars|ember|ember-data)\.min\.js$/
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
