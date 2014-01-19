// States
App.StateMachine = Ember.StateManager.extend({
  initialState: 'idling',
  idling: Ember.State.extend({
    next: function (manager, context) {
      var milliseconds = context.get('currentModel.milliseconds');
      if (milliseconds && milliseconds !== 0) {
        manager.transitionTo('playing', context);
      } else {
        var id = '' + (+context.get('currentModel.id') + 1);
        window.document.location = '#/slides/' + id;
      }
    }
  }),
  playing: Ember.State.extend({
    setup: function (manager, context) {
      this.next(manager, context);
    },
    next: function (manager, context) {
      var id = '' + (+context.get('currentModel.id') + 1);
      window.document.location = '#/slides/' + id;
      this.play(manager, context);
    },
    play: function (manager, context) {
      var milliseconds = context.get('currentModel.milliseconds');
      if (milliseconds && milliseconds !== 0) {
        this.startInterval(context, milliseconds);
      } else {
        this.stopInterval();
        manager.transitionTo('idling', context);
      }
    },
    startInterval: function (context, milliseconds) {
      var id = '' + (+context.get('currentModel.id') + 1);
      this.timeoutId = Ember.run.later(function(){
        window.document.location = '#/slides/' + id;
        App.stateMachine.send('play', context);
      }, milliseconds);
    },
    stopInterval: function () {
      if (this._timeoutId) {
        Ember.run.cancel(this._timeoutId);
        delete this._timeoutId;
      }
    }
  })
});