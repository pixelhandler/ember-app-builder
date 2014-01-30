//App.ApplicationAdapter = DS.FixtureAdapter.extend();
App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:8888'
});
