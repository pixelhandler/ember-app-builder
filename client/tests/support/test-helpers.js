(function (host) {
  var document = host.document,
    App = host.App,
    $ = host.jQuery,
    Ember = host.Ember,
    find = host.find,
    rootElem = '#ember-testing';


  var testing = function (app) {
    var helper = {
      container: function () {
        return app.__container__;
      },
      controller: function (name) {
        return helper.container().lookup('controller:' + name);
      },
      path: function () {
        return helper.controller('application').get('currentPath');
      },
      store: function () {
        return helper.container().lookup('store:main');
      },
      find: function (selector) {
        return $(selector, rootElem);
      },
      exists: function (selector) {
        return !!helper.find(selector).length;
      },
      text: function (selector) {
        return $.trim(helper.find(selector).text());
      },
      hasText: function (selector, text) {
        var elemText = helper.find(selector).text();
        return (elemText) ? elemText.match(new RegExp(text)) !== null : false;
      },
      hyperlink: function (selector) {
        return helper.find(selector).attr('href');
      }
    };
    return helper;
  };

  Ember.Test.registerHelper('path', function (app) {
    return testing(app).path();
  });

  Ember.Test.registerHelper('exists', function (app, selector) {
    return testing(app).exists(selector);
  });

  Ember.Test.registerHelper('text', function (app, selector) {
    return testing(app).text(selector);
  });

  Ember.Test.registerHelper('hasText', function (app, selector, text) {
    return testing(app).hasText(selector, text);
  });

  Ember.Test.registerHelper('hyperlink', function (app, selector) {
    return testing(app).hyperlink(selector);
  });

  Ember.Test.registerHelper('unload', function (app, resource) {
    Ember.run(function () {
      testing(app).store().unloadAll(resource);
    });
  });

  // Move app to an element on the page so it can be seen while testing.
  document.write('<div id="test-app-container"><div id="ember-testing"></div></div>');
  App.rootElement = rootElem;
  App.setupForTesting();
  App.injectTestHelpers();

}(window));
