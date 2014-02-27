var testData = [
{
  "author": {
    "name": "pixelhandler"
  },
  "body": "### Advantages of using invisibe select element\n\n* Native browser support for select/dropdown behavior including arrow keys,\n  typing to select an option\n* Mobile devices still use finger friendly behaviour for select behaviors\n* Screen readers behave as expected with a standard select box\n* You don't have to fix all the bugs for taking over all the native brower\n  support listed above and the custom select box can now match the designer's\n  branding needs\n\n## Disclaimer\n\nThe code in this example select box component has not been tested in various\nbrowsers and cross-browser css has not been included in the demo code. The\nconcept of using 0 opacity for the select box does work in modern browsers.\n\n## Links\n\n* [emberjs/starter-kit]\n* [Components Guide]\n* [Ember.Select]\n* [Polymer Custom Element]\n* [Web Components]\n* [Mozilla Brick]\n* [source code example gist]\n* [diffs for the 7 steps]\n\n[emberjs/starter-kit]: https://github.com/emberjs/starter-kit \"Ember.js Starter Kit\"\n[Components Guide]: http://emberjs.com/guides/components/ \"Components Guide\"\n[Ember.Select]: http://emberjs.com/api/classes/Ember.Select.html \"Ember.Select\"\n[Ember.Component]: http://emberjs.com/api/classes/Ember.Component.html \"Ember.Component\"\n[Polymer Custom Element]: http://www.polymer-project.org/platform/custom-elements.html \"Polymer\"\n[Web Components]: https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html \"Web Components\"\n[Mozilla Brick]: http://mozilla.github.io/brick/ \"Mozilla brick\"\n[source code example gist]: https://gist.github.com/pixelhandler/6320922 \"Ember Components Example\"\n[diffs for the 7 steps]: https://github.com/Ember-SC/starter-kit/commits/components \"Starter-kit components branch\"",
  "date": new Date("2013-08-25"),
  "excerpt": "This tutorial steps over an useful example of creating a custom select box\nthat can look as custom as your designer would like. I've often been\nasked to customize the browsers components by designers, especially the\ndropdown/select element. A friend, [ultmast], gave me a simple solution\nwhich meets both my interest of not entirely re-inventing the wheel\n(select box behaviors) and also showing a completely customized select\nelement. Simply set the select box's opacity to zero and position the\ninvisble select box directly over the element that has custom design using\ncss, images or whatever. Then when user click to select the invisible\nselect box behavior takes over, only one binding from the invisible element to\nthe custom element is the selected option (choice).",
  "title": "Create a Custom Select Box using Ember.Component",
  "slug": "create-a-custom-select-box-using-embercomponent"
},
{
  "author": {
    "name": "pixelhandler"
  },
  "body": "If the framework has a feature that is tested and works, there is no need\nto test that your application can do that. Don't test an observer or\nbinding unless it's really important for your team to know that the\nbound property should work as your test describes it. \n\nDon't test every element and CSS class your handlebars template\ncontains, likely that will change fast anyway. Instead, test that your\ntemplate fires off the expected actions for your app to respond to.\nLikely, you don't need to write a test for every element that can be\nclicked by an user.\n",
  "date": new Date("2013-08-21"),
  "excerpt": "Get familiar with the Ember.js framework you are using and spend some\ntime reading the tests it has, which guarantee that it's own features work.\nYou can learn how to write tests by learning from those examples. But be\ncareful not to write tests for your application the same way the\nframework tests itself, avoid using or testing Ember.js private methods\nand properties.",
  "title": "Ember.js Testing: What Not to Test",
  "slug": "emberjs-testing-what-not-to-test"
},
{
  "author": {
    "name": "pixelhandler"
  },
  "body": "There is one caveat with this case study and using `App.reset()`. The Ordr App \nis reset with each unit test so the unit test is executed in isolation from \nother tests but the Ordr application code is also running. Instead of reseting \nthe application, it may be desireable for the tests of a production application \nto use a new Ember.Application with only the required objects that will be unit \ntested. Then the unit tests would be executed in isolation from the \napplication's start routine. This topic fell outside the scope of our exercise,\nso I used only the Ordr applicaiton for the unit tests.\n\n### Food Controller Unit Test Module\n\nThis tests insures a food can be added to the tab (order). The example tests \nbelow use a custom helper to lookup the food controller instance \n`getFoodController()`.  \n\nA food record is created within an [Ember.run] queue which helps organize the \n\"act\" segment of a test. It's common practice in test-driven development \norganize tests in 3 steps: 1-Arrange, 2-Act, 3-Assert.\n\n```javascript\nmodule('Ordr App unit tests: Food Controller', {\n  setup: function () {\n  App.reset();\n  visit('/tables/1');\n  }\n});\n\ntest('Add food to tabItems', function() {\n  expect(7);\n\n  var controller = getFoodController();\n  ok(controller, 'Food controller is ok');\n  ok(controller.addFood, 'Food controller has addFood action');\n\n  var tabItems = controller.get('controllers.table.tab.tabItems');\n  ok(tabItems, 'Food controller can access food items');\n  equal(tabItems.get('content').length, 0, 'tabItems are empty');\n\n  var cheese, foods = [];\n  Ember.run(function () {\n  cheese = App.Food.createRecord({\n    id: 500,\n    name: 'cheese',\n    imgUrl: '',\n    cents: 100\n  });\n  controller.addFood(cheese);\n  tabItems.get('content').forEach(function(food){\n    foods.push( food.record.toJSON() );\n  });\n  });\n  equal(tabItems.get('content').length, 1, 'Added food to tabItems');\n  equal(foods.length, 1, 'tabItems has one food');\n  equal(foods[0].cents, 100, 'added food cost is 100 cents');\n});\n```\n\n### Handlebars Helper Unit Test Module\n\nThe example tests below exercise the display format of money using a Handlebars \nhelper to convert cents to dollars, e.g. 350 cents display as \"3.50\". Conditions \nare tested to confirm output when the cents value is not a number and when the \ncents value is a number. The helper outputs \"0.00\" by default, otherwise formats \nthe cents as dollars (two decimal places).\n\n```javascript\nmodule('Ordr App unit tests: Handlebars Helper', {\n  setup: function () {\n  App.reset();\n  }\n});\n\ntest('money helper renders default text', function() {\n  expect(2);\n\n  var view, cents;\n  Ember.run(function () {\n  view = Ember.View.create({\n    template: Ember.Handlebars.compile('{{money cents}}')\n  });\n  view.appendTo('#qunit-fixture');\n  cents = view.get('cents');\n  });\n  equal(cents, null, 'Value is not a null');\n  strictEqual(view.$().text(), '0.00', 'Renders 0.00 when NaN');\n});\n\ntest('money helper renders number converted to money format', function() {\n  expect(2);\n\n  var view, cents;\n  Ember.run(function () {\n  view = Ember.View.create({\n    template: Ember.Handlebars.compile('{{money view.cents}}'),\n    cents: 777\n  });\n  view.appendTo('#qunit-fixture');\n  cents = view.get('cents');\n  });\n  equal(cents, 777, 'Value is 777');\n  strictEqual(view.$().text(), '7.77', 'Renders 7.77 given 777');\n});\n\n```\n\n### Models Unit Test Module\n\n**Warning: This application uses Ember Data, \"Use with caution\"**\n\nIn the schema for the Ordr application...\n\n* A Table belongs to a Tab (order)\n* A Tab has many TabItems and a computed property for `cents` subtotal\n* A TabItem belongs to a Food\n* A Food has a `cents` property that is copied to a TabItem\n  (a food price can change but the price in the order is final)\n\nAgain, in this test, the setup of the models using fixtures is forced by using \n`visit()` to trigger a route that results in the setup of application state \nunder test, specifically the models that rely on fixture data. (This may be an \nanti-pattern, but seemed necessary at this time for testing the models using the\n`DS.Model#createRecord` method provided by Ember Data.)\n\nSee the [unit tests] page for the functions and variables used to assist creating\nmodel instances during unit testing of the various model classes.\n\n```javascript\nmodule('Ordr App unit tests: Models', {\n  setup: function () {\n  App.reset();\n  visit('/tables/4');\n  }\n});\n\ntest('Tab model has total of all items for table 4', function() {\n  expect(3);\n\n  ok(App.Tab, 'Food model ok');\n  var tab = getFoodController().get('controllers.table.tab');\n  ok(tab, 'tab instance ok');\n\n  var total = 0;\n  tab.get('tabItems.content').forEach(function(food){\n  total += food.record.get('cents');\n  });\n  strictEqual(tab.get('cents'), total, '5450 cents is the total of the tab');\n});\n\ntest('Food model created with name, imageUrl and cents', function() {\n  expect(5);\n\n  ok(App.Food, 'Food model ok');\n  var food;\n  Ember.run(function () {\n  food = createCheese();\n  });\n  ok(food, 'created food item');\n  equal(food.get('name'), 'Cheese', 'Food Name is Cheese');\n  equal(food.get('imageUrl'), 'img/cheese.png', 'Url is img/cheese.png');\n  equal(food.get('cents'), 400, 'cents is 400');\n\n  Ember.run(function () {\n  food.destroy();\n  });\n});\n\ntest('TabItem model created with food model and cents', function() {\n  expect(2);\n\n  ok(App.TabItem, 'TabItem model ok');\n  var tabItem;\n  Ember.run(function () {\n  tabItem = createTabItem(createCheese(), 400);\n  });\n  equal(tabItem.get('cents'), 400, 'created tabItem with 400 cents');\n\n  Ember.run(function () {\n  tabItem.destroy();\n  });\n});\n\ntest('Tab model created with food models', function() {\n  expect(3);\n\n  ok(App.Tab, 'Tab model ok');\n  var tab, foods = [], foodsSum;\n  Ember.run(function () {\n  tab = createTabWithCheeseAndCrackers();\n  });\n  tab.get('tabItems.content').forEach(function(food){\n  foods.push(food.record.get('cents'));\n  });\n  foodsSum = foods.reduce(function (prev, cur) {\n  return prev + cur;\n  });\n  equal(foods.length, 2, 'created tab with two items');\n  equal(foodsSum, tab.get('cents'), 'total of tab is 750');\n\n  Ember.run(function () {\n  tab.destroy();\n  });\n});\n\ntest('Table', function() {\n  expect(2);\n\n  ok(App.Table, 'Table model ok');\n  var table;\n  Ember.run(function () {\n  table = createTable(createTabWithCheeseAndCrackers());\n  });\n  equal(table.get('tab.tabItems.content').length, 2, 'created table with tab which already has 2 items');\n\n  Ember.run(function () {\n  table.destroy();\n  });\n});\n```",
  "date": new Date("2013-08-20"),
  "excerpt": "See this page on writing [unit tests] for a controller, a handlebars\nhelper and the models used in the Ordr app.\n\n[unit tests]: https://github.com/Ember-SC/peepcode-ordr-test/wiki/Guide:-Unit-Tests\n\nI found that in some of the unit tests the `visit()` helper was needed to force\nEmber Data Fixtures to become ready for testing. In addition to `App.reset()`\nsome setup may be needed to ask the route to setup the expected application\nstate, so `visit()` is called during the setup routine.",
  "title": "Ember.js Unit Tests",
  "slug": "emberjs-unit-tests"
},
{
  "author": {
    "name": "pixelhandler"
  },
  "body": "This exercise of writing tests for the Ordr app was done after writing\nthe app via a tutorial video. I do think that with the \"async aware\"\ntesting DSL provided by the \"ember-testing\" package a software\nengineer is encouraged to write tests from the perspective of user\ninteractions. This can be thought of as functional or integration\ntesting.\n\nUsing the Ember-testing package with QUnit affords taming the beast of\nasync testing.\n\nI look forward to writing tests for application development which support\nthe design of the application and the user experience. I do prefer to \navoid writing tests that are basically written to catch bugs when code changes.\n\nUsing the ember-testing package I can write tests that describe the\napplication's behavior. For example `visit` this or that route `then`\nassert or expect some thing to be displayed. And, perhaps `find` an input\nelement and `fillIn` my name or some data; and `click` submit `then` the\ntest can automatically `wait` for the result of that click event `then`\nconfirm that the application is routed to the desired page.\n\nThis type of testing allows you to start with a simple action like\n`visit` a route. With that failing test, you can then write the code in\nthe router to support the new route. Next, add more to your test using\n`then`, to check that a template has the right content for users to get\nbusy using the app. So, you write a failing test for the items in the\ntemplate that are crucial for your users to interact with. Next, write the\ncode to render your template and the necessary elements should be\ndisplayed passing your test. To continue testing the experience, write a\ntest to `fillIn` or `click` some part of that template and assert that your\ncontroller or route has an event/action handler that deals with the user\ninteraction. Once you have a failing test, then work on putting together\nthe function handlers to complete the desired behaviors.\n\nThat's pretty powerful in a speedy JavaScript test runner, and can grow/change\nas the scope of your application changes.\n\nAside from integration tests, there's unit testing. I recommend writing unit\ntests to help engineer the features that your application supports. Having\nintegration tests are great and important; but don't forget to write unit tests\nas you develop key behaviours and features... to display, or interact with\nsingle components of the application.",
  "date": new Date("2013-08-19"),
  "excerpt": "The approach of testing an Ember.js application by writing integration\ntests does support the concept of writing tests for the design of an\napplication from a behavioral perspective. Basically testing the user's\ninterations with your application. I really like that approach as it\ndoes favor writing tests first then writing code to pass your tests. ",
  "title": "Ember.js Application Testing Strategy",
  "slug": "emberjs-application-testing-strategy"
},
{
  "author": {
    "name": "pixelhandler"
  },
  "body": "Unit tests can be used to confirm each component of the application\n_can_ work as designed; however, integration tests confirm that the components \n_do_ behave as expected (i.e. they are working together as designed).\n\nA healthy combination of both unit and integration tests, executed via a \nJavaScript test runner in a browser or in a headless runner (e.g. phantomjs), \nfacilitates the practice of test-driven development; and helps to ensure that \ndevelopment of Ember.js applications can scale and behave as **ambitious** as \npromised by the Ember.js application framework.\n\n[end-to-end tests]: https://github.com/Ember-SC/peepcode-ordr-test/wiki/Guide:-End-to-End-Tests\n\n#### Testing the PeepCode Ordr Application\n\nIn the test modules below `App.reset()` is called during the `setup` routine of\neach test, so every test executes in isolation from the other tests, resetting\nthe application each time.\n\n#### Ember.run\n\nThe tests have code that should be executed with the confines of an \n[Ember.run] loop (or queue). When the application is in testing mode the \nautomatic invocation of an [Ember.run] queue is disabled. So when creating a \nmodel or changing properties that are bound or observed, this activity requires \nexecution in the scope of an `Ember.run` (callback) function.\n\n[Ember.run]: http://emberjs.com/api/classes/Ember.run.html \"wrap your code inside this call\"\n\n#### Tables Integration Test Module\n\nTables have a tab (think of this as an order) listing food items. The \napplication uses the UI pattern for a \"Master–detail interface\". There are six \n(6) tables, each of them have a tab (order with list items). Note that\nthe model relationship may be defined differently than may appear to the\nuser of the application. In the application source code, a Food may have \nTabItems and a Tab may have a Table; but this doesn't matter from the\nperspective of an integration test.\n\nThe module below has three (3) integration tests and use the `visit` helper \nprovided by the Ember Test package.\n\nThe custom `path()` helper is not part of the Ember testing package and\nserves as an example of using your own custom test helpers.\n\n```javascript\nmodule('Ordr App integration tests: Tables', {\n  setup: function () {\n  App.reset();\n  }\n});\n\ntest('Initial Redirect', function(){\n  expect(1);\n  visit('/').then(function () {\n  equal(path(), 'tables.index', 'Redirects to /tables');\n  });\n});\n\ntest('Displays six tables', function(){\n  expect(1);\n  visit('/tables').then(function () {\n  equal(find('#tables a').length, 6, 'Six tables display');\n  });\n});\n\ntest('Table 2, food menu', function () {\n  expect(3);\n  visit('/tables/2').then(function () {\n  equal(find('div.nine h2').text(), 'Table 2', 'Table 2 heading displayed');\n  equal(find('#customer-tab li h3:first').text(), 'Click a food to add it', 'Has call to action text');\n  equal(find('#menu li > a').length, 5, 'Has food menu with 5 choices');\n  });\n});\n```\n\n#### Tabs Integration Test Module\n\nThe module below uses the following test helpers provided by the Ember\ntest package:\n\n* `visit` (`then`), `click`\n\nThe integration tests visit various routes for a few of the tables and exercises \nthe application behaviors of adding food items to a tab (order). Also, a test \nconfirms that the state of the tab(s) remains between visits of a couple tables. \nOne table has data pre-populated (data defined in the fixures for table #4).\n\n```javascript\nmodule('Ordr App integration tests: Tabs', {\n  setup: function () {\n  App.reset();\n  }\n});\n\ntest('Tables 1 and 3, adding foods to the tabs', function(){\n  expect(5);\n  visit('/tables/1').then(function (){\n  equal(find('div.nine h2').text(), 'Table 1', 'Table 1 heading displayed');\n  return click('#menu li:eq(0) > a');\n  }).then(function(){\n  equal(find('#customer-tab li:eq(0) > h3').text(), 'Pizza $15.00', 'Added pizza to tab');\n  equal(find('#total span').text(), '$15.00', 'Total price updated with pizza price');\n  visit('/tables/3').then(function (){\n    equal(find('div.nine h2').text(), 'Table 3', 'Table 3 heading displayed');\n    visit('/tables/1').then(function (){\n    equal(find('#customer-tab li:eq(0) > h3').text(), 'Pizza $15.00', 'Pizza still in tab');\n    });\n  });\n  });\n});\n\ntest('Table 4, already had foods added to the tab', function(){\n  expect(3);\n  visit('/tables/4').then(function (){\n  var actual = [],\n    expectedFoods = 'Pizza$15.00Pancakes$3.00Fries$7.00HotDog$9.50BirthdayCake$20.00Total$54.50';\n\n  find('#customer-tab > li').each(function (){\n    actual.push( find(this).text() );\n  });\n  equal(find('div.nine h2').text(), 'Table 4', 'Table 4 heading displayed');\n  equal(actual.join('').replace(/\\s/g, ''), expectedFoods, 'Pizza, Pancakes, Fries, Hot Dogs, Cake already added');\n  equal(find('#total span').text(), '$54.50', 'Already has $54.50 in foods in the tab');\n  });\n});\n```",
  "date": new Date("2013-08-18"),
  "excerpt": "See this [end-to-end tests] page for examples of integration tests of a Ember.js\napplication.\n\nWith integration tests executed via JavaScript, not only are test reports \ngenerated fast, but also various components of the application are tested to \nconfirm they work as designed.\n\nUnit tests can be used to confirm each component of the application\n_can_ work as designed; however, integration tests confirm that the components \n_do_ behave as expected (i.e. they are working together as designed).\n",
  "title": "Ember.js End-to-End (Integration) Testing",
  "slug": "emberjs-end-to-end-integration-testing"
},
{
  "author": {
    "name": "pixelhandler"
  },
  "body": "## QUnit Test Runner\n\nSee this page on [Testing Setup/Helpers] for the Qunit test runner we\nused, as well as an example of custom test helpers.\n\nIn this case the testing support code combines the definition of the \nhelpers and the execution of code to setup the application for testing.\n\n[Testing Setup/Helpers]: https://github.com/Ember-SC/peepcode-ordr-test/wiki/Guide:-Testing-Setup-Helpers\n\nThe example HTML document includes CSS styles to display the working application \nbelow the QUnit test runner.\n\nWhile under test the application can use a different root element, we used\n`#app-root` to identify the Ember.js applications's root element.\n\nThe libraries listed in the HTML test runner are same versions distributed \nwith the Ember.js [starter kit] repository, see the starter kit repository\nfor the lastest recommended versions for building Ember.js applications.\n\n## Setup the Application For Testing\n\nThe example is this guide uses two (2) methods to prepare the application for \ntesting:\n\n```javascript\nApp.setupForTesting();\nApp.injectTestHelpers();\n```\n\nAdded to the Ordr application is a call to [deferReadiness]\n`App.deferReadiness()`, used to perform asynchronous setup logic and defer \nbooting the application. The `deferReadiness` call was not included in the \ntutorial video, and requires `App.advanceReadiness()` to run the application \nwhen not under test.\n\n## Custom Test Helpers\n\nSee the [end-to-end tests] page for an example integration test that verifies the \ndefault route of the Ordr application. A custom test helper is used to confirm \nthe route. Below is the helper:\n\n```javascript\nEmber.Test.registerHelper('path', function() {\n  return testing().path();\n});\n```\n\nA custom helper object is used to introspect application state. The helpers are \ndefined in a support file loaded only during testing.\n\nIn the example below, helper methods are defined to assist both integration and \nunit testing. See the Unit Tests and End-to-End tests pages in this guide for \nexamples which use custom test helpers: `path()` and `getFoodController()`, \nwhich are defined in the (support) file below.\n\n```javascript\n(function (host) {\n  var document = host.document;\n  var App = host.App;\n\n  var testing = function(){\n  var helper = {\n    container: function(){\n    return App.__container__;\n    },\n    controller: function( name ){\n    return helper.container().lookup('controller:' + name);\n    },\n    path: function(){\n    return helper.controller('application').get('currentPath');\n    }\n  };\n  return helper;\n  };\n\n  Ember.Test.registerHelper('path', function() {\n  return testing().path();\n  });\n\n  Ember.Test.registerHelper('getFoodController', function() {\n  return testing().controller('food');\n  });\n\n  // Move app to an element on the page so it can be seen while testing.\n  document.write('<div id=\"test-app-container\"><div id=\"ember-testing\"></div></div>');\n  App.rootElement = '#ember-testing';\n  App.setupForTesting();\n  App.injectTestHelpers();\n\n}(window));\n```\n\nThe `App.rootElement` bas been changed while the applicaiton is under test so \nthat both the test report and application are visible in the [QUnit] test runner.\n\nSee the [integration] testing page or read the [ember-testing package] code for \nmore details on the helpers which facilitate testing asynchronous behavior \nwithin the application. Also, note that [QUnit] provides `start()` and `stop()` \nmethods utilized by the `wait()` method (included with the Ember testing \nhelpers). \n\nAsync testing can be challenging, our exercise used the default test \nadapter that ships with the Ember Test package. QUnit provides solid support for \nasync testing using it's `start` and `stop` methods which are utilized \ninternally in the Ember Test package by the `wait` helper which internally calls \n`Test.adapter.asyncStart()` and `Test.adapter.asyncEnd()`.\n\n**Warning:** This example of custom helpers includes a call to a private method \nof the Ember#Application object `__container__`; since it's used only in the \nhelper, only while testing, and in only one function... when the private API \nchanges this helper can be updated. This method should **not** be used by the \napplication source code at all.\n\n\n[QUnit]: http://qunitjs.com/ \"Default testing library supported by the ember-testing package\"\n[starter kit]: https://github.com/emberjs/starter-kit \"A starter kit for Ember\"\n[deferReadiness]: http://emberjs.com/api/classes/Ember.Application.html#method_deferReadiness \"perform asynchronous setup logic and defer booting your application\"\n[integration]: /guides/testing/integration \"integration testing page\"\n[ember-testing package]: https://github.com/emberjs/ember.js/tree/master/packages/ember-testing/lib \"ember.js / packages / ember-testing / lib\"",
  "date": new Date("2013-08-17"),
  "excerpt": "The [testing/integration guide page] on the [emberjs.com] site is an\nexcellent source for learning about setting up an application for\ntesting, a reference for the test helpers that are part of the\nember-testing package and information on adding your own test helpers.\n\n[testing/integration guide page]: http://emberjs.com/guides/testing/integration/\n[emberjs.com]: http://emberjs.com",
  "title": "Ember.js Application Testing Setup and Helpers",
  "slug": "emberjs-application-testing-setup-and-helpers"
},
{
  "author": {
    "name": "pixelhandler"
  },
  "body": "See below:\n\n```javascript\nApp.Model = {\n  find: Em.K,\n  transaction: { commit: Em.K, rollback: Em.K },\n  createRecord: Em.K\n};\nApp.SomeModel = App.Model;\n```\n\nWhen mocking the `DS.Model` interface you can also use spies to assert \nyour application works with the model.\n\n[FixtureAdapter]: /guides/models/the-fixture-adapter/ \"Fixture Adapter section of the Model guide\"\n[model]: /guides/models/ \"Model guide\"\n[model lifecycle]: /guides/models/model-lifecycle/ \"Models must be loaded and saved asynchronously\"",
  "date": new Date("2013-08-16"),
  "excerpt": "When using Ember Data with asynchronous testing, things can get crazy.\nIf your testing suite becomes loaded with intermitent test failures due\nto the [model lifecycle], it may be a good idea to mock your models in\nyour unit tests (when the model is _not_ the subject of the test).",
  "title": "Mocking Ember Data Models",
  "slug": "mocking-ember-data-models"
},
{
  "author": {
    "name": "pixelhandler"
  },
  "body": "These comments on testing are based on a exercise with a group of\nhackers from the Ember-SC meetup group in Southern California. Drew,\nScott, Ty and myself spent some time trying out various ways to test an\nEmber Application.\n\nThe journey went something like this...\n<!-- more -->\n\n1. Try Jasmine because we love BDD\n2. Try Mocha because it's newer and it's used with Konacha\n3. Try QUnit because it may be better with async tests then the above\n   and the Ember.js project uses it anyway\n4. Wow Ember.js has testing helpers in the ember-testing package, lets\n   rewrite the integration tests\n5. Try Pavlov since is provides BDD style spec runner on top of QUnit\n6. Just use TDD QUnit test runner\n\nIn getting started with the exercise we talked and asked... \n\n* What is important in testing an app built with Ember.js?  \n* Because the Ember.js framework has solid test coverage\nfor the API it provides, is the main gap making sure an \napplication's compontents or modules work together?\n* The underlying behavior of the framework features and API should just work,\nwhat should we not test?\n* Unit tests are needed, but it would be great to have integration tests that\nrun super fast in a JavaScript runner.\n* Perhaps integration or end-to-end testing is the main objective for\n  our exercise.\n\nThe results of this exercise are on GitHub:\n\n* Repo: [peepcode-ordr-test] | [wiki][peepcode-ordr-test-wiki]\n\n[peepcode-ordr-test]: https://github.com/Ember-SC/peepcode-ordr-test \"Ember-SC Meetup PeepCode Ordr Test Repository\"\n[peepcode-ordr-test-wiki]: https://github.com/Ember-SC/peepcode-ordr-test/wiki \"Guide pages proposed to expand Ember testing guide\"\n\n## The Application and Fixture Data\n\nSee the [application code] which is a result of completing the tutorial\nvideo which comes with accompanying [fixture data]. To understand what the\napplication does, see the [Fire up Ember.js video] page which has\ndiagrams and an nice explanation of the workings of the **Ordr** app.\n\n[application code]: https://github.com/Ember-SC/peepcode-ordr-test/wiki/Guide:-Example-Browser-Application\n[fixture data]: https://github.com/Ember-SC/peepcode-ordr-test/wiki/Guide:-Fixture-Data\n\nScott commented, \"it's a reasonable 'smallest realistic' Ember.js\napplication to 'learn with'\".\n\nFor testing, we used compiled Handlebars templates instead of the script\nelements you see in the tutorial.\n\n**Warning:** this example of testing does cover testing [Ember.Data]\nmodels; Ember.data is not ready for prime time yet. That said,\nEmber.Data Fixtures are a nice way to pre-populate application data for\nlisting and reading data. So, why not test the models? Perhaps we can\nlearn something about the fixture adapter by testing.\n\n[Ember.Data]: https://github.com/emberjs/data\n\nI would not recommended using the fixture adapter for a production application, \nthe tutorial uses fixture data as an example that a browser application can be \nworked on in parallel to the development of a server application which will \nprovide the data via an API. \n\nUsing fixture data is an ideal way to facilitate testing of data that, in \nproduction, comes down the wire via AJAX requests.",
  "date": new Date("2013-08-15"),
  "excerpt": "## Learning by Example\n\nThe [PeepCode] Ordr app is an excellent video tutorial for learning\nEmber.js and also a great example of a browser application for writing\ntests in JavaScript. Learning Ember.js is a task in itself, learning to\ntest an Ember.js comes with an equal level of challenge. This article is\na collection of observations for an exercise in testing a non-trivial\nEmber.js application, specifically the Ordr app code from the PeepCode\ntutorial [Fire up Ember.js video].\n\n[PeepCode]: https://peepcode.com \"Screencast tutorials for professional web developers and designers\"\n[Fire up Ember.js video]: https://peepcode.com/products/emberjs \"Ember.js Tutorial video by Peepcode\"",
  "title": "Testing an Ember Application",
  "slug": "testing-an-ember-application"
},
{
  "author": {
    "name": "pixelhandler"
  },
  "body": "## What is a Finite-State Machine?\n\nIllustration from [Wikipedia][3] -\n\n\nIt is conceived as an abstract machine that can be in one of a finite number of states. The machine is in only one state at a time; the state it is in at any given time is called the current state. It can change from one state to another when initiated by a triggering event or condition; this is called a transition. A particular FSM is defined by a list of its states, and the triggering condition for each transition. \n\nAn example of a very simple mechanism that can be modeled by a state machine is a turnstile. \n\nA turnstile, used to control access to subways and amusement park rides, is a gate with three rotating arms at waist height, one across the entryway. Initially the arms are locked, barring the entry, preventing customers from passing through. Depositing a coin or token in a slot on the turnstile unlocks the arms, allowing them to rotate by one-third of a complete turn, allowing a single customer to push through. After the customer passes through, the arms are locked again until another coin is inserted.\n\nThe turnstile has two states: **Locked** and **Unlocked**. There are two inputs that affect its state: putting a coin in the slot (*coin*) and pushing the arm (*push*). In the locked state, pushing on the arm has no effect; no matter how many times the input push is given it stays in the locked state. Putting a coin in, that is giving the machine a coin input, shifts the state from **Locked** to **Unlocked**. In the unlocked state, putting additional coins in has no effect; that is, giving additional coin inputs does not change the state. However, a customer pushing through the arms, giving a push input, shifts the state back to **Locked**.\n\n\n[3]: https://en.wikipedia.org/wiki/Finite-state_machine\n\n## A Turnstile as an Ember application\n\n### Demo\n\nExample Turnstile application built with Ember see in working at [jsbin][4], source code at: [github][1]\n\n[4]: http://jsbin.com/uvucuw/8/\n\n## Slide Deck as an Ember application\n\nThis browser app was created for a tech talk at the <http://www.meetup.com/Ember-SC/> meetup group. We discussed Ember.StateManager in July 2013 - http://www.meetup.com/Ember-SC/events/125461412/\n\nThe ember slide deck app can run in two modes, `idling` and `playing`. Slides that have a time value (`milliseconds` property) automatically enter the `playing state`. When the `next` action is triggered by the `keyPress` event for a slide with no `milliseconds` the app transitions back to `idling`. Every slide has a URL so app state is managed with Ember.Router but states for playing and idling depend on user's behavior and the states exist along side the state represented in the URLs.\n\nIn the sample `fixtures.js` file the slides in the two sections automatically play then stop before the next section.\n\n## Observations on using Ember.StateManager\n\nEmber has some awesome tools baked into the framework. The StateManager is an example of an object to mange the state of objects like models, routes, or any object that needs to behave according to it's state.\n\nI few things I noticed when using Ember.State objects:\n\n* Action handlers for `enter` and `exit` may not have the `currentState.name` in the state that you expect, these events happen during transition to/from a state. \n\n* The `setup` method does have the `currentState` you would expect and receives the `manager` and `context` objects as arguments, while `enter` and `exit` only receive `manager`.\n\n* A state's methods for `enter` and `exit` are good for handling common behaviors when transitioning to sub-states. The `setup` method can be defined in a base state class as the  default setup action for states and thier child states as well.\n\n* Methods defined on a parent state are shared with sub-states.\n\n* Utilize the state pattern by defining the same action methods with varying outcomes depending on the state's required behaviors.\n\n* Reading the 'ember-states' test suite ([state_manager_test.js][5] & [state_test.js][6]) reveals everthing you want to know about the `Ember.StateManager`.\n\n* A state machine may be useful for: \n  * Interactions that don't need to be persisted and represented via a URL.\n  * Workflow, e.g. multiple steps to accomplish an objective.\n\nSee the [State Pattern][7] for another example of a state objects used to handle various behaviors of mouse activity.\n\n[5]: https://github.com/emberjs/ember.js/blob/master/packages/ember-states/tests/state_manager_test.js\n[6]: https://github.com/emberjs/ember.js/blob/master/packages/ember-states/tests/state_test.js\n[7]: http://en.wikipedia.org/wiki/State_pattern",
  "date": new Date("2013-07-20"),
  "excerpt": "## Example Apps\n\nThis article demonstates two examples of using [Ember#StateManager][0] to\nmanage state that does not need to be represented by a URL.\n\n* The first is more of a an exercise to discover how to use Ember#StateManager in a basic application, [a turnstile app][1]\n* The second is a presentation application (slide deck) made with Ember, using the StateManager to autoplay slides (images).\n\nI used the ember slide deck app to animate some white board sketches during a talk at a meetup on this topic; [ember slide deck app][2].\n\n[0]: http://emberjs.com/api/classes/Ember.StateManager.html \"Ember.StateManager\"\n[1]: https://github.com/pixelhandler/ember-example-turnstile \"Example use of Ember.StateManager\"\n[2]: https://github.com/pixelhandler/ember-slide-deck \"Presentation application written in Ember.js in slideshow format\"13928789031001392879476570",
  "title": "Using Ember.StateManager: Example Apps",
  "slug": "using-emberstatemanager-example-apps"
}
];

if (module && module.exports) {
  module.exports = testData;
}
