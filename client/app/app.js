// Application
window.App = Ember.Application.create({
  ready: function(){
    window.App.stateMachine = App.StateMachine.create({
      //enableLogging: true
    });
  }
});